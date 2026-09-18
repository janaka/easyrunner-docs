# How to maintain `positioning.md`

> Read this before editing [`positioning.md`](positioning.md). It records the rules used to write the
> file on 2026-09-10 so later edits (a new feature, a new segment, a changed page) stay consistent.
> A future agent asked to "update positioning for feature X" should follow the procedure at the end.

## What the file is for

`positioning.md` is the **contract** between the marketing pages in this repo and the Distribution
module of [Talon](README.md#glossary) — the automation code in Janaka's AI-agent app that will run the
distribution loop (see the glossary). It has two readers with different needs:

- **Humans** editing pages and writing content. They need the one-line positioning, the enemy,
  beliefs, and vocabulary.
- **Agents** (classifier, drafter, weekly report) that receive the whole file as context. They need
  stable enum keys, the intent table, the signal-to-page map, objections, and the UTM scheme.

Because agents consume it verbatim, keep it short and tabular. Prose belongs in `strategy.md`.

## Sources of truth, in precedence order

1. **Shipped features and live pages.** Run `.venv/bin/mkdocs build --strict` and look at `docs/`.
   A claim without a live page or shipped feature behind it does not go in.
2. [`strategy.md`](strategy.md) for segments, priority order, guardrails, beliefs.
3. [`roadmap.md`](roadmap.md) for which pages exist, are planned, or are
   fallbacks, and for the Workstream D data model the enums must match.
4. `docs/faq.md` and `docs/comparisons.md` for objections and honest "not a fit" answers.
5. The auto-memory notes for this project (licensing pairing rule, audience vocabulary rules,
   Download CTA as activation proxy).

The Perplexity "distribution" thread (see `decisions.md`, 2026-09-10) contributed only the *shape* of the intent table and the
signal fields. It contributed no positioning; its ICP and enemy were rejected.

## Rules that shaped every section

**One-line positioning**
- Outcome-led, names the pain it removes, no feature list.
- Change it only if the core promise changes. A new feature almost never changes it.
- Keep the *retired taglines* list so old lines do not resurface in drafts.

**Enemy**
- Always a way of working, never a named vendor. "Bills that scale faster than revenue", not "Vercel".
- Pair it with the respect-the-incumbent line. Never "cheaper X" or "better X".

**Beliefs**
- Exactly the list in `strategy.md` → *Beliefs*. Edit both places together. Five is the cap; a new
  belief must replace one, not extend the list.

**Segments table**
- A segment exists only if it has a distinct *who*, *trigger*, *fear*, and *landing page*.
- Every segment has a landing page. If the page is not live, name a fallback that is.
- Keys are enums (`from-vercel`, `agent-sandbox`, …) consumed by [Talon](README.md#glossary). **Never rename a key**; add a
  new one and retire the old one in a comment, otherwise stored classifications break.
- Always keep `not-a-fit` with "Do not respond". The honest exclusion is part of the positioning.
- State the priority order under the table. Volume segments and invite-only segments are labelled.

**Intent classes**
- Each class has an example phrasing and an *action*. If you cannot say what the drafter should do
  differently, it is not a separate class.
- `learning` intent links a guide only when the guide answers the question. No funnel push.

**Switching triggers**
- Observable events, not attitudes. "Hit the function timeout" yes; "wants control" no.

**Objections**
- Each objection gets the honest answer, including "then stay where you are" where true.
- Closed-source + paid is always answered together with no lock-in and no feature gates.

**Signal-to-page map**
- Every segment and intent combination resolves to exactly one page, or explicitly to "no reply".
- Fallbacks in the segments table must be reflected here.
- The UTM scheme is fixed: source, medium, campaign = segment key, content = response id.

**Vocabulary**
- "A server you own" for Lovable-origin readers, "VPS" for Vercel-origin readers.
- No "sysadmin", "DevOps", "SRE" in headlines. Allowed in body copy as the villain.
- Every public reply discloses affiliation.

## Procedure: adding or changing a feature

Do not add a "features" section. A feature enters the file only through the questions below.

1. **Is it shipped, with a live page?** If not, stop, or add it only as a fallback-less planned
   segment clearly marked as such. (For sandboxes the page is `/ai-agent-sandbox/` and the segment
   `agent-sandbox` already exists.)
2. **Does it create a new segment?** Only if a different *who* arrives with a different *trigger*
   and *fear* and should land on a different page. Add a row, a key, a priority-order note.
3. **Does it add intent phrasings?** Add example phrasings to existing classes first. Add a class
   only if the drafter's action differs.
4. **Does it add a switching trigger?** Add the observable event.
5. **Does it add or change an objection?** Add the honest answer, sourced from FAQ or comparisons.
6. **Does it change the enemy or a belief?** Rarely. If so, edit `strategy.md` in the same change.
7. **Update the signal-to-page map** so the new segment or intent resolves to one page.
8. **Update the one-liner** only if the core promise moved. Log the old line under retired taglines.
9. **Mirror in the plan.** Add the page to the reuse table in `roadmap.md` if it is
   new; note any new enum key in Workstream D.
10. **Verify.** `.venv/bin/mkdocs build --strict` passes; every page path in the file resolves;
    enum keys are unchanged; the file is still short enough to paste into a prompt.

## Procedure: a page changes its job

Update the segments table, the signal-to-page map, and the fallback in the same commit as the page
change. `strategy.md` → *Instructions for the next agent*, item 7, makes this mandatory.
