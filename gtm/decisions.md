# Decisions log

Append-only. One dated entry per decision, reversal, or explicit rejection. Newest first.

## 2026-09-20 — Diagnosis corrected; strategy split into distribution and site layers

- **Tested the working diagnosis** ("our core problem is lack of a distribution channel; even search
  traffic is the wrong audience") against the live search landscape and the repo's own content.
- **Validated:** there is no channel, and search traffic is indeed the wrong audience. Three causes.
  (a) The category's search intent is cost reduction and the market's answer is free: every roundup for
  *self-hosted PaaS* and *Vercel alternative* leads with Coolify/Dokploy/CapRover/Dokku, quoting
  self-hosting at 10–20% of a Vercel bill. (b) Our own best-ranking content, the two Hetzner manual-setup
  guides, serves do-it-yourself readers who no longer need the product once they finish. (c) Those
  results are owned by vendors whose distribution *is* content production (Contabo, DigitalOcean,
  Qovery, Northflank, PandaStack, Temps, ServerCompass); EasyRunner appears in none of them.
- **Invalidated / reframed:** "lack of a channel" is the symptom, not the root. The root is selling a
  paid product into search demand motivated by price. A channel built for that demand still would not
  convert. Restated: **build a channel to risk-motivated buyers, not cost-motivated ones.**
- **Confound recorded:** 12 of 14 blog posts have no CTA, including both Hetzner guides and the VPS
  post, so wrong-audience traffic and right-audience-no-exit traffic are indistinguishable in GA4.
  The Download CTA review due August 2026 is still outstanding.
- **Noted, not decided:** the agent-sandbox market is dominated by commercial vendors (Modal,
  Northflank, Beam, Bunnyshell, Coder) rather than free tools, so buyers there expect to pay and are
  motivated by blast radius rather than cost. Structurally a better fit for a paid product. Blocked on
  the capability not being shipped, and on an isolation proof burden (that market's incumbents ship
  microVMs; plain containers are treated as trusted-code-only). Recommendation logged in
  `distribution-strategy.md` → *Open question*.
- **Structural change:** `gtm/strategy.md` → `gtm/site-strategy.md`, narrowed to the website only and
  made explicit that it assumes traffic and standing arrive from elsewhere. New
  `gtm/distribution-strategy.md` created as its parent, carrying the diagnosis, guiding policy, five
  ordered actions, the audience model, the priority order, and metrics with proof and standing layers.
  The distribution loop, personal brand and metrics sections moved up out of the site document.
- **Added, previously missing:** a proof plan (the source thread's "create proof before scaling reach",
  which was not carried over in the September merge), and metrics for proof and standing.

## 2026-09-17 — Reorganise GTM docs into `gtm/`

- `STRATEGTY.md` → `gtm/strategy.md` (reasoning only; renamed again on 2026-09-20), `IMPLEMENTATION-PLAN.md` → `gtm/roadmap.md`
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
