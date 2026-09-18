# EasyRunner go-to-market roadmap

> The **what and when**. Phases, status, page-by-page work, and the Distribution workstream. Changes
> often. The reasoning is in [`strategy.md`](strategy.md); the segments, enemy, beliefs and
> signal-to-page map are in [`positioning.md`](positioning.md); dated decisions are in
> [`decisions.md`](decisions.md). **Owner:** Janaka.

## Status

| Item | State | Notes |
| --- | --- | --- |
| 1.1 Homepage hero rewrite | ✅ shipped (July 2026) | Hero copy later extended with the AI Agent Sandbox pillar (Sept 2026) |
| 1.2 `/from-vercel/` | ✅ shipped (July 2026) | In nav as "From Vercel" |
| Download CTA demand test | 🔄 in flight | GA-tracked; activation proxy for Workstream D |
| `/ai-agent-sandbox/` | ✅ shipped (Sept 2026) | Not in the original plan; `agent-sandbox` segment |
| 2.1 `/from-lovable/` | ⬜ open | Ordering provisional, see Phase 2 note |
| 2.2 `/is-self-hosting-right-for-you/` | ⬜ open | Fallback today: "you probably just need a VPS" post |
| 2.3 "Switching" nav group | ⬜ open | Only "From Vercel" exists so far |
| 3.1–3.3 Agent-native proof | ⬜ open | No agent tab on quickstart/Next.js recipe; skills page missing |
| D.0 Positioning contract | ✅ done (Sept 2026) | `positioning.md` |
| D.1–D.5 [Distribution module](README.md#glossary) in Talon, phase 1 | ⬜ open | Reddit + HN only, humans post |

## Context (historical, July 2026)

The homepage hero at the time under-sold the product. Kept so the Phase 1 choices make sense:

- It **leads with the mechanism** — *"Self-managed single server app hosting"* — which, to a skimming
  visitor, reads as *more work* and *less scale* (two cons), not a benefit.
- It **names a persona with no payload** — *"SaaS Solopreneurs"* — narrowing the audience without
  adding a reason to care.
- It **hides its best line in metadata** — *"Own your stack. No surprise bills."* lives only in the
  page `<title>`/social card ([`docs/index.md`](../docs/index.md)), never on the page.
- It **buries the real painkillers** (secure-by-default, no lock-in, agent-native) in an
  below-the-fold list.
- It **names no villain**, so there is no pain for the cure to relieve.

The reasoning that fixed this is in [`strategy.md`](strategy.md).

## Rules this roadmap follows

Full reasoning in [`strategy.md`](strategy.md). The rules that shape sequencing:

- **Convert the convinced, educate the uncertain.** Priority: Vercel/Next.js, then Lovable, then education.
- **Ecosystem pages are beachheads.** Each names the incumbent's pain and dissolves the fear that kept people there, with stack-specific proof.
- **Guardrails:** no "cheaper/better Vercel", no feature-list lead, respect the incumbent, don't target "all developers".
- **Pages are endpoints of the distribution loop.** [`positioning.md`](positioning.md) is the contract; update its signal-to-page map in the same change as any page whose job changes. **Phase 2 ordering is provisional** and is re-ranked by what Workstream D observes.

## Assumptions (adjustable)

| Decision | Chosen default | Alternatives |
| --- | --- | --- |
| Sequencing | **Phased, beachhead first** (P1 → P2) | All pages at once |
| Homepage depth | **Hero copy + funnel wiring** (dual CTA + ecosystem links) | Hero copy only; or fuller redesign with fit-filter section |
| Nav placement | **Grouped under one "Switching" tab** | Three top-level tabs; or mostly out of nav |

## Site mechanics (confirmed)

- New marketing pages are **flat markdown files in `docs/`** added to `nav:` in
  [`mkdocs.yml`](../mkdocs.yml) (the `nav:` block). Rich layout works out of the box via grid cards
  (`attr_list` + `md_in_html`), admonitions, and `tables` — **no custom templates needed**.
- The homepage hero lives **only** in [`material/overrides/home.html`](../material/overrides/home.html):
  headline `#text01`, value-prop list `#text03`, and the CTA block below it.
  [`docs/index.md`](../docs/index.md) supplies only `title`/`description`/`social`.
- **No `mkdocs-redirects` plugin.** So we **only add** pages and edit the homepage **in place** — no
  renaming existing slugs (would break URLs). Add the plugin first if aliases are ever needed.
- CTA syntax (match existing): primary `[Label →](path){ .md-button .md-button--primary }`,
  secondary `[Label](path){ .md-button }`. Root pages use **root-relative** source paths (no `../`).
- Blog links from root pages resolve with source-relative paths, e.g.
  `blog/posts/self-hosting-nextjs-without-the-breakage.md`.

## Assets to reuse (don't write from scratch)

| Asset | Path / slug | Used by |
| --- | --- | --- |
| "Self-hosting Next.js shouldn't break on every deploy" | `docs/blog/posts/self-hosting-nextjs-without-the-breakage.md` → `/blog/2026/06/24/self-hosting-nextjs-without-the-breakage/` | `/from-vercel/` (counter-fear proof) |
| Next.js recipe (how-to) | `docs/user-docs/recipes/nextjs.md` → `/user-docs/recipes/nextjs/` | `/from-vercel/` CTA |
| "You probably just need a VPS" | `docs/blog/posts/you-probably-just-need-a-vps.md` → `/blog/2026/07/07/you-probably-just-need-a-vps/` | education page backbone |
| Comparisons (vs Dokku/Dokploy/Coolify; frames vs Vercel/Heroku/Railway) | `docs/comparisons.md` → `/comparisons/` | all pages (positioning, cost, licensing, security) |
| FAQ (Vercel/Railway pricing, migration, "when NOT to use") | `docs/faq.md` → `/faq/` | `/from-vercel/`, education page |
| OpenClaw end-to-end deploy walkthrough | `docs/blog/posts/deploying-openclaw-with-easyrunner.md` | `/from-lovable/` (proof) |
| Secure network architecture / hardening posts | `docs/blog/posts/easyrunner-secure-network-architecture.md`, `.../hardening-easyrunner-after-a-compromise.md` | security pillars |
| Deploy your first app (quickstart) | `docs/user-docs/quickstart/first-app.md` → `/user-docs/quickstart/first-app/` | primary CTA target |
| AI Agent Sandbox landing page | `docs/ai-agent-sandbox.md` → `/ai-agent-sandbox/` | `agent-sandbox` segment; Workstream D dogfooding story |
| Positioning contract (segments, enemy, beliefs, objections, signal→page map, UTM scheme) | [`positioning.md`](positioning.md) | every page, every [Distribution agent](README.md#glossary) |

---

## Phase 1 — Beachhead (shipped July 2026)

### 1.1 Homepage hero rewrite

**Files:** [`material/overrides/home.html`](../material/overrides/home.html) (`#text01`, `#text03`, CTA block) ·
[`docs/index.md`](../docs/index.md) (front matter).

**New hero copy:**

- **Headline** (`#text01`, retire *"Self-managed single server app hosting / SaaS Solopreneurs…"*):
  > **Self-hosting, without the sysadmin homework.**
- **Subhead:** EasyRunner turns any Ubuntu server into a hardened, HTTPS web host — and ships your app
  to it — from one CLI on your machine.
- **Replace the 5-item `#text03` list with 3 outcome-led pillars:**
  - **🛡️ Secure by default** — CIS L1 hardening, firewall, fail2ban, per-app isolation, encrypted
    secrets vault, optional WireGuard mesh. The week of security work, done for you.
  - **💸 Predictable cost, no lock-in** — pay per app on a buy-once perpetual license, bring any VPS.
    Your bill never spikes with traffic; nothing rug-pulls you.
  - **⌨️ Driven from your terminal — or your AI agent** — CLI-first, so Claude Code / Cursor can take a
    raw repo to a live app. No web control plane to run, patch, or breach.
- **CTAs:** primary **"Deploy your first app →"** (→ `/user-docs/quickstart/first-app/`); secondary
  **"Is self-hosting right for you?"** (→ `/is-self-hosting-right-for-you/`; until it exists in P2,
  point at the "you probably just need a VPS" post). Add a small ecosystem entry line:
  *"Coming from Vercel? →"* (→ `/from-vercel/`).
- **`docs/index.md` front matter:** update `title` / `description` / `social.cards_layout_options.title`
  to the new tagline (retire *"Own your stack. No surprise bills."*).
- **Keep:** the tech-logo grid, the demo GIF, the Substack embed.

### 1.2 `/from-vercel/` — Next.js × Vercel beachhead

**Files:** new `docs/from-vercel.md` · nav entry in `mkdocs.yml`.

- **Headline:** *Self-host Next.js. Keep the DX, lose the Vercel bill.*
- **Subhead:** Your Next.js app on a server you own — ISR, image optimization, streaming and graceful
  shutdown all working — hardened and live in minutes, from one CLI.
- **Section outline:**
  1. **The pull** — Vercel is the easiest way to deploy Next.js, until the bill scales faster than
     revenue (mine `faq.md` "compare to Vercel pricing").
  2. **Dissolve the counter-fear** — "but self-hosting Next.js is a nightmare": link
     `self-hosting-nextjs-without-the-breakage` + the Next.js recipe; short "what breaks / what
     EasyRunner does" table.
  3. **Proof / positioning** — cost predictability, no lock-in, secure-by-default (reuse
     `comparisons.md` licensing + security sections).
  4. **Honest fit** — when to stay on Vercel (respect-the-incumbent tone; from FAQ "when NOT to use").
  5. **Dual CTA** — primary **"Deploy a Next.js app →"** (→ `/user-docs/recipes/nextjs/`); secondary
     **"Still deciding? Is self-hosting right for you?"** (→ education page / VPS post).

---

## Phase 2 — Expand

> Ordering below (Lovable, then education) is the strategy's guess. Once Workstream D has two to
> four weeks of classified signals, re-rank by observed segment volume: if most high-intent signals
> are `undecided`, 2.2 moves ahead of 2.1.

### 2.1 `/from-lovable/` — graduate the prototype

**Files:** new `docs/from-lovable.md` · nav entry.

- **Headline:** *Built it on Lovable? Give it a real home you own.*
- **Angle:** AI builders get you to a prototype fast, then you hit the ceiling (cost, no backend
  control, app trapped on someone's platform). **Your AI coding agent does the migration** —
  containerize, configure, deploy end-to-end — so you don't become a sysadmin. Own it outright;
  production-grade (CIS L1, HTTPS, secrets, isolation) from day one.
- **Reuse:** OpenClaw deploy walkthrough (end-to-end proof), agent-skills story from `comparisons.md`,
  security pillars. Soften "VPS" to "a server you own" for this less-infra-native audience.

### 2.2 `/is-self-hosting-right-for-you/` — education / qualification

**Files:** new `docs/is-self-hosting-right-for-you.md` · nav entry.

- **Job:** help the uncertain decide — balanced and credible, **not** disguised hype.
- **Backbone:** the "you probably just need a VPS" post + FAQ "When should I NOT use EasyRunner?".
- **Shape:** honest *"choose managed hosting when… / choose your own VPS when…"*, a cost/complexity
  comparison, then route best-fit readers onward to `/from-vercel/` or the quickstart.

### 2.3 Navigation / IA

**File:** `mkdocs.yml` `nav:` block.

- Add a grouped parent tab (e.g. **"Switching"**) containing **From Vercel**, **From Lovable**, and
  **Is self-hosting right for you?** — keeps the top tab bar lean while staying discoverable. Leave
  Comparison / FAQ / Pricing where they are.

---

## Phase 3 — Prove the agent-native claim

**Gap** (see `strategy.md` → Content workstreams → 4): every instructional page on the site — the quickstart, the Next.js recipe, the CLI reference —
is written exclusively as manual commands for a human to type. This undercuts the "CLI-first, so Claude
Code / Cursor can take a raw repo to a live app" pillar now live on the homepage hero and the
"agent-native by construction" claim in `comparisons.md`: the claim currently has no on-site proof.

### 3.1 Agent-driven tab on the primary quickstart

**Files:** `docs/user-docs/quickstart/first-app.md` (the homepage's primary CTA target).

Add a "Drive it with your AI agent" tab alongside the existing manual-CLI steps, reusing the
tabbed-content pattern already on this page (`=== "..."`, `pymdownx.tabbed`). Show the actual prompt a
user would give Claude Code/Cursor and what the agent does with the relevant `easyrunner-skills`, not
just a restatement of the same CLI commands.

### 3.2 Agent-driven tab on the Next.js recipe

**Files:** `docs/user-docs/recipes/nextjs.md` (the `/from-vercel/` page's primary CTA target).

Same treatment — this is the second-most CTA-linked guide.

### 3.3 Document the `easyrunner-skills`

**Files:** new page, e.g. `docs/user-docs/reference/agent-skills.md`, added to nav under Reference.

Nothing on the docs site currently explains what the `easyrunner-skills` (repo-prep, app-create, deploy,
update) are, how to install/enable them for Claude Code/Cursor, or what each one does — despite
`comparisons.md` citing them as EasyRunner's proof point for being "agent-native by construction." This
page is the missing backing for that claim.

---

## Workstream D — Distribution loop (parallel to Phases 2–3)

**Why:** `strategy.md` → *Distribution as a system*; origin and rejected ideas in `decisions.md`. **Where it's built:** not in this repo. The code is a **Distribution** module in
[janaka/talon](https://github.com/janaka/talon) (Janaka's AI-agent app — see the
[glossary](README.md#glossary)), alongside its existing **Coding** module, reusing the agent runtime,
persistence and the sandbox for unattended scheduled runs. (Talon internals were not
inspected when this was written; map the names below onto whatever exists.)

**Phase-1 rule:** automate research and preparation only. A human reads, edits and posts every public
word. No auto-posting, no X/LinkedIn APIs, no ad tooling.

### D.0 Positioning contract (do first)

**File:** [`positioning.md`](positioning.md) — done. Keep it in this repo,
next to the pages it governs, and feed it to every agent below as context. Segment and intent enums in
Talon must match its tables.

### D.1 Signal collector

- Sources: **Reddit** (public JSON endpoints) and **Hacker News** (Algolia API). Nothing else yet.
- 10–15 saved queries seeded from the positioning file and the FAQ: "Vercel alternative", "self-host
  Next.js", "VPS deployment", "Railway pricing", "Lovable export", "Coolify vs", etc.
- Scheduled run in the Talon sandbox. Target **20–50 signals/week**; dedupe by thread URL.

### D.2 Classifier agent

Input: one thread + `positioning.md`. Output (stored on the Signal):

```text
detected_problem · intent (learning|switching-pain|high-intent|evaluation|comparison|builder-signal)
segment (from-vercel|from-lovable|undecided|vps-decided|agent-sandbox|not-a-fit)
current_provider · stack · fit_score · routed_page · recommended_action
```

Drop `not-a-fit` and below-threshold scores before they reach the queue.

### D.3 Review queue + drafting

- One list in the Talon UI: signal, classification, drafted reply.
- The draft is platform-native, helpful first, links to **one** page from the signal→page map with the
  UTM scheme from `positioning.md`, and discloses affiliation.
- Actions: **approve**, **edit**, **reject with reason**. Rejection reasons are the training data for
  the classifier and drafting prompts.

### D.4 Experiment memory

Four entities, one table each: **Signal**, **Classification**, **Response** (the experiment), **Outcome**.
A Response row records: signal, segment, message angle, page linked, UTM content id, date posted.
Outcome fields are filled later: replies, tagged page visits (GA4), Download CTA clicks. Rejections
are stored too. Headline/CTA variants for the site are rows here, not a list in the strategy doc.

### D.5 Weekly report

One scheduled agent run producing: signals by segment and intent, replies posted, tagged visits, CTA
clicks, most common objection, one recommendation. It is also the Monday raw material for the
personal-brand posts (see `strategy.md` → *Personal brand as top of funnel*).

### D.6 Personal brand cadence (manual, fed by D.3/D.5)

Two LinkedIn posts + three to five X posts per week, one source asset every one to two weeks, drawn
only from queue signals or the build log. The build of Workstream D itself is pillar 3 and the
proof point for `/ai-agent-sandbox/`.

### Success criteria (review after four weeks)

- Classifier segment agrees with the human on most queued signals.
- A handful of human-approved replies posted per week.
- At least one reply produced a tagged page visit **and** a Download CTA click.
- The weekly report surfaced at least one objection not already in `positioning.md`.

If none of this happens, the fault is positioning or sources, not automation. Fix that before adding
channels.

### Deferred (Phase 2 of D)

- X search and GitHub issues as sources (X API cost is unjustified until Reddit proves the loop).
- Content-adapter agent: one source asset → X thread, LinkedIn post, docs improvement.
- Experiment-analyst agent ("which angle produced CTA clicks from Vercel users?").
- Product-led loops: starter templates, a "deployed with EasyRunner" page, a showcase. Need users first.
- Any auto-posting.

---

## Cross-cutting conventions

- Match existing **CTA syntax** and **root-relative** link paths (see Site mechanics).
- Use **grid cards / admonitions / tables** per `features.md`, `pricing.md`, `comparisons.md`.
- **No renames** — add pages + edit `home.html`/`index.md` in place only.
- Keep the tone **honest and respectful of incumbents** throughout (a guardrail from the strategy).

## Verification

1. **`.venv/bin/mkdocs build --strict`** must pass after every change — it catches broken internal
   links and nav errors (this is the primary gate).
2. **`.venv/bin/mkdocs serve`** and eyeball:
   - Homepage renders the new headline, subhead, 3 pillars, and both CTAs; ecosystem link works.
   - New slugs resolve: `/from-vercel/`, `/from-lovable/`, `/is-self-hosting-right-for-you/`.
   - Grid cards / tables render; the "Switching" nav group appears.
   - **Light *and* dark mode** both look right (the hero has scheme-specific CSS).
3. Confirm the **social card** regenerates with the new title (the `social` plugin).
4. **Click every CTA and cross-link** manually.

## Out of scope (for now)

- `mkdocs-redirects` / URL aliases (e.g. `/vercel-alternative/`).
- Paid-ad landing pages and the remaining 2×2 quadrants beyond Vercel/Lovable.
- Discord, referral credits, feature voting, badges, auto-posting, ad/Figma automation (rejected; see
  `decisions.md`, Sept 2026).
- Speculative long-form blog content. Blog posts are now written only as **source assets** for
  Workstream D: one every one to two weeks, on a problem observed in the signal queue, never on an
  imagined topic. Existing posts are still reused as proof on the funnel pages.
- A full homepage visual redesign (fit-filter section is optional under "fuller redesign").
