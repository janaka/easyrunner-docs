# EasyRunner go-to-market docs

Working documents for how EasyRunner is positioned, marketed, and distributed. None of these are
published by MkDocs; they live outside `docs/`. Layered by how often they change:

| File | What it is | Changes | Who reads it |
| --- | --- | --- | --- |
| [`positioning.md`](positioning.md) | **The contract.** Segments, enemy, beliefs, intents, objections, signal-to-page map, UTM scheme, activation event. | Rarely; via the procedure in `AUTHORING.md` | Humans writing pages and copy; the [Distribution agents](#glossary) (verbatim, as prompt context) |
| [`distribution-strategy.md`](distribution-strategy.md) | **The binding constraint.** Why nobody arrives and why they have no reason to trust us; the guiding policy and the ordered actions that answer it. Parent of the site strategy. | Rarely | Read this first |
| [`site-strategy.md`](site-strategy.md) | **The website only.** What a visitor who already arrived is shown: IA, messaging by audience, homepage job, page-level content plan. | Rarely | Humans and agents planning pages and copy |
| [`roadmap.md`](roadmap.md) | **The what and when.** Status table, phases, page-by-page work, Workstream D (building the [Distribution module](#glossary)), site mechanics, verification. | Often | Whoever is picking up work |
| [`decisions.md`](decisions.md) | **Dated log** of decisions made, reversed, or rejected. | Append-only | Anyone wondering "why is it like this?" |
| [`AUTHORING.md`](AUTHORING.md) | How to edit `positioning.md` without breaking the strategy or the [segment and intent enums](#glossary). | Rarely | Anyone editing `positioning.md` |

## Glossary

Terms used throughout these documents.

**Talon** — [janaka/talon](https://github.com/janaka/talon), Janaka's own AI-agent application. It
already has a **Coding** module. Distribution work is being added as a second module rather than a
new app, because Talon already has the agent runtime, persistence and a sandbox that can run agents
unattended, and because building software and distributing it are the same loop at different stages.

**Distribution module** — **software**: the automation, written inside the Talon codebase, that runs
the distribution loop. Concretely it is agents (signal collector, classifier, drafter, weekly report),
their scheduled runs, and their stored data, sitting alongside Talon's Coding module. It is not part
of this repo. The only link between the two is that its agents read
[`positioning.md`](positioning.md) as prompt context, which is why that file is written for machines
as well as people. Nothing is built yet; scope and phasing are in [`roadmap.md`](roadmap.md) →
Workstream D.

**Distribution loop** — the cycle the module automates: collect public **signals** → classify them →
a human reviews and posts a reply → the reader lands on a marketing page → the outcome goes into
**experiment memory** → the next round targets better. It is one of five actions in
[`distribution-strategy.md`](distribution-strategy.md), and the only one that works before we have an
audience of our own.

**Signal** — one public post or thread (Reddit, Hacker News) where somebody describes a problem
EasyRunner addresses. Signals are classified by **segment** (who they are) and **intent** (how ready
they are), both defined in [`positioning.md`](positioning.md).

**Segment and intent enums** — the stable keys (`from-vercel`, `high-intent`, …) shared between
`positioning.md` and Talon's stored data. Renaming one breaks previously stored classifications, so
keys are added and retired, never renamed.

**Experiment memory** — the record of what was sent, to whom, on which angle, and what happened.
Replaces static lists of headline and CTA variants.

**Workstream D** — **a plan, not code**: the section of [`roadmap.md`](roadmap.md) specifying what to
build in the Distribution module, running in parallel with the marketing-page phases.

## Reading order

1. `distribution-strategy.md` → Diagnosis. It states the binding constraint everything else serves.
2. `positioning.md` → the contract between the pages, the replies and the agents.
3. `site-strategy.md` → only if you are working on the website.
4. `roadmap.md` → Status table.

## Rules

- A decision goes in `decisions.md` with a date. Do not annotate the strategy files with "added <month>".
- Distribution strategy is the parent; site strategy is its child. A claim about audience, channel, trust
  or proof belongs in the parent, never in the site document.
- A page that changes its job updates `positioning.md` in the same commit.
- Nothing in `positioning.md` without a live page or shipped feature behind it.
- Marketing pages themselves are markdown under [`docs/`](../docs/); see the repo `CLAUDE.md` for
  MkDocs authoring rules.
