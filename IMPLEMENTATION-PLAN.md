# EasyRunner Marketing Site — Implementation Plan

> **Status:** ready to execute · **Owner:** Janaka · **Scope:** marketing/funnel pages + homepage hero
> This document consolidates the strategy in [`STRATEGTY.md`](STRATEGTY.md) with the positioning
> work from the value-prop session, and turns it into an executable plan. It supersedes
> `STRATEGTY.md` as the working reference; the older brief is kept for provenance.

## Context

The current homepage hero under-sells the product:

- It **leads with the mechanism** — *"Self-managed single server app hosting"* — which, to a skimming
  visitor, reads as *more work* and *less scale* (two cons), not a benefit.
- It **names a persona with no payload** — *"SaaS Solopreneurs"* — narrowing the audience without
  adding a reason to care.
- It **hides its best line in metadata** — *"Own your stack. No surprise bills."* lives only in the
  page `<title>`/social card ([`docs/index.md`](docs/index.md)), never on the page.
- It **buries the real painkillers** (secure-by-default, no lock-in, agent-native) in an
  below-the-fold list.
- It **names no villain**, so there is no pain for the cure to relieve.

Two independent strands of strategy work — a sales-book lens (*Why Killer Products Don't Sell*,
captured in `STRATEGTY.md`) and a painkiller/positioning first-principles session — converged on the
**same conclusion**, which is the backbone of this plan.

## Strategy spine (the consolidated conclusion)

1. **Segment by buyer readiness × source ecosystem.** Readiness: *already decided to self-host* vs
   *still deciding*. Ecosystem: *Vercel/Next.js/v0* and *Lovable/v0/Bolt*.
2. **Convert the convinced, educate the uncertain.** The homepage targets the decided self-hoster;
   uncertain visitors get a dedicated education/qualification page, not a hard sell.
3. **Ecosystem pages are beachheads.** Each names the incumbent's pain (the *pull*) **and** dissolves
   the fear that kept them there (the *counter-fear*) using stack-specific proof.
4. **Priority order:** Vercel/Next.js **#1**, Lovable **#2**, education **#3**.
5. **Positioning pillars:** ownership + predictable cost / no lock-in · **secure-by-default** ·
   **CLI / AI-agent-native**. (The last two are additions the book-brief lacked; agent-native is
   EasyRunner's most *ownable* claim per [`comparisons.md`](docs/comparisons.md).)
6. **Guardrails:** no generic *"cheaper/better Vercel"*, no feature-list lead, respect the incumbent
   (acknowledge why people chose it), don't over-target *"all developers"*.
7. **Retire "own your stack"** as the literal tagline; keep ownership as a *concept*.

## Assumptions (adjustable — override any before we start)

| Decision | Chosen default | Alternatives |
| --- | --- | --- |
| Root deliverable | **This combined doc**; `STRATEGTY.md` left intact, superseded | Merge into `STRATEGTY.md`; or two separate docs |
| Sequencing | **Phased, beachhead first** (P1 → P2) | All pages at once |
| Homepage depth | **Hero copy + funnel wiring** (dual CTA + ecosystem links) | Hero copy only; or fuller redesign with fit-filter section |
| Nav placement | **Grouped under one "Switching" tab** | Three top-level tabs; or mostly out of nav |

## Site mechanics (confirmed)

- New marketing pages are **flat markdown files in `docs/`** added to `nav:` in
  [`mkdocs.yml`](mkdocs.yml) (lines 95–144). Rich layout works out of the box via grid cards
  (`attr_list` + `md_in_html`), admonitions, and `tables` — **no custom templates needed**.
- The homepage hero lives **only** in [`material/overrides/home.html`](material/overrides/home.html):
  headline `#text01` (lines 386–389), value-prop list `#text03` (lines 490–501), CTA (lines 503–504).
  [`docs/index.md`](docs/index.md) supplies only `title`/`description`/`social`.
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

---

## Phase 1 — Beachhead (highest value)

### 1.1 Homepage hero rewrite

**Files:** [`material/overrides/home.html`](material/overrides/home.html) (`#text01` 386–389, `#text03`
490–501, CTA 503–504) · [`docs/index.md`](docs/index.md) (front matter).

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

**File:** `mkdocs.yml` `nav:` block (lines 95–144).

- Add a grouped parent tab (e.g. **"Switching"**) containing **From Vercel**, **From Lovable**, and
  **Is self-hosting right for you?** — keeps the top tab bar lean while staying discoverable. Leave
  Comparison / FAQ / Pricing where they are.

---

## Phase 3 — Prove the agent-native claim

**Gap identified during Phase 1 QA** (see `STRATEGTY.md` → Content workstreams → 4. Agent-driven execution
content): every instructional page on the site — the quickstart, the Next.js recipe, the CLI reference —
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
- New long-form blog content (this plan **reuses** existing posts).
- A full homepage visual redesign (fit-filter section is optional under "fuller redesign").
