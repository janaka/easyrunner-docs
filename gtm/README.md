# EasyRunner go-to-market docs

Working documents for how EasyRunner is positioned, marketed, and distributed. None of these are
published by MkDocs; they live outside `docs/`. Layered by how often they change:

| File | What it is | Changes | Who reads it |
| --- | --- | --- | --- |
| [`positioning.md`](positioning.md) | **The contract.** Segments, enemy, beliefs, intents, objections, signal-to-page map, UTM scheme, activation event. | Rarely; via the procedure in `AUTHORING.md` | Humans writing pages and copy; the [Distribution agents](#glossary) (verbatim, as prompt context) |
| [`strategy.md`](strategy.md) | **The why.** Readiness × ecosystem model, guardrails, messaging by audience, IA principle, distribution as a system, personal brand. | Rarely | Humans and agents planning content |
| [`roadmap.md`](roadmap.md) | **The what and when.** Status table, phases, page-by-page work, Workstream D (building the [Distribution module](#glossary)), site mechanics, verification. | Often | Whoever is picking up work |
| [`decisions.md`](decisions.md) | **Dated log** of decisions made, reversed, or rejected. | Append-only | Anyone wondering "why is it like this?" |
| [`AUTHORING.md`](AUTHORING.md) | How to edit `positioning.md` without breaking the strategy or the [segment and intent enums](#glossary). | Rarely | Anyone editing `positioning.md` |

## Glossary

Terms used throughout these documents.

**Talon** — [janaka/talon](https://github.com/janaka/talon), Janaka's own AI-agent application. It
already has a **Coding** module. Distribution work is being added as a second module rather than a
new app, because Talon already has the agent runtime, persistence and a sandbox that can run agents
unattended, and because building software and distributing it are the same loop at different stages.

**Distribution module** — the new section of Talon that runs the distribution loop. Its agents
(signal collector, classifier, drafter, weekly report) read [`positioning.md`](positioning.md) as
prompt context. Scope and phasing are in [`roadmap.md`](roadmap.md) → Workstream D. Nothing is built
yet.

**Distribution loop** — the cycle the module automates: collect public **signals** → classify them →
a human reviews and posts a reply → the reader lands on a marketing page → the outcome goes into
**experiment memory** → the next round targets better. Explained in [`strategy.md`](strategy.md) →
*Distribution as a system*.

**Signal** — one public post or thread (Reddit, Hacker News) where somebody describes a problem
EasyRunner addresses. Signals are classified by **segment** (who they are) and **intent** (how ready
they are), both defined in [`positioning.md`](positioning.md).

**Segment and intent enums** — the stable keys (`from-vercel`, `high-intent`, …) shared between
`positioning.md` and Talon's stored data. Renaming one breaks previously stored classifications, so
keys are added and retired, never renamed.

**Experiment memory** — the record of what was sent, to whom, on which angle, and what happened.
Replaces static lists of headline and CTA variants.

**Workstream D** — the section of [`roadmap.md`](roadmap.md) that plans the build, running in
parallel with the marketing-page phases.

## Reading order

1. `positioning.md`
2. `strategy.md`
3. `roadmap.md` → Status table

## Rules

- A decision goes in `decisions.md` with a date. Do not annotate `strategy.md` with "added <month>".
- A page that changes its job updates `positioning.md` in the same commit.
- Nothing in `positioning.md` without a live page or shipped feature behind it.
- Marketing pages themselves are markdown under [`docs/`](../docs/); see the repo `CLAUDE.md` for
  MkDocs authoring rules.
