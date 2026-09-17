# EasyRunner go-to-market docs

Working documents for how EasyRunner is positioned, marketed, and distributed. None of these are
published by MkDocs; they live outside `docs/`. Layered by how often they change:

| File | What it is | Changes | Who reads it |
| --- | --- | --- | --- |
| [`positioning.md`](positioning.md) | **The contract.** Segments, enemy, beliefs, intents, objections, signal-to-page map, UTM scheme, activation event. | Rarely; via the procedure in `AUTHORING.md` | Humans writing pages and copy; Talon Distribution agents (verbatim, as prompt context) |
| [`strategy.md`](strategy.md) | **The why.** Readiness × ecosystem model, guardrails, messaging by audience, IA principle, distribution as a system, personal brand. | Rarely | Humans and agents planning content |
| [`roadmap.md`](roadmap.md) | **The what and when.** Status table, phases, page-by-page work, Workstream D (the Talon Distribution module), site mechanics, verification. | Often | Whoever is picking up work |
| [`decisions.md`](decisions.md) | **Dated log** of decisions made, reversed, or rejected. | Append-only | Anyone wondering "why is it like this?" |
| [`AUTHORING.md`](AUTHORING.md) | How to edit `positioning.md` without breaking the strategy or the Talon enums. | Rarely | Anyone editing `positioning.md` |

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
