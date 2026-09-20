# EasyRunner marketing site strategy

## Purpose

**Scope: the marketing website only.** How a visitor who has already arrived is met, qualified, and
converted. Information architecture, messaging by audience, homepage job, and the page-level content
plan.

**This document assumes traffic and credibility arrive from somewhere else, and that assumption is
currently false.** Why nobody arrives, and why they have little reason to trust us, is the subject of
its parent, [`distribution-strategy.md`](distribution-strategy.md). Read that first. Nothing here can
succeed ahead of it.

Also out of scope here:

- Concrete segments, enemy, beliefs, objections and the signal-to-page map: [`positioning.md`](positioning.md).
- Phases, status and the build plan: [`roadmap.md`](roadmap.md).
- Dated decisions and what was rejected: [`decisions.md`](decisions.md).

The governing rule for everything below: **convert the convinced, educate the uncertain.**

## Product context

EasyRunner is positioned as a CLI-first self-hosting platform that helps users deploy apps to their own servers without the usual operational complexity. The current public positioning emphasizes ownership, predictable costs, and avoiding surprise bills or platform lock-in. Pricing is based on the number of hosted apps, while users pay their VPS provider directly for compute.

## Strategic lens from the book

The central idea taken from *Why Killer Products Don’t Sell* is that a product should not be sold with a generic sales motion; the company should match its sales and messaging to the buyer’s buying culture. The book’s relevance to EasyRunner is that self-hosting is not just a feature choice but often a category and workflow decision, so some prospects need straightforward product conversion while others need education and category conviction first.

The most important conclusion is that EasyRunner should not try to serve all prospects with one homepage message. The market contains at least two different readiness states, and they should be treated as distinct paths rather than blended into one generic self-hosting pitch.

## Core decisions

- EasyRunner should be framed primarily as a control, predictability, and ownership product rather than a generic PaaS alternative.
- The default conversion audience should be people who have already decided that self-hosting on a VPS is the right direction for them.
- Prospects who are still deciding whether self-hosting is right should be treated as an education audience, not the default homepage audience.
- Messaging should be segmented by both buyer readiness and source ecosystem, especially users coming from [Vercel](https://vercel.com/) and [Lovable Cloud](https://lovable.dev/cloud).
- The main marketing site should optimize for conversion of VPS-decided users, while supporting ecosystem-specific and decision-support content through dedicated pages.
- Pages are the endpoints of the distribution loop, not a channel in themselves. See [`distribution-strategy.md`](distribution-strategy.md).

## Audience

The readiness × source-ecosystem model and the current priority order are market-level decisions and
live in [`distribution-strategy.md`](distribution-strategy.md#the-market-we-are-actually-addressing).
The concrete segment table (who, trigger, fear, landing page) is in
[`positioning.md`](positioning.md#segments), edited via [`AUTHORING.md`](AUTHORING.md).

What matters for the site: each segment gets one page whose job is to serve that segment only, and the
homepage converts the most-ready segment rather than trying to address all of them.

## Positioning

### Core positioning

EasyRunner should be positioned as a way to run apps on a user’s own VPS without forcing them to become their own platform team. The product promise is not “infinite flexibility” or “enterprise platform engineering.” The promise is predictable infrastructure ownership with much less operational pain.

### Core value pillars

- **Ownership.** The customer controls the server and stack.
- **Predictability.** Pricing is app-based rather than usage-metered by EasyRunner, and the user pays the VPS provider directly for compute.
- **Reduced complexity.** EasyRunner simplifies the operational work of deploying to owned infrastructure.
- **Lower lock-in.** The message of “own your stack” and “no surprise bills” directly supports a portability and trust narrative.

### Positioning guardrails

- Do not market EasyRunner as a generic “better Vercel” or “cheaper cloud.” That is too broad and weakens differentiation.
- Do not lead with a long feature list.
- Do not use the same message for convinced and unconvinced prospects.
- Do not over-target “all developers.” The message should feel specific to builders who value control, cost predictability, and VPS ownership.

### Beliefs (the content engine)

Strong distribution comes from a repeatable worldview, not a posting schedule. Every piece of content should explain or test one of the five beliefs listed in [`positioning.md`](positioning.md#beliefs-the-content-engine). Five is the cap; a new belief replaces one.

### The “missing middle” narrative

For education pages and social content (not the homepage hero), use this framing: developers want the control and cost predictability of a VPS but do not want to hand-assemble DNS, routing, secrets, builds, logs and rollbacks. EasyRunner is the missing middle between managed hosting and a self-built platform.

## Messaging framework

### Primary site message

The main site should speak first to users who already want to self-host.

Suggested strategic message:

> EasyRunner helps you deploy apps on your own VPS without the complexity, surprise bills, or platform lock-in of managed hosting.

### Messaging by audience

#### For VPS-decided users

Lead with:

- Speed to deployment.
- Simpler operations.
- Predictable pricing model.
- Infrastructure ownership.
- Reduced lock-in.

This audience wants confirmation that EasyRunner makes the path they have already chosen easier and safer.

#### For VPS-undecided users

Lead with:

- Decision support.
- Honest trade-offs.
- When self-hosting is a fit and when it is not.
- Cost and complexity comparison.
- Qualification rather than hard selling.

This audience should be routed to guides, comparisons, and educational pages rather than the default product CTA.

#### For Vercel / Next.js / v0 users

Lead with:

- Cost predictability.
- Control over infrastructure.
- A credible path away from a managed platform when the app has outgrown it.
- Respect for why they chose [Vercel](https://vercel.com/) in the first place, especially its workflow and developer experience.

The tone should not be hostile or dismissive toward Vercel. It should acknowledge the strengths of Vercel while making the case for when self-hosting becomes the better fit.

#### For Lovable users

Lead with:

- Keeping the speed of rapid creation while gaining portability and ownership.
- A path from hosted convenience to infrastructure control.
- Reduced dependence on a closed hosted path.

## Recommended information architecture

The marketing site should move toward a clear separation between conversion pages and education pages.

### Core IA recommendation

- `/` should be the main conversion page for users already inclined toward self-hosting.
- `/is-self-hosting-right-for-you/` should be the main education and qualification page for uncertain users.
- `/from-vercel/` should be the ecosystem-specific page for [Vercel](https://vercel.com/) / Next.js / v0 users.
- `/from-lovable/` should be the ecosystem-specific page for [Lovable Cloud](https://lovable.dev/cloud) users.
- `/pricing/` should continue to foreground EasyRunner’s app-based pricing model and infrastructure ownership model.

### IA principle

The homepage should not try to be the full decision guide for every possible visitor. It should convert the most ready audience first, while offering obvious side routes for people who need either ecosystem-specific framing or help deciding whether self-hosting is right.

## Homepage

The homepage converts the VPS-decided segment first and offers side routes for the other segments. The hero copy shipped in July 2026 and lives in `material/overrides/home.html`; see `roadmap.md` → Phase 1 for what was decided and why.

## Content workstreams

Content planning is a combination of conversion content, ecosystem landing pages, and educational qualification content.

### Content goals

- Convert VPS-decided users who are actively seeking a simpler self-hosting path.
- Capture Vercel and Lovable-origin users with ecosystem-specific entry pages.
- Educate and qualify prospects who are still deciding whether self-hosting is a fit.
- Support IA changes by making each page serve a distinct job rather than mixing jobs.

### Content workstreams

#### 1. Conversion pages

Primary goal: convert ready buyers.

Recommended pages:

- Homepage.
- Pricing page refinement.
- Product “how it works” page.
- Lightweight “why EasyRunner” page if needed.

#### 2. Ecosystem landing pages

Primary goal: contextualize EasyRunner for source audiences.

Recommended pages:

- `/from-vercel/`
- `/from-lovable/`

Each page should:

- Acknowledge why the source platform is attractive.
- Explain when teams outgrow it or want something different.
- Reframe EasyRunner as a next step, not a generic replacement.
- Include practical migration-oriented proof and use cases.

#### 3. Educational and qualification content

Primary goal: help uncertain users decide if self-hosting is right.

Recommended pages or posts:

- “Is self-hosting right for your app?”
- “When to choose managed hosting vs your own VPS.”
- “What changes when you move from managed hosting to a VPS.”
- “When Vercel is great, and when it’s worth self-hosting instead.”
- “A founder’s guide to predictable hosting costs.”

This content should be balanced and credible. It should not read like disguised product hype. Its job is to help buyers reach a decision and then naturally route the best-fit ones toward EasyRunner.

#### 4. Agent-driven execution content

Primary goal: make the "AI-agent-native" positioning pillar credible by showing it, not just claiming it.

**Why.** The site claims "CLI-first, so Claude Code / Cursor can take a raw repo to a live app", but every instructional page is written as manual commands and the `easyrunner-skills` are not documented. The claim has no on-site proof for the audience it targets. (Logged in `decisions.md`, July 2026.)

Recommended pages or additions:

- An agent-driven variant of the primary quickstart (`user-docs/quickstart/first-app.md`) and the Next.js
  recipe (`user-docs/recipes/nextjs.md`) — the two most CTA-linked guides (homepage primary CTA and
  `/from-vercel/` primary CTA respectively). The existing tabbed-content pattern (`=== "..."`) already used
  on these pages is a natural fit for an added "Drive it with your AI agent" tab alongside the manual-CLI
  tabs.
- A dedicated page documenting the `easyrunner-skills` themselves — what they are, how to install/enable
  them for Claude Code/Cursor, and what each one (repo-prep, app-create, deploy, update) does — since none
  of that currently exists on the docs site despite being a proof point in `comparisons.md`.

This content should not read as hype-only description; it should be the same kind of concrete walkthrough
as the manual guides, just narrated as an agent transcript/prompt rather than a list of commands.


## How to use this document

1. Read [`distribution-strategy.md`](distribution-strategy.md) first. It states the binding constraint.
2. Read [`positioning.md`](positioning.md). It is the contract between these pages and the loop.
3. Pick work from [`roadmap.md`](roadmap.md); its status table says what is shipped, open or deferred.
4. If a page changes its job, update the signal-to-page map in `positioning.md` in the same change.
5. If a decision is made or reversed, add a dated line to [`decisions.md`](decisions.md) rather than
   annotating this file.

## Summary

One product, multiple entry points, with messaging shaped by readiness and source ecosystem rather
than a single generic homepage story. Each page does one job for one segment; the homepage converts
the most-ready segment and offers obvious side routes to the others.

That is a conversion strategy, and it is sound on its own terms. It is also downstream of a constraint
it cannot fix: almost nobody arrives, and those who do have little reason to trust us. See
[`distribution-strategy.md`](distribution-strategy.md).
