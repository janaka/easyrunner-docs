# EasyRunner go-to-market strategy

## Purpose

The durable reasoning behind how EasyRunner is marketed: who we target, why the site is split the way it is, and how distribution is run. It changes rarely. What it does **not** hold:

- The concrete segments, enemy, beliefs, objections and signal-to-page map. Those live in [`positioning.md`](positioning.md), the single source of truth that both humans and the [Distribution agents](README.md#glossary) read.
- Phases, status and page-by-page work. Those live in [`roadmap.md`](roadmap.md).
- Dated decisions and what was rejected. Those live in [`decisions.md`](decisions.md).

Two strands produced this document: a sales-motion lens from *Why Killer Products Don't Sell* (readiness segmentation), and a distribution-engineering lens (treat distribution as a system, Sept 2026). They converged on the same conclusion: **convert the convinced, educate the uncertain, and engineer the loop that brings the right people to the right page.**

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

## Segmentation model

### Axis 1: buyer readiness

There are two primary readiness segments:

1. **Already decided on VPS self-hosting.** These users already believe self-hosting is the right path. They are not looking for philosophical persuasion; they want a simpler way to execute on a decision they have already made. For this segment, the right motion is low-friction, product-led, and direct.
2. **Still deciding whether self-hosting is right.** These users are comparing managed platforms with self-hosting and need help understanding trade-offs. For this segment, the right motion is education-first, trust-building, and qualification-oriented.

This readiness split is more important than any single technical niche because it determines the sales and messaging motion.

### Axis 2: source ecosystem

Within those readiness segments, there are two promising ecosystem-specific niches:

- **[Lovable Cloud](https://lovable.dev/cloud) users.** These users may have started with Lovable for speed and convenience, but some will later want portability, control, or infrastructure ownership.
- **[Vercel](https://vercel.com/) / Next.js / v0 users.** These users are likely to care about excellent developer experience, but some will seek alternatives when cost predictability, infrastructure control, or platform fit becomes more important.

The ecosystem dimension overlays the readiness dimension. In practice, this creates a 2 x 2 matrix: buyers can come from Lovable or Vercel, and they can be either already decided on self-hosting or still evaluating it.

## Segments

The concrete segment table (who, trigger, fear, landing page, priority) is in [`positioning.md`](positioning.md#segments) and is not duplicated here. Add or change a segment there, following [`AUTHORING.md`](AUTHORING.md).

## Priority order

The highest-priority ICP should be Vercel or Next.js-oriented builders who have already decided that self-hosting is worth it. This audience is closest to conversion because the decision about hosting philosophy is already made, and EasyRunner can position itself as the simpler execution path.

The second-priority ICP should be Lovable users who are moving from fast prototyping into longer-term ownership and deployment needs. The third-priority audience is uncertain buyers in either ecosystem; these users are still valuable, but they should enter through educational content rather than the default conversion path.

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

## Distribution as a system

### The loop

The pages above are destinations. They only convert if the right people arrive. Distribution is therefore treated as an engineered loop, not a set of campaigns:

```text
Public signals (Reddit, HN; later X, GitHub)
    ↓ collect
Classify: problem, intent, segment, fit
    ↓
Human review queue → helpful reply or content idea
    ↓
Landing page / guide (UTM-tagged)
    ↓
Download CTA click → first deployment
    ↓
Experiment memory → better targeting and messages
```

The loop is built as a **Distribution** module in [Talon](README.md#glossary), Janaka's own AI-agent app, alongside its existing Coding module. Talon already has the agent runtime, persistence and a sandbox for unattended runs, and building software and distributing it are the same loop at different stages. Scope, data model and phasing are in [`roadmap.md`](roadmap.md) → Workstream D. What was adopted and rejected from the source discussion is in [`decisions.md`](decisions.md).

### Operating rules

- **Humans post; agents prepare.** Automation reduces research and drafting work. It does not publish public words until the loop has proven itself.
- **Relevant density over reach.** Ten conversations with people actively leaving Vercel beat a viral post read by nobody who will deploy.
- **Content is problem-led, not topic-led.** Blog posts and social posts come from observed signals in the queue or from the build log, never from an imagined editorial calendar.
- **One source asset, many native pieces.** A guide, demo or build decision becomes an X thread, a LinkedIn post, a docs improvement and a call for testers. X and LinkedIn get different entry points, not copies.
- **No fake crowd.** No manufactured urgency, testimonials or momentum. Technical audiences detect it.
- **Every link carries a UTM** and every public reply discloses affiliation.

### Personal brand as top of funnel

The founder’s X and LinkedIn presence explores the problem space; EasyRunner is the concrete proof. Three recurring pillars, all derived from queue signals or build-log entries:

1. Practical infrastructure for the missing middle (VPS vs managed, what a good deployment abstraction exposes, self-hosting without ideology).
2. Building EasyRunner in public (decisions, failures, what users find confusing, features deliberately not built).
3. Building the distribution engine itself (how switching intent is classified, why followers are a weak metric, what the experiment memory reveals). This is dogfooding, and it is a real use case for the AI Agent Sandbox story: the sandbox is what runs these agents unattended.

Cadence: two LinkedIn posts and three to five X posts per week, plus one source asset every one to two weeks.

### Metrics

Track weekly, in this order of importance: first deployments (proxy: Download CTA clicks), docs and landing page visits from tagged links, quality replies and direct conversations, then impressions. The activation event is defined in [`positioning.md`](positioning.md#activation-event). Headline and CTA variants are rows in the experiment memory, not a list here.



## How to use these documents

1. Read [`positioning.md`](positioning.md) first. It is the contract between the pages and the distribution loop.
2. Pick work from [`roadmap.md`](roadmap.md). Its status table says what is shipped, open, or deferred.
3. Keep all writing aligned to the central rule: convert the convinced, educate the uncertain.
4. If a page changes its job, update the signal-to-page map in `positioning.md` in the same change.
5. If a decision is made or reversed, add a dated line to [`decisions.md`](decisions.md) rather than annotating this file.

## Final strategic summary

EasyRunner should not market itself as a broad self-hosting tool for everyone. It should market itself first to builders who already want VPS ownership and need a simpler execution path. Around that core, the site should create dedicated messaging for Vercel and Lovable-origin users and add educational content for people still deciding whether self-hosting is a fit.

The key strategic principle is simple: one product, multiple entry points, with messaging shaped by readiness and source ecosystem rather than a single generic homepage story.