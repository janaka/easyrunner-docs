---
title: EasyRunner October 2025 Update
date: 2025-11-05
authors:
  - janaka
categories:
  - news
tags:
  - progress-update
slug: update-october-2025
---

I've been a bit quiet with outward communication recently, but that doesn't mean zero progress. This is really a September and October update combined. If you're wondering where the other updates are, they're not on the blog—in the past, they've been tweets from my account. Going forward I'm aiming for a monthly update post.

- **Getting ready for alpha testing** — A lot of work has gone into getting the tool published so users can install it using Homebrew (sorry, no official Windows and Linux support yet). I've never published a tool for Homebrew, and it was challenging to get the CI/CD setup right. There have been some fixes along the way, so end-to-end testing is required before we release. Alpha testing will be a small closed list of people who will give me feedback. If you'd like to get involved, drop me a line at [janaka@easyrunner.xyz](mailto:janaka@easyrunner.xyz).

- **R&D on hardening Ubuntu** — There was a bit of digging required to figure out how best to integrate Ubuntu CIS Level 1 server benchmark reporting and hardening. The Ubuntu 22.04 Benchmark profile (checks/fixes spec) is still in draft and not available on the easy path. In any case, you need an Ubuntu Pro subscription and to learn their tools to run it on a server—that's a lot of work. All the more reason to integrate it into EasyRunner so you get a hardened server out of the box. The core architecture for how to build the benchmark profiles from source and ship them to the right place so the server can be evaluated and patched is complete. In a future release, this needs to be integrated into the `init` command.

- **GitHub auth switched to device flow** — EasyRunner has the concept of _linking_ with certain tools and service providers like GitHub for repos and Cloudflare for DNS. I originally integrated GitHub OAuth using web flow, which isn't suitable for a CLI tool because a secret gets exposed on the client. I switched to device flow, which is the correct approach for a CLI. We use this authorization to automatically set up GitHub deploy keys for each of your repos that correspond to the apps you want to deploy. We use deploy keys for the default EasyRunner CI/CD flow that pulls and builds your app container on the host server itself.

- **UI/UX polish** — The look and feel of commands has been improved with formatted and colored output. It's a lot better but has room for improvement.
