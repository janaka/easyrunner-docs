---
title: EasyRunner Mid-June 2026 Update
date: 2026-06-14
authors:
  - janaka
categories:
  - news
tags:
  - progress-update
slug: update-mid-june-2026
---
Progress update since the May post: encrypted control-plane backup and restore, stronger Next.js self-hosting, smoother secret access, audit logs, app secret sync, and more.
<!-- more -->
This has been a very security-and-recovery focused stretch for EasyRunner. The May update made servers safer to operate with the WireGuard mesh, SSH lockdown and a much clearer `doctor` surface. This update keeps moving in that direction: EasyRunner can now back up and restore its own control-plane state, run self-hosted Next.js apps more confidently, read secrets with far fewer auth interruptions, show a tamper-evident audit trail, and push app secrets to the right places with one command.

The result is a CLI that feels much more ready for real use: you can recover from losing the machine that runs EasyRunner, handle secrets with fewer prompts, see what sensitive actions happened, and spend less time wiring together deployment-time and CI-time configuration by hand.

- **Control-plane backups to Cloudflare R2** — A new `er backup` command group backs up EasyRunner's own state to an encrypted [restic](https://restic.net/) repository in Cloudflare R2. It captures the SQLite store, `config.json`, license, EasyRunner SSH keys and secrets needed to rebuild the control plane. This is not an app-data backup for your containers and databases; it is disaster recovery for EasyRunner itself, so a lost laptop or server-mode host does not mean rebuilding all of your app and server records from scratch.

- **A guided backup setup instead of a blank-page setup** — `er backup init` now does the fussy parts for you: it reuses your linked Cloudflare account, auto-detects the account ID, creates a per-install R2 bucket by default, shows the full plan before it changes anything and asks for confirmation. The bucket names include the hostname plus a short unique suffix, which makes them much easier to recognise later when you are choosing what to restore. Restic is also treated as a backup prerequisite instead of something every EasyRunner user has to satisfy during `er setup` or a general `er doctor`, so the first-run path stays lighter until you actually enable backups.

- **Fresh-host restore is now a real flow** — `er backup restore` can recover onto a new machine after you reinstall EasyRunner and re-link Cloudflare. It discovers candidate backup buckets, asks for the restic password, shows a restore plan, restores the store/config/license/SSH keys/secrets, and runs an integrity check. It also has a `--dry-run` path for previewing the restore and refuses to overwrite an already configured host unless you explicitly force it. A batch of restore and R2 fixes makes this path more predictable too: restore finds the right snapshot root deterministically, clears stale SQLite WAL/SHM sidecar files, handles R2-only or zoneless Cloudflare accounts, checks Cloudflare bucket-create responses properly, and avoids false "R2 scope missing" reports.

- **Backup commands for everyday confidence** — The backup surface includes `er backup run`, `er backup status`, `er backup list`, `er backup doctor` and `er backup doctor --fix`. Status tells you what is known without failing just because something needs attention, while doctor checks the Cloudflare token, R2 scope, restic, repository and integrity. Run and restore also gained clearer phase progress, so long operations feel a lot less opaque.

- **Smoother secret access with the same security posture** — EasyRunner already had an encrypted vault for secrets; this work refactors how the CLI accesses it so macOS no longer asks you to approve every individual key read. The vault now uses one master-key access path, while sensitive egress operations such as `er app secret get`, `er app secret generate`, `er backup init`, `er backup run` and `er server run-sudo` go through a presence gate with a configurable unlock window. The user-visible difference is simple: commands that need several secrets feel calmer, routine commands stay smooth, and commands that reveal or export sensitive material still get an intentional user-presence check.

- **A tamper-evident audit trail** — EasyRunner now records a hash-chained audit log for command actions, vault access and authentication challenges. The new top-level `er audit` command lets you view recent events, filter by event type with `--event action`, `--event vault_access` or `--event auth_challenge`, and verify the log chain with `--verify`. For operators, this is a big step toward being able to answer "what happened?" after a sensitive operation, not just whether the command succeeded.

- **Push app secrets to the server and GitHub Actions** — `er app secret push <app_name> <server_name>` gives app secrets a proper sync command. Plain app secrets are pushed to the server as Podman secrets. Secrets prefixed with `GH_SECRET_` are pushed to GitHub Actions for the app's repository, with the prefix stripped, and `EASYRUNNER_*` internal secrets are skipped. That makes it much easier to keep runtime secrets and CI secrets in sync without copying values through terminals, repos or browser tabs.

- **Stronger Next.js self-hosting support** — EasyRunner now lines up with the official Node.js server path for self-hosted Next.js apps: it keeps the simple long-running-container model with Caddy in front, uses clear Dockerfile and build/runtime environment patterns, and closes practical gaps around warm ISR cache, streaming, and graceful shutdown. In other words: Next.js on a small VPS now feels more like a first-class EasyRunner path without pulling in serverless machinery that does not fit how EasyRunner runs apps.

- **Security hardening around the edges** — Several smaller changes close off places where sensitive material could linger or be shown too eagerly. WireGuard private keys are scrubbed from `wg0.conf` after the tunnel comes up. HTTP debug logging now redacts bodies. `er link --status` shows less token material. A dead `podman login -p` path was removed so registry credentials are not passed in a risky argv shape. These are not flashy features, but they make the whole tool more comfortable to trust.

- **Store migrations for smoother upgrades** — EasyRunner now has a schema-migration runner and an indexed key-column convention for store tables, with `backup_destinations` moved onto that pattern. Most users will never think about this directly, which is the point: internal state changes can land with less upgrade drama, and restored databases can be migrated on load instead of leaving newer features to trip over older records.

- **License quota correctness** — License enforcement now uses the server limit from the license itself instead of a hardcoded value. For alpha users this should mostly be invisible, but it means the CLI's behaviour is now aligned with the plan data it is checking.

The theme this time is resilience. EasyRunner is getting better at protecting the state it owns, recovering that state when something goes wrong, and making security-sensitive work visible without making everyday commands miserable. That is a good place for an alpha self-hosting tool to be heading.

We are still in alpha testing. If you'd like to get involved, drop me a line at [janaka@easyrunner.xyz](mailto:janaka@easyrunner.xyz) or a tweet @janaka_a.