---
title: Manually Setup a Hetzner VPS for Self Hosting Pt1 - Secure Web Host
date: 2025-11-05
authors:
  - janaka
categories:
  - guides
tags:
  - hetzner
  - self-hosting
  - ubuntu
  - ci/cd
slug: manually-setup-hetzner-vps-for-self-hosting
---
A slightly opinionated guide on setting up a Hetzner VPS as a web host for self-hosting your project in containers. Part 2 will cover setting up automated deployment pipeline(CI/CD).
<!-- more -->

## Prerequisits

- Hetzner account

## Overview

At the end you will have a Hetzner Ubuntu VPS, setup as a web server, and hardened.


## Architecture

- Hetzner Firewall
- Hetzner Ubuntu 22.04 server
- Caddy Server reverse proxy
- Podman container runtime

## Setup steps