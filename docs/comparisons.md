---
title: EasyRunner vs Dokku, Dokploy & Coolify
description: How EasyRunner compares to the popular open-source self-hosting PaaS tools — architecture, operating model, multi-server management, and security.
---

# EasyRunner vs Dokku, Dokploy & Coolify

If you want to run your apps on **your own server** instead of renting a platform like Vercel,
Heroku, or Railway, EasyRunner, [Dokku](https://dokku.com), [Dokploy](https://dokploy.com), and
[Coolify](https://coolify.io) all get you there. They all turn a plain VPS into a place you can
deploy to, with containers, a reverse proxy, and automatic HTTPS.

Where they really differ is **how they're built and operated** — the runtime, the operating model,
how much attack surface they expose, and how *opinionated* they are. This guide compares all four
across the dimensions that actually matter when you're choosing one, and it's honest about where the
others are genuinely strong.

!!! info "The one-line summary"
    The three open-source tools are free and put a **web dashboard** at the center. EasyRunner is a
    **paid, CLI-first** product with **no web control plane at all** — the control plane is the `er`
    CLI on your own machine — and it ships **secure, opinionated defaults** so you're not wiring up
    hardening, secrets, and a private network yourself.

## At a glance

| Dimension | EasyRunner | Dokku | Dokploy | Coolify |
| --- | --- | --- | --- | --- |
| **Primary interface** | CLI (`er`) | CLI / `git push` | Web dashboard | Web dashboard |
| **AI-agent control** | CLI + shipped agent **skills** | Scriptable CLI; community MCP (early) | Official **MCP** + CLI | Built-in **MCP** (read-only) + API |
| **Control plane** | On *your* machine | On the server (SSH) | Web app on a server | Web app on a server |
| **Runtime** | Rootless **Podman** + systemd | Docker | Docker **Swarm** | Docker |
| **Reverse proxy / TLS** | Caddy + Let's Encrypt | nginx + Let's Encrypt | Traefik + Let's Encrypt | Traefik/Caddy + Let's Encrypt |
| **Deploy method** | `er` over SSH — build-on-server or pull a prebuilt image | `git push` → buildpacks/Dockerfile | Git webhook → Nixpacks/Dockerfile/Compose | Git webhook → Nixpacks/Dockerfile/Compose |
| **Manage multiple hosts** | ✅ from one local control plane | ❌ single host | ✅ | ✅ |
| **Licensing** | Proprietary, **paid** | MIT (open source) | Apache-2.0 (open source) | Apache-2.0 (open source) |
| **Internet-facing web admin** | **None** | None by default | Yes (the dashboard) | Yes (the dashboard) |
| **Host hardening out of the box** | ✅ CIS L1, fail2ban, firewall | DIY | DIY | DIY |
| **Built-in secrets vault** | ✅ encrypted | env vars | env vars (in DB) | env vars (in DB) |
| **Built-in VPN mesh** | ✅ WireGuard | ❌ | ❌ | ❌ |
| **Best for** | Secure-by-default, opinionated, multi-host | One box, CLI purists | Modern dashboard, multi-node | Biggest ecosystem, one-click catalog |

The sections below unpack each dimension.

## Deployment architecture

How your code actually gets from a repo to a running container.

| Tool | How you deploy |
| --- | --- |
| **EasyRunner** | Run `er app deploy` from your machine. It connects over SSH and either **builds your repo on the server** with `podman build` (Flow A) or **pulls a prebuilt image** from a registry such as GHCR (Flow B). Your app is described by a Compose-format file with `xyz.easyrunner.service.*` labels. |
| **Dokku** | The classic mini-Heroku: `git push dokku main` over SSH triggers a build with Heroku-style buildpacks (or your `Dockerfile`), then deploys. |
| **Dokploy** | Connect a Git repo; a push fires a webhook and Dokploy builds with Nixpacks (or your Dockerfile/Compose) and rolls out. You can also trigger deploys from the dashboard. |
| **Coolify** | Same git-webhook auto-deploy model (Nixpacks/Dockerfile/Compose), **plus a catalog of 280+ one-click services** (databases, tools) you can stand up alongside your apps. |

!!! tip "Two clear paths, on purpose"
    EasyRunner deliberately offers exactly two deploy flows — build-on-server or pull-an-image —
    rather than a long menu of builders. It's the *opinionated* choice: fewer ways to do it, each
    one hardened and supported. See [Deploy Flows](user-docs/concepts/deploy-flows.md).

## Runtime architecture

What actually runs your containers once they're deployed, and how traffic reaches them.

| Tool | Runtime & routing |
| --- | --- |
| **EasyRunner** | **Rootless Podman** containers supervised by **systemd** units — no long-running Docker daemon, no Swarm or Kubernetes. Each app runs as its **own dedicated OS user**. Only **Caddy** is exposed; it terminates TLS (auto Let's Encrypt) and forces HTTPS. Apps never bind host ports. |
| **Dokku** | Docker containers on a **single host** behind **nginx** (default), with Let's Encrypt via plugin. |
| **Dokploy** | **Docker Swarm** services behind **Traefik** + Let's Encrypt. Swarm is what gives it multi-node clustering and rolling updates. |
| **Coolify** | Docker containers on each connected server, behind a per-server **Traefik** (or Caddy) proxy + Let's Encrypt. |

The rootless-Podman-plus-systemd model is EasyRunner's most distinctive runtime choice: there's no
privileged Docker daemon in the picture, and per-app OS users mean a compromised container is boxed
into its own account rather than sitting next to everything else on a shared daemon.

## Technologies & building blocks

The components each tool is assembled from. (All four lean on the same boring, proven primitives —
containers, a reverse proxy, Let's Encrypt — but stitch them together differently.)

| Tool | Built from |
| --- | --- |
| **EasyRunner** | Podman · systemd · Caddy · Let's Encrypt · GHCR (or any registry) · an **encrypted SQLite secrets vault** tied to your OS keyring · **restic** backups (optionally to Cloudflare R2) · an optional **WireGuard** mesh. |
| **Dokku** | A Bash + Go core with a plugin-trigger system · herokuish / Cloud Native Buildpacks · Docker · nginx. |
| **Dokploy** | A **TypeScript/Node** control plane backed by Postgres + Redis · Traefik · Docker Swarm · Nixpacks. |
| **Coolify** | A **PHP/Laravel** control plane backed by Postgres · Traefik/Caddy · Docker · Nixpacks. |

The tell here: Dokploy and Coolify ship a **stateful web application** (with its own database, and in
Dokploy's case a Redis too) that *is* the control plane. EasyRunner has no such service to run — the
control plane is the CLI on your laptop, with its state and secrets stored locally.

## Licensing & operating model

This is the sharpest difference, and worth being blunt about.

| Tool | License | Operating model |
| --- | --- | --- |
| **EasyRunner** | **Proprietary, paid** (closed source) | Per-app pricing tiers; a perpetual *buy-once* license — one purchase covers a year of updates and **keeps working after** it lapses. **No SaaS** (the control plane is the `er` CLI on your own machine), **no vendor lock-in**, and **no feature gates** — every tier ships the complete product. |
| **Dokku** | MIT (free) | Self-host; optional paid **Dokku Pro** adds a web UI/API. |
| **Dokploy** | Apache-2.0 (free) | Self-host; optional low-cost managed **Dokploy Cloud**. |
| **Coolify** | Apache-2.0 (free) | Self-host; optional managed **Coolify Cloud**. |

!!! note "EasyRunner is the only paid one — and it's closed source, but without the usual traps"
    With the open-source tools the software is free; the work of hardening the host, wiring up
    secrets, locking down access, and keeping it all patched is **on you**. EasyRunner charges for an
    **opinionated, secure-by-default, supported product** that does that work for you out of the box.

    It's **closed source**, but it deliberately avoids the two things people actually fear from
    proprietary software. There's **no lock-in** — your apps are standard OCI containers running on
    servers *you* own, and the perpetual license keeps working even if you never renew. And there are
    **no feature gates** — tiers scale with the *number of apps*, not capabilities, so every plan
    includes the full security, secrets vault, VPN mesh, and multi-host feature set.

    If you'd still rather have the source and assemble it yourself, that's a perfectly good reason to
    pick Dokku, Dokploy, or Coolify instead. See [Pricing](pricing.md) for the tiers.

## Primary UI & AI-agent compatibility

### How a human drives it

| Tool | Main interface |
| --- | --- |
| **EasyRunner** | **CLI only** (`er`), by design — there's no web UI to host, expose, or depend on us to run. The control plane lives with you. |
| **Dokku** | **CLI / SSH** and `git push`. Web UIs exist but are third-party or part of Dokku Pro. |
| **Dokploy** | **Web dashboard first** (with an API/CLI as secondary). |
| **Coolify** | **Web dashboard first** (with an API as secondary). |

A web dashboard is genuinely nice for click-ops, log browsing, and onboarding teammates who don't
live in a terminal — that's a real advantage of Dokploy and Coolify. The flip side is that the
dashboard is also the thing you must expose to the internet and keep secure (see
[Security](#security) below). EasyRunner trades the dashboard away to remove that surface entirely.

### How an AI agent drives it

There's now a third kind of interface that matters as much as the CLI or the GUI: **the AI agent**.
Coding agents like Claude Code can stand up and operate your infrastructure for you — but only as
well as the tool exposes a **complete, deterministic, text-based surface**. An agent can't reliably
click through a dashboard; it needs a full CLI, an API, or an [MCP](https://modelcontextprotocol.io)
server. All four have moved in this direction, but from very different starting points.

| Tool | Driving it with an AI agent |
| --- | --- |
| **EasyRunner** | **Agent-native by construction.** The whole product *is* the `er` CLI, so the complete, deterministic surface an agent drives is the **same first-class interface a human uses** — no GUI-only gap to bridge. On top of that, EasyRunner ships **agent skills** (repo-prep, app-create, deploy, update) that encode the *entire workflow*: an agent can take a repo that isn't even containerized yet, pick the right deploy flow, wire up secrets, and get it live. |
| **Dokku** | Its complete CLI over SSH is inherently scriptable, so an agent can drive the full lifecycle today. A **community MCP server** exists but is early-stage and not recommended for production. No agent skills. |
| **Dokploy** | Dashboard-first, but ships an **official MCP server and CLI** — auto-generated from its OpenAPI spec for full API coverage (hundreds of tools) — plus AI-assisted debugging. Broad coverage, though the agent surface is an API mapping of the GUI rather than a CLI-first product. |
| **Coolify** | Dashboard-first, with a **built-in MCP server** (read-only today; writes planned) plus community MCP servers and a REST API. Strong for agent-driven inspection and queries; write automation through the official MCP is still maturing. |

!!! tip "Skills encode *how*; MCP exposes *what*"
    There's a meaningful difference between these approaches. An MCP server maps a tool's API
    endpoints to agent tools — powerful, but the agent still has to know the right sequence and make
    the right choices. EasyRunner's **skills** package up the *procedure and judgment* — how to
    containerize an unprepared repo, which deploy flow fits, how secrets get wired — so an agent goes
    from a raw repo to a running app, not just from one endpoint to the next. And because EasyRunner
    is CLI-first, that agent surface **is the product itself**, not a secondary layer bolted onto a
    dashboard.

## Managing multiple web hosts

| Tool | Multi-server story |
| --- | --- |
| **EasyRunner** | One **local control plane manages many** Ubuntu web hosts. Provision a Hetzner box with `er server create`, or bring your own with `er server add`, then `er server init`. |
| **Dokku** | Built for a **single host**. Multi-node is possible via K3s/Nomad schedulers, but it isn't the main path. |
| **Dokploy** | **Multi-server / multi-node** — the control plane plus SSH-connected remote servers and Docker Swarm nodes. |
| **Coolify** | **Multi-server** — one lightweight control plane plus any number of SSH-connected worker servers. |

If you only ever run one box, Dokku's simplicity is hard to beat. Once you're spreading apps across
several servers, EasyRunner, Dokploy, and Coolify all manage a fleet from one place — EasyRunner from
your CLI, the other two from their dashboard.

## Security

The biggest security difference between these tools isn't a feature checklist — it's the **shape of
the system**.

A web-dashboard PaaS puts a *privileged* control plane on the public internet: a web app that can
build images and run containers as root across your whole fleet. That's convenient, and it's also the
highest-value target on the box. EasyRunner has **no web control plane at all** — the control plane is
the `er` CLI on your own machine, reaching hosts over SSH — so there's simply no dashboard to expose,
brute-force, or exploit.

### Control-plane attack surface

| Tool | Where the control plane lives | Internet-facing web admin? |
| --- | --- | --- |
| **EasyRunner** | The `er` CLI on your machine | **No** |
| **Dokku** | On the server, driven over SSH | No by default (Pro/3rd-party UI is optional) |
| **Dokploy** | A web app on a server | **Yes** |
| **Coolify** | A web app on a server | **Yes** |

### Host & app hardening

EasyRunner ships secure defaults that you'd otherwise assemble by hand:

- **Firewall** with a default-drop policy — only ports 22, 80, and 443 are open.
- **fail2ban** and **CIS Level 1** server hardening applied out of the box.
- **SSH key-only** access; keys held in your OS keyring, not left on disk.
- **Per-app OS-user isolation** — apps can't reach each other or bind host ports.
- An **encrypted secrets vault** — secrets are injected at deploy time (never written into the repo
  or Compose file) and sensitive reads are gated behind Touch ID.
- An optional **WireGuard mesh** you can lock SSH behind with `er mesh lock`.

With Dokku, Dokploy, and Coolify you *can* reach a strong security posture too — but the hardening,
secrets handling, and network lockdown are largely **your** responsibility to configure and keep up.

!!! warning "If you do run a web dashboard, own its patch cadence"
    Any internet-facing control plane that can run containers as root is a high-value target, and
    web admin panels across this whole category have periodically shipped serious vulnerabilities —
    simply because that's where the value is. If you self-host Dokploy or Coolify, keep them updated
    promptly, restrict who can reach the dashboard, and put it behind a VPN or allow-list where you
    can. Removing that surface is precisely why EasyRunner has no web UI.

!!! note "Be fair: EasyRunner is the youngest and only closed-source option"
    Dokku has been battle-tested for over a decade, and Coolify has a very large, active community
    finding and fixing issues in the open. If open-source auditability or a big plugin ecosystem is a
    hard requirement for you, that's a legitimate reason to choose one of the others.

## Which should you choose?

There's no single winner — it depends on what you value.

<div class="grid cards" markdown>

-   #### Choose **Dokku** if…

    ---

    You run a **single box**, live happily in the terminal, want the smallest, most mature,
    `git push`-to-deploy mini-Heroku, and want it free and MIT-licensed.

-   #### Choose **Coolify** if…

    ---

    You want the **richest free web dashboard**, a huge **one-click service catalog**, and the
    biggest community — and you're comfortable owning the dashboard's security and updates.

-   #### Choose **Dokploy** if…

    ---

    You want a **modern free dashboard** with **multi-node** Docker Swarm deployments and Compose
    support, and you like clicking through deploys rather than typing them.

-   #### Choose **EasyRunner** if…

    ---

    You want **secure-by-default** infrastructure with **no web control plane to expose**, rootless
    Podman isolation, a built-in secrets vault and VPN mesh, multi-host management from one CLI — and
    you'd rather **pay for opinionated, hardened defaults** than wire them up yourself.

</div>

If that last one sounds like you, the fastest way to feel the difference is to deploy something:

[Deploy your first app →](user-docs/quickstart/first-app.md){ .md-button .md-button--primary }
[See how EasyRunner works](how-it-works.md){ .md-button }
