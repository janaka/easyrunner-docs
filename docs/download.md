---
title: Download
description: EasyRunner's free tier — 1 app on 1 server, every feature included — is weeks away from self-serve download. See exactly where it stands and get notified the day it goes live.
---

# Download EasyRunner

**Free for 1 app on 1 server — every feature included.** No feature gates, no trial clock — a real perpetual license, in a **first batch limited to 10**.

The self-serve download isn't live *quite* yet — we're **weeks, not months** away. When it opens, the batch goes **first come, first served**.

<!-- MANUAL COUNTER — on every claimed license update: the "left" number below, and the fill width % (remaining ÷ total × 100). -->
<div class="er-license-meter">
  <p class="er-meter-labels"><span>First batch — <strong>10</strong> free licenses</span><span><strong>9 left</strong></span></p>
  <div class="er-meter-track"><div class="er-meter-fill" style="width: 90%"></div></div>
</div>

[Notify me when it's live →](https://easyrunnerxyz.substack.com/subscribe){ .md-button .md-button--primary data-ga-event="notify_me_click" data-ga-source="download_page" }
[Can't wait? Email for alpha access](mailto:janaka@easyrunner.xyz){ .md-button data-ga-event="alpha_email_click" data-ga-source="download_page" }

!!! success "Where this is right now"
    This isn't a landing page for an idea — the product already runs real apps:

    - **The CLI is built and installable.** It ships through Homebrew (`brew tap janaka/easyrunner`), with stable, beta, and dev channels.
    - **Alpha users run production apps on it today** — including [the incident write-up where EasyRunner's isolation contained a real compromise](blog/posts/hardening-easyrunner-after-a-compromise.md).
    - **The docs cover the whole surface**, from [deploying your first app](user-docs/quickstart/first-app.md) to the [full command reference](user-docs/reference/commands.md).
    - **Development is active** — see the [latest progress update](blog/posts/mid-june-2026-update.md).

    The one missing piece: today every license file is issued by hand for alpha testers. The self-serve flow that issues your **free license instantly** is what we're finishing now — it's the last step before this page becomes a download button.

## What you'll get

<div class="grid cards" markdown>

-   #### :material-console: The `er` CLI

    ---

    The whole product is one CLI on your machine — no control plane to run, patch, or breach. macOS via Homebrew today; Linux and Windows are on the roadmap.

-   #### :material-license: A free license, instantly

    ---

    **1 app on 1 server, $0.** Issued self-serve the moment you download — no sales call, no card. Like every EasyRunner license, it's perpetual: it never expires.

-   #### :material-lock-open-variant-outline: Every feature. No gates

    ---

    The same hardening, encrypted secrets vault, HTTPS automation, and mesh VPN as the top paid tier. [See everything included →](features.md)

-   #### :material-stairs-up: Room to grow

    ---

    Outgrow one app? [Paid tiers](pricing.md) change only how many apps you can host — never which features you get.

</div>

## Straight answers

??? question "Is the free tier actually free?"

    Yes. It's a real perpetual license, not a trial — it never expires and nothing gets switched off. It's scope-limited (1 app on 1 server), not feature-limited. EasyRunner is a paid, closed-source product overall, but deliberately without the usual traps: **no lock-in** (standard containers on a server you own) and **no feature gates** on any tier, including this one.

??? question "What platforms does it support?"

    The CLI runs on **macOS** today (via Homebrew), with Linux and Windows planned. Your server is any **Ubuntu 24.04 VPS** from any provider, and your app is anything that runs in a container — Next.js, Node, Python, PHP, Go, whatever you ship.

??? question "Why isn't the download live today?"

    Honest answer: the software is done enough that alpha users run production apps on it — but licenses are still issued by hand, one email at a time. Wiring up the flow that issues a free license automatically is the last self-serve piece, and we'd rather ship it properly than bolt on a signup form that leads to a waiting inbox.

??? question "Why only 10? And what happens when they're gone?"

    Because it's honest scarcity, not a marketing gimmick: EasyRunner is a small hand-run product, and every free license comes with real support attention we intend to actually give. When the batch is gone, the free tier closes — we may open another batch later, but that's not a promise. If you want one, being early genuinely matters.

---

**Want in before the button goes live?** Alpha testers get a license today plus hands-on onboarding help, in exchange for brutally honest feedback.

[Get alpha access →](mailto:janaka@easyrunner.xyz){ .md-button data-ga-event="alpha_email_click" data-ga-source="download_page" }
