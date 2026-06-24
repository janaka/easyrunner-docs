---
title: Self-hosting Next.js shouldn't break on every deploy
date: 2026-06-24
authors:
  - janaka
categories:
  - behind-the-scenes
tags:
  - nextjs
  - self-hosting
slug: self-hosting-nextjs-without-the-breakage
---

You move a Next.js app off Vercel onto your own VPS, it works, and then every redeploy quietly breaks *something* — ISR goes cold, the browser 404s on chunks that no longer exist, `next/image` stops optimising, streaming stalls, `NEXT_PUBLIC_` values come out wrong, and in-flight requests get cut mid-deploy. I kept hitting these, so I made Next.js a first-class path in EasyRunner and closed the gaps one by one.

<!-- more -->

## It's not you, it's the missing platform

Here's the thing almost nobody tells you up front: Next.js is co-designed with Vercel. The framework leans on a CDN, an edge cache, immutable asset routing, and a build/runtime split that Vercel provides invisibly. The moment you self-host, all of that disappears — and *you* are now the platform.

That's why self-hosted Next.js feels like it "breaks after every update". Nothing is actually broken. You're just re-solving caching, cache-busting headers, image optimisation, streaming, and build-time vs runtime config by hand, on every single deploy, and any one of them slipping shows up as a user-visible regression.

I didn't want EasyRunner users re-solving that. So when a service is tagged as Next.js, EasyRunner now wires up the platform layer for you.

## What actually broke — and what EasyRunner does now

| What breaks when you self-host | What EasyRunner does for you |
| --- | --- |
| **ISR cache wiped on every redeploy** — pages re-render cold, first visitor after each deploy eats the latency | Detects whether `.next/cache` is on a persistent volume and **warns you at deploy time** if it isn't, so ISR actually survives a redeploy |
| **`ChunkLoadError` / 404s on `/_next/static/*`** — old HTML asks for chunks that aren't cached, or aren't cached long enough | Caddy serves `/_next/static/*` with `Cache-Control: public, max-age=31536000, immutable` — chunks are cached hard and correctly, the way Vercel's CDN does it |
| **Streaming & Suspense stall** — App Router streaming, RSC, and SSE buffer behind the proxy and arrive all at once | The catch-all reverse proxy runs with `flush_interval: -1`, so every chunk is flushed immediately and streaming works end to end |
| **`next/image` throws in production** — `sharp` isn't in the runtime image | The reference image installs `sharp` so image optimisation works without you debugging native deps |
| **`NEXT_PUBLIC_` values are wrong** — they're baked at *build* time, but you only know the domain at *deploy* time | `EASYRUNNER_APP_DOMAIN` and `EASYRUNNER_APP_URL` are auto-injected as build args, so you can wire them into `NEXT_PUBLIC_*` without hardcoding a domain anywhere |
| **Redeploys cut live requests** — the old container is killed before it finishes responding | systemd/Podman units get a 30-second graceful stop window, so in-flight requests drain before the container goes away |
| **Static public files re-fetched every time** — fonts, icons, favicons | Common asset types (`.svg`, `.ico`, `.png`, `.woff2`, …) get a 24-hour cache; `/api/*` is set `no-store` so dynamic routes never get cached by mistake |

None of this is exotic. It's the boring platform plumbing that Vercel hides and self-hosting exposes — now handled for you.

## The payoff: one label

You don't configure any of the above by hand. You mark your public service as Next.js, and EasyRunner applies the framework-aware Caddy routing, the build-arg injection, and the graceful-shutdown window automatically:

```yaml title=".easyrunner/docker-compose-app.yaml"
services:
  web:
    # ...
    volumes:
      - next_cache:/app/.next/cache   # ISR survives redeploys
    labels:
      xyz.easyrunner.service.type: web
      xyz.easyrunner.service.framework: nextjs   # ← turns on everything above
      xyz.easyrunner.service.port: "3000"
```

Then the usual:

```bash
er app deploy my-next-app my-server
```

## Where the line is right now

!!! note "Single-server today, multi-instance on the roadmap"
    Everything above targets the **single-server** case — one VPS running your app — which is how most people actually self-host. That case is now solid.

    The one failure mode I'm *not* claiming to have solved is multi-instance: running several replicas behind a load balancer, where each instance can build a different `BUILD_ID` and a client can land on a replica that doesn't have its chunks. Doing that properly needs a shared cache handler and a stable `deploymentId` across instances. That's on the multi-server roadmap — I'd rather ship the honest single-server path than hand-wave a distributed one.

If you're on one box — and for self-hosting, you very likely are — Next.js now behaves the way you expected it to before you left the platform.

[Deploy a Next.js App →](../../user-docs/recipes/nextjs.md){ .md-button .md-button--primary }
[See how EasyRunner works](../../how-it-works.md){ .md-button }
