# Decisions log

Append-only. One dated entry per decision, reversal, or explicit rejection. Newest first.

## 2026-09-17 — Reorganise GTM docs into `gtm/`

- `STRATEGTY.md` → `gtm/strategy.md` (reasoning only), `IMPLEMENTATION-PLAN.md` → `gtm/roadmap.md`
  (status and work), `distribution/` → `gtm/`. Segments and beliefs now live only in `positioning.md`.
- Dropped from `strategy.md`: ICP matrix (duplicate), homepage message map (shipped), site messaging
  adjustment plan (shipped or in roadmap), numbered book citations (no reference list existed).
- Dropped from `roadmap.md`: the "strategy spine" (duplicate) and the note that it superseded the brief.
- Fixed `CLAUDE.md`, which included `@STRATEGY.md`, a file that never existed (typo for `STRATEGTY.md`).

## 2026-09-10 — Add the distribution loop (Workstream D)

- **Source:** a Perplexity thread on "marketing is dead, long live distribution" (crowd psychology in
  GTM; the Distribution Engineer framing).
- **Adopted:** distribution as an engineered loop (signal → classify → human-reviewed reply → page →
  experiment memory); intent classes and signal fields; "one source asset, many native pieces";
  personal brand as top of funnel with three pillars; relevant density over reach; success measured by
  deployments not impressions.
- **Built as:** a **Distribution** module in `janaka/talon` alongside the existing **Coding** module,
  reusing its agent runtime and the sandbox for unattended runs. Phase 1 is Reddit + HN only, humans
  post everything.
- **Rejected:** the thread's broader ICP ("TypeScript/Python/.NET services without Kubernetes") and its
  enemy ("Kubernetes for small apps"); Discord, referral credits, feature voting, badges, showcases
  (premature); paid-ads tooling, Figma automation, auto-posting (no paid channels, posting stays human).
- **Changed in the existing plan:** blog posts are now source assets only, written on observed signals;
  Phase 2 page ordering is provisional pending signal data; static headline/CTA test lists replaced by
  experiment-memory rows.
- Created `positioning.md` as the machine-readable contract and `AUTHORING.md` as its editing guide.

## 2026-09-06 — Add `/ai-agent-sandbox/` and make `/features/` a hub

- New landing page for the agent-sandbox use case (isolation, lifecycle, capability control,
  observability), with a design-partner invite. Not in the original plan; adds the `agent-sandbox`
  segment. Homepage hero extended with the sandbox pillar.

## 2026-07 — Phase 1 shipped; Download CTA demand test; agent-native gap logged

- Homepage hero rewritten ("Self-hosting, without the sysadmin homework"), three outcome-led pillars,
  dual CTA. `/from-vercel/` shipped. "Own your stack. No surprise bills." retired as a tagline.
- Download CTA demand test started: GA-tracked CTA plus `/download/` coming-soon page. The CTA click
  is the activation proxy until first deployments are observable.
- Gap logged: the "agent-native" claim has no on-site proof (no agent-driven tab on the quickstart or
  Next.js recipe, `easyrunner-skills` undocumented). Became Phase 3.

## 2026-07 — Strategy consolidated

- Sales-motion lens (*Why Killer Products Don't Sell*) and a painkiller/positioning session converged:
  segment by readiness × ecosystem; convert the convinced, educate the uncertain; Vercel/Next.js first,
  Lovable second, education third; pillars = ownership/predictable cost, secure-by-default,
  CLI/agent-native; guardrails against "cheaper Vercel", feature-list leads, and "all developers".
