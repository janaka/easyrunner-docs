---
title: EasyRunner May 2026 Update
date: 2026-05-30
authors:
  - janaka
categories:
  - News
tags:
  - progress-update
slug: update-may-2026
---
Progress update since the April post: a private WireGuard mesh VPN with SSH lockdown, a unified `doctor` diagnostics surface, a new `er server status`, clearer compose labels and more.
<!-- more -->
Another busy few weeks. If the April update was about getting the deployment fundamentals right — two deploy flows, keyring-backed secrets, systemd-managed containers — this one is about making EasyRunner **safer to operate and easier to reason about**. The headline is networking: EasyRunner can now build a private WireGuard mesh between your machine and your servers and lock SSH off the public internet entirely. Around that, there's a unified way to check health, a command that tells you what a server is actually doing, and a batch of smaller-but-meaningful improvements.

- **A private mesh VPN for your servers** — A new `er mesh` command builds a hub-and-spoke [WireGuard](https://www.wireguard.com/) network: your machine is the hub and each server you join is a spoke on a private `10.99.0.0/24` subnet. `er mesh init` sets up your side, `er mesh join <server>` brings a server onto the mesh — installing WireGuard on it, assigning it a mesh IP and opening the WireGuard UDP port on both the host firewall and, for Hetzner, the cloud firewall automatically. `er mesh status` and `er mesh doctor` show you who's connected and whether the tunnels are healthy.

- **Lock SSH off the public internet** — This is the reason the mesh exists. `er mesh lock <server>` restricts SSH to the WireGuard interface, so port 22 becomes unreachable from the public internet while your apps on 80/443 stay open. Once a server is locked, EasyRunner automatically routes its own SSH (deploys, logs, everything) over the mesh — you don't change how you run commands. A dead-man's switch on the server auto-reverts the firewall if the tunnel goes quiet for ~150 seconds, so a broken tunnel re-opens SSH on its own rather than locking you out. `er mesh unlock` puts public SSH back when you need it.

- **One way to check health: `doctor`** — All of EasyRunner's health checks now share a single diagnostics pattern with consistent pass/fail output and remediation hints: `er doctor` checks your local CLI setup, `er server doctor` checks a web host (container runtime, reverse proxy, firewall, connectivity), `er link doctor` checks your integrations and `er mesh doctor` checks the mesh. **Heads-up for existing users:** this renamed `er server verify` → `er server doctor` and `er link status` → `er link doctor`.

- **`er server status` — what's my server doing right now?** — A new command reports the live operational state of a web host: uptime, load average, memory, disk, the status of each deployed app's containers, and the server's mesh IP. It's read-only and never fails on what it finds — `doctor` answers "is this host healthy?", `status` answers "what is it doing right now?".

- **Prerequisite checks with one-command install** — `er setup` and `er doctor` now check that the tools EasyRunner depends on (such as `wireguard-tools` for the mesh) are installed, and show the right install command for your platform — Homebrew on macOS, apt on Ubuntu, winget on Windows — though we aren't focusing on support for those last two platforms yet, so macOS is the smoothest experience today. `er doctor --fix` installs the missing CLI prerequisites for you instead of leaving you to figure it out.

- **Clearer `service.*` compose labels** — The labels you put on services were renamed from `app*` to a clearer `service.*` namespace: `service.type`, `service.framework`, `service.port` and `service.build-context`. They describe a *service*, so the names now say so. Your existing files keep working — the old `app*` labels are still accepted as a fallback — but the new names are canonical and recommended. There's also a new `worker` service type for background processes with no inbound port.

- **Auto-injected app metadata** — Every deployed container now gets a set of read-only `EASYRUNNER_*` environment variables: `EASYRUNNER_APP_NAME`, `EASYRUNNER_APP_DOMAIN`, `EASYRUNNER_APP_URL`, `EASYRUNNER_SERVER_NAME` and `EASYRUNNER_SERVER_IP`. You can build absolute URLs, OAuth callback URLs and CORS allowlists from `EASYRUNNER_APP_URL` instead of hardcoding your domain. They're injected before your own `environment:` entries, so you can still override them, and they work in both deploy flows.

- **Backfill firewall rules on existing servers** — `er server reapply-firewall <server>` re-applies EasyRunner's canonical host firewall policy idempotently — only adding what's missing and removing what's stale. It's how you bring servers initialised by an older CLI version up to date with new rules (like the mesh ports) without reinitialising them. Mesh hosts also now allow ICMP over the tunnel, so you can ping a server on its mesh IP.

- **One firewall engine, cloud and host** — Under the hood, the cloud-provider firewall and the on-host iptables firewall now sit behind a single abstraction with idempotent, named rules. Mostly invisible, but it's what makes mesh lockdown and `reapply-firewall` predictable and safe to run repeatedly.

- **More reliable unit naming** — Generated systemd/Quadlet unit names now derive from your compose service list and the app name, which fixes naming edge cases for multi-service and Flow B apps. Command lists from `entrypoint`/`command` are also joined with `shlex`, so images that need arguments run correctly.

- **Expanded documentation** — There's now a full CLI user-docs section on the site covering the core concepts, quickstarts, server and app guides, a dedicated guide to the new mesh VPN and SSH lockdown, and a reference for commands and compose labels.

The throughline this month is operability and trust: SSH no longer has to face the public internet, every part of the CLI answers the same `doctor` question the same way, and your servers can tell you how they're doing in one command. There's plenty still on the list, but EasyRunner is getting noticeably more comfortable to actually run things on.

We are still in alpha testing. If you'd like to get involved, drop me a line at [janaka@easyrunner.xyz](mailto:janaka@easyrunner.xyz) or a tweet @janaka_a.
