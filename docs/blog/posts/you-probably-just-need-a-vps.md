---
title: You probably just need a VPS
date: 2026-07-07
authors:
  - janaka
categories:
  - First Principles
tags:
  - self-hosting
  - vps
  - paas
  - portability
slug: you-probably-just-need-a-vps
---

Most applications will spend their entire lives fitting comfortably on one small VPS. The industry default — renting a metered platform — solves problems your app doesn't have, and bills you as if it did.

<!-- more -->

## Your load is a rectangle

Plot your application's resource usage over a month. For the overwhelming majority of apps — internal tools, SaaS products with actual paying customers, content sites, APIs — the picture is a rectangle. A gentle daily wobble, maybe a weekly rhythm, sitting on a flat, predictable baseline.

Usage-based pricing was designed for a different picture: the spiky curve that's near zero at 3am and enormous at launch. What the metered platforms — Vercel, Heroku, Render, Railway, Cloudflare and friends — are fundamentally selling is **elasticity**: capacity that appears the moment you need it and vanishes the moment you don't.

Elasticity is genuinely valuable — *if your load is unpredictable*. If your load is a rectangle, elasticity is worth nothing to you. But it isn't priced at nothing. It's baked into every metered unit you buy: every gigabyte of bandwidth, every unit of memory-time, every batch of invocations carries the premium of a promise you'll never call in.

Steady-load applications are the metered platform's best customers. They pay for the insurance every month and never make a claim.

## The meter doesn't measure their costs

Here's the part that took me longest to see clearly: ==utilisation pricing is a billing model, not a cost model==.

It *feels* fair — pay for what you use — which is exactly why we don't question it. But look at what's actually being metered. Bandwidth is billed to you by the gigabyte while the platform buys capacity, not volume. Compute is billed by the request-second on machines that were switched on either way. Plenty of invoice line items — request counts, build minutes, image transformations — sit on top of costs that barely move with your load at all.

When the price scales with your usage but the underlying cost doesn't, the gap isn't infrastructure. It's margin. You aren't paying for resources; you're paying for the meter.

And the meter changes how you build. Once every request has a price, you start optimising your application for the invoice — shaving invocations, contorting your caching strategy to dodge egress, batching work into whatever shape the pricing page rewards. That's engineering effort spent playing the meter instead of serving users, and it's a tax the rectangle-shaped app never needed to pay.

## The spike arrives as an invoice

The standard defence of usage pricing is the spike: *what if you go viral?* This is, ironically, the scenario the model handles worst.

An elastic platform doesn't protect you from a black-swan traffic event — a viral link, a scraper swarm, a misbehaving bot. It *absorbs* the event, cheerfully, at metered rates, and forwards you the bill. At the exact moment your interests and the platform's diverge most, the meter keeps running.

| Under a sudden spike… | A small VPS | A metered platform |
| --- | --- | --- |
| What happens | The site slows down, then falls over | The site stays up |
| Worst case | Downtime | An invoice with no ceiling |
| When you find out | Immediately — alerts fire, pages crawl | Whenever you next open the billing dashboard |
| The fix | Rate-limit, cache, restart, apologise | A support ticket asking for goodwill |

A VPS fails **bounded**: the worst case is an outage — visible, fixable, and over when it's over. A metered platform fails **unbounded**: the site stays up, and the damage lands on your card.

!!! note "But spend caps exist now"
    Some platforms have added spend limits and alerts, and if you're on one, you should absolutely turn them on. But notice what a spend cap *is*: a kill switch that turns an unbounded bill back into… downtime. The failure mode you were paying a premium to avoid. Configured properly, the metered platform fails exactly the way the VPS does — you've just paid extra for it.

## The quiet cost: your architecture stops being yours

Even if the pricing were fair, there's a second, quieter charge on the account — paid in architecture.

If the platform is serverless, your application must be built around its constraints: execution time limits, no persistent filesystem, cold starts you learn to design around, and the platform's own KV store, queue, cron, and edge primitives where boring portable ones would have done. None of those constraints exists for your benefit. They exist so the platform can schedule you efficiently across its multi-tenant infrastructure — and each one is an architecture decision someone else made for you.

Individually, each is reasonable. Collectively, they shape the codebase. On day one it's fine. A year in, your application is *shaped like the platform*: business logic threaded through proprietary primitives, data in stores no other host offers, a framework whose happy path assumes this exact vendor. Leaving is no longer a redeploy; it's a re-architecture.

That's the compounding part. The overpaying from the meter is a monthly cost; the lock-in is a growing one. And it quietly destroys your only real pricing leverage — the credible ability to leave — which erodes a little further with every platform-specific line you write. Lock-in is rarely a moustache-twirling scheme. It's an emergent property of building around someone else's constraints. It prices like a scheme all the same.

## Portability is the asset

The alternative isn't heroic infrastructure work. It's a deliberately boring, portable stack:

- one container image, built from a plain `Dockerfile`
- a plain HTTP server listening on a port
- Postgres (or SQLite, or MySQL)
- a reverse proxy terminating TLS

```yaml title="docker-compose.yml — the entire platform"
services:
  app:
    image: ghcr.io/you/app:latest
    environment:
      DATABASE_URL: postgres://app@db:5432/app
  db:
    image: postgres:17
    volumes:
      - pgdata:/var/lib/postgresql/data
  proxy:
    image: caddy:2
    ports: ["80:80", "443:443"]

volumes:
  pgdata:
```

This runs identically on Render, on AWS, on Hetzner, on the box under your desk. Nothing in it knows or cares who the host is. Moving becomes: provision a machine, restore the database, point DNS. An afternoon — not a quarter of re-architecture.

That's **optionality**, and optionality is worth real money. You can price-shop hosts. You can jump to cheap dedicated hardware when you outgrow the VPS. You can sit across the table from any managed provider as someone who can actually walk. ==Portability is the only durable discount.==

Note that this isn't even an anti-PaaS argument, strictly. You can run a portable container *on* a PaaS and keep every option open — renting convenience without selling your architecture. What you shouldn't do is architect your application around one.

## When a PaaS is the right call

!!! tip "Where the metered platform genuinely wins"
    - **Truly spiky or unpredictable load** with a near-zero baseline — batch jobs, campaign pages, anything bursty. Here, paying per use really is cheaper than idle capacity.
    - **Prototypes and toys** — free tiers are unbeatable at scale zero. Take them.
    - **No ops appetite at all** — a team of one who'd rather spend every hour on product is making a real cost calculation, not being lazy.
    - **Hard edge-latency requirements** — a genuinely global audience with tail-latency budgets a single region can't meet.

    This post is an argument about **defaults**, not absolutes. These cases are real — they're just far rarer than the marketing implies.

## The boring default

Self-hosting has a real cost too, and honesty requires naming it: ops. Patching, backups, TLS, deploys, monitoring — you own them now. But that cost is **bounded and mostly front-loaded**: a weekend to set up properly, the occasional hour to maintain, and it keeps getting cheaper as tooling improves. The meter, by contrast, compounds and never stops. And the time you invest buys an asset — a portable application and the skills to run it anywhere — rather than a liability sitting on someone else's billing dashboard.

So default to the rectangle. One modest VPS, one container, a database, a reverse proxy. Rent more only when the load — not the marketing — tells you to.

**Rent nothing you can't leave.**

---

*Ready to try it? I've written a hands-on walkthrough of setting up a small VPS as a self-hosting base: [part one covers the base host](setup-hetzner-vps-for-self-hosting-pt1.md), and [part two the automated deploys](setup-hetzner-vps-for-self-hosting-pt2.md).*
