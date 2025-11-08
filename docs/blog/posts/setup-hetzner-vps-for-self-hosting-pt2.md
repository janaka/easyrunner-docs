---
title: Manually Setup a Hetzner VPS for Self Hosting Pt2 - Automated Code Deployment
date: 2025-11-05
authors:
  - janaka
categories:
  - guides
tags:
  - hetzner
  - self-hosting
slug: manually-setup-hetzner-vps-for-self-hosting-pt2-automated-deployment
---
In [pt 1](/manually-setup-hetzner-vps-for-self-hosting-pt2-automated-deployment) we covered the steps to setting up a Hetzner VPS as a secure web host. This guide covers how you setup automated deployment pipelines to get your on to the server.
<!-- more -->

## Prerequisits

- Ubuntu server configured based on part 1 of this guide.

## Architecture 

- Code repo on Github.com
- Github Action
- on branch push: CI
- on merge to main/master branch: CI and CD

## Overview
