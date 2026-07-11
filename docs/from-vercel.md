---
title: Self-host Next.js — keep the DX, lose the Vercel bill
description: Run your Next.js app on a server you own — ISR, image optimization, streaming and graceful shutdown all working — hardened and live in minutes, from one CLI.
---

# Self-host Next.js. Keep the DX, lose the Vercel bill.

Your Next.js app on a server you own — ISR, image optimization, streaming, and graceful shutdown all working — hardened and live in minutes, from one CLI on your machine.

[Deploy a Next.js app →](user-docs/recipes/nextjs.md){ .md-button .md-button--primary }
[Still deciding? Is self-hosting right for you?](blog/posts/you-probably-just-need-a-vps.md){ .md-button }

## Vercel is the best place to start — until the bill outruns the revenue

Let's be fair to Vercel: it's the easiest way in the world to ship a Next.js app. The framework is co-designed with the platform, so preview deployments, the global CDN, image optimization, and edge caching just *work* with zero config. For getting an idea live, nothing beats it.

The trouble is the **pricing model**, not the product. Vercel meters requests, bandwidth, compute time, and image transformations — so your bill is a function of your *traffic*, not your *revenue*. A viral post, an aggressive crawler, or a burst of image optimizations arrives as an invoice with no ceiling, at the exact moment you least want a surprise.

For a steady, predictable app — the kind most SaaS products and content sites actually are — you're paying elasticity insurance on load that never spikes.

!!! quote "From our FAQ"
    While those platforms charge per request, bandwidth, or compute time with costs that can spike unexpectedly, EasyRunner charges a simple per-app license fee while you pay your VPS provider directly for compute. **Your bill doesn't spike with traffic.**

    → [How EasyRunner compares to Vercel/Railway/Render/Fly.io pricing](faq.md#how-does-easyrunner-compare-to-vercel-railway-render-or-flyio-pricing)

## "But self-hosting Next.js is a nightmare"

This is the real fear, and it's an honest one. Here's the thing almost nobody says out loud: **Next.js is co-designed with Vercel.** The framework leans on a CDN, an edge cache, immutable asset routing, and a build/runtime split that Vercel provides invisibly. The moment you self-host, all of that disappears — and *you* become the platform.

That's why self-hosted Next.js feels like it "breaks after every deploy." Nothing is truly broken; you're just re-solving caching, cache-busting, image optimization, streaming, and build-time-vs-runtime config by hand, on every deploy. **EasyRunner wires up that platform layer for you** — you tag a service as Next.js, and it applies the framework-aware routing, build-arg injection, and graceful-shutdown window automatically.

| What breaks when you self-host | What EasyRunner does for you |
| --- | --- |
| **ISR cache wiped on every redeploy** — the first visitor after each deploy eats cold-render latency | Warns you at deploy time if `.next/cache` isn't on a persistent volume, so ISR survives redeploys |
| **`ChunkLoadError` / 404s on `/_next/static/*`** — old HTML asks for chunks that are no longer cached | Serves `/_next/static/*` with `Cache-Control: immutable`, cached hard and correctly, the way Vercel's CDN does |
| **Streaming & Suspense stall** — App Router streaming and RSC buffer behind the proxy | The reverse proxy flushes every chunk immediately, so streaming works end to end |
| **`next/image` throws in production** — `sharp` isn't in the runtime image | The reference image installs `sharp`, so image optimization works without debugging native deps |
| **`NEXT_PUBLIC_` values come out wrong** — baked at build time, but you only know the domain at deploy time | Injects `EASYRUNNER_APP_DOMAIN` / `EASYRUNNER_APP_URL` as build args, so you never hardcode a domain |
| **Redeploys cut live requests** — the old container is killed mid-response | A 30-second graceful-stop window drains in-flight requests before the container goes away |

<div class="grid cards" markdown>

-   :material-post-outline: **The full story**

    ---

    How each of these breaks — and exactly how EasyRunner closes the gap — written up as we built it.

    [:octicons-arrow-right-24: Self-hosting Next.js shouldn't break on every deploy](blog/posts/self-hosting-nextjs-without-the-breakage.md)

-   :material-rocket-launch-outline: **The step-by-step recipe**

    ---

    Containerize, configure, and deploy a Next.js app to a server you own — the practical how-to.

    [:octicons-arrow-right-24: Deploy a Next.js App](user-docs/recipes/nextjs.md)

</div>

## What you keep — and what you gain

You keep the Next.js developer experience. What changes is who owns the infrastructure, the bill, and the security posture.

<div class="grid cards" markdown>

-   :material-cash-check: **Predictable cost**

    ---

    A per-app license plus whatever your VPS provider charges for compute. No per-request, bandwidth, or image-transformation metering. Your bill doesn't move when your traffic does.

-   :material-lock-open-variant-outline: **No lock-in**

    ---

    Your app runs as a standard OCI container on a server *you* own. The buy-once perpetual license keeps working even if you never renew, and tiers scale with the *number of apps*, not features — no gates.

    [:octicons-arrow-right-24: Licensing & operating model](comparisons.md#licensing-operating-model)

-   :material-shield-check-outline: **Secure by default**

    ---

    CIS Level 1 hardening, a default-drop firewall, fail2ban, per-app OS-user isolation, an encrypted secrets vault, and an optional WireGuard mesh — the week of security work, done at setup.

    [:octicons-arrow-right-24: Security, compared](comparisons.md#security)

</div>

!!! tip "Closed source, but without the usual traps"
    EasyRunner is the paid, closed-source option in its category — and it deliberately avoids the two things people fear from proprietary software. There's **no lock-in** (standard containers on servers you own; the license keeps working if you stop paying) and **no feature gates** (every tier ships the complete security, secrets, and mesh feature set). You're paying for the security-by-default work to be done for you, not for permission to use your own server.

## When to stay on Vercel

Self-hosting isn't the right answer for everyone, and pretending otherwise would be a disservice.

!!! info "Vercel (or another managed platform) is the better fit when…"
    You want **zero infrastructure management**, need **massive-scale global CDN distribution** or **specialized edge compute**, or would simply rather not hold any server-security responsibility. In those cases a managed platform earns its price. EasyRunner is for the app that has *outgrown* the metered model and wants a predictable, owned home — not for escaping infrastructure entirely.

    → [When should I NOT use EasyRunner?](faq.md#when-should-i-not-use-easyrunner)

## Ready when you are

[Deploy a Next.js app →](user-docs/recipes/nextjs.md){ .md-button .md-button--primary }
[Still deciding? Is self-hosting right for you?](blog/posts/you-probably-just-need-a-vps.md){ .md-button }
[See the full comparison](comparisons.md){ .md-button }
