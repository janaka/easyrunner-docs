---
title: EasyRunner April 2026 Update
date: 2026-05-10
authors:
  - janaka
categories:
  - News
tags:
  - progress-update
slug: update-april-2026
---
Progress update covering everything new since Dec 2025. Deploy from registries, app secrets, first-run setup and more.
<!-- more -->
It's been a big stretch since the last update. EasyRunner has moved from "build and run apps on a single server" toward something much closer to a practical self-hosting platform: clearer onboarding, improved security, more flexible deployments, safer secret handling and a runtime path that leans properly into Podman, systemd, Quadlet and Caddy.

We are still in alpha testing. If you'd like to get involved, drop me a line at [janaka@easyrunner.xyz](mailto:janaka@easyrunner.xyz).

- **Deploy from source or from a registry** — EasyRunner now supports two deployment flows so you can pick the one that fits how you build. Flow A is the original path: clone source from GitHub and build the container on the web host. Flow B is new: pull a pre-built image from a container registry (e.g. GHCR) using per-app credentials. Either way, EasyRunner stores your compose file, runs the container under systemd and routes it through Caddy with automatic HTTPS — so a Flow B app looks the same as a Flow A app from the outside. Flow B means EasyRunner is no longer tied to building on the host: you can build images in CI and let the web host focus on running them. This means it's also easier to deploy third party apps like OpenClaw with EasyRunner without needing to create shadow repo, add a .easyrunner/docker-compose.yaml and build the container when it's already published.

- **App secrets backed by your keyring** — A new `er app secret` command lets you set, get, list and delete secrets per app. Values go in through hidden prompts, get stored in your system keyring and are bound into the container as Podman secrets at deploy time. You stop hard-coding secrets into compose files, having them sit in plain text inside your repo or in viewable forms like env vars on the web server.

- **Generate secrets from the CLI** — The same secret command can generate strong tokens for you, with configurable length and formats like `hex` and `urlsafe_base64`. Handy when you need a random session key or API token and don't want to reach for `openssl rand` in another terminal.

- **Reserved internal secrets for EasyRunner** — Secret names prefixed with `EASYRUNNER_` are treated as internal: EasyRunner can read them but they aren't injected into your containers. That's what makes GHCR auth in Flow B clean — you store `EASYRUNNER_GHCR_USERNAME` and `EASYRUNNER_GHCR_PAT` once and EasyRunner uses them for registry login without leaking them into your app's environment.

- **First-run setup with control-plane modes** — The CLI now has a first-run flow via `er setup` that asks what role this install of EasyRunner should play in your control plane, instead of silently assuming and failing later. This is about where EasyRunner's own state lives, not about your web hosts. In **server mode**, this install is the source of truth: it persists the control-plane data (your apps, servers, links, secrets etc.) locally. Server mode usually runs on your laptop or on a dedicated machine you keep around — not on a web host under-management. In **client mode**, the install holds no local state and can only issue commands to an EasyRunner running in server mode. **Both mode** is a server-mode install that can also issue commands to another server-mode install. The net effect is that the single `er` binary can now support a proper client/server control plane setup, so you can centralise EasyRunner's data on one machine and drive it from others. The flow also introduced platform-aware config paths and SSH bootstrap for client mode, so macOS/client installs feel a lot less mysterious.

- **Lifecycle commands go through systemd** — `er app start`, `stop` and `restart` now drive the systemd Quadlet service that owns the container, instead of going through Podman compose at a lower level. This means CLI lifecycle actions match what the server actually does on boot, so you don't get drift between "what EasyRunner did" and "what's actually running". Remember EasyRunner doesn't actually use the Docker Compose tool, it merely supports the docker compose file format for declaring you config.

- **Pick the deploy branch** — You can configure which branch a deploy pulls from, and set a default deploy branch on the app itself. Useful when `main` isn't where your release line lives, or when different apps need to track different branches without you remembering to pass a flag every time. Previously `main` was hardcoded.

- **Per-service build contexts** — Each service in your compose file can have its own build context. This makes monorepos with multi service compose file definitions work properly: a `web` app and an `api` in the same repo can each build from their own subdirectory instead of fighting over a shared root. This is relevant to deploy Flow A where builds happen on the web host.

- **Mark which services are public** — Services can be labelled as `web` (publicly routed through Caddy) or `internal` (only reachable inside the app's container network). It gives you a clean way to deploy multi-service apps where a worker, queue or database stays off the public internet.

- **Compose `entrypoint` and `command` support** — EasyRunner now respects `entrypoint` and `command` from your compose file. You can deploy images that need a specific run command without having to repackage them just to satisfy the deploy tool.

- **Build-time arguments** — Compose `build.args` are now passed through on Flow A builds, so you can parameterise things like asset URLs, feature flags or version strings at build time without editing the Dockerfile each time.

- **Clearer build failure output** — When a build fails on the server, you now get more useful output about what actually went wrong, instead of having to SSH in and rerun the build by hand to see the real error.

- **No more "DB wiped on deploy"** — Generated Quadlet units now reference named volume units properly. This fixes the worst class of bug in the previous setup: a redeploy could end up replacing the volume backing your database. If you've been holding off using EasyRunner for anything with state, this was the blocker.

- **No registry auth required after reboot** — Quadlet units generated by Flow B now use a `Pull=never` policy. So after a server reboot, EasyRunner just starts the image it already has instead of trying to log in to your registry again. If your GHCR token has rotated since the last deploy, your app still comes back up.

- **Image pruning** — There are now commands to clean up old container images on the server. Pulling a fresh image every deploy adds up fast on a small VPS, so this is mostly about not running out of disk.

- **Podman 4.9.3 secret bug workaround** — The Podman version that ships on current Ubuntu LTS has a bug around secret creation. EasyRunner now works around it transparently, so you can use app secrets without having to upgrade Podman by hand.

- **Hardened registry pulls** — Image references are validated and pull arguments are properly quoted before being handed to Podman. Small change, but it means malformed or hostile input can't sneak into a shell command.

- **Quieter keyring prompts** — Keyring access now uses a process-level cache and, on macOS, a session gatekeeper. In practice you get noticeably fewer "allow access" popups during a single CLI run, which matters now that a single deploy can need to read several secrets in a row.

- **License quota enforcement** — License checks now cover server and app quotas, so the licensing model actually matches the plan you're on. For existing alpha users this is mostly groundwork; nothing should change day-to-day.

- **More tests, fewer surprises** — A lot of test coverage was added around the new behaviour: app secrets, deploy flow fields, compose-to-Quadlet conversion, Flow B authfile handling, image reference validation and the setup command. CI was also tightened so the EasyRunner wheel is installed before CLI tests run. None of this is visible from the outside, but it should mean fewer regressions slip through.


The main story is that EasyRunner is growing out of its early alpha shape. The fundamentals are getting clearer: first-run setup, two deployment paths, keyring-backed secrets, Caddy routing, systemd-managed containers and better tests around the important paths. There is still plenty to do, but the platform is starting to look like the thing it was meant to become.

We are still in alpha testing. If you'd like to get involved, drop me a line at [janaka@easyrunner.xyz](mailto:janaka@easyrunner.xyz) a tweet @janaka_a.
