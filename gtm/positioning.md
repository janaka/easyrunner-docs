# EasyRunner positioning (machine-readable)

> **Purpose:** the single source of truth for who we target, what we say, and where each kind of
> prospect should land. Humans edit this file. The **Distribution** module — the automation code in
> [Talon](README.md#glossary) — reads it as context for its classifier and drafting agents. Keep it short, concrete, and in sync with
> [`strategy.md`](strategy.md) and [`roadmap.md`](roadmap.md).
>
> **Rule:** if a claim here is not backed by a live page or a shipped feature, remove it.
> **Editing:** follow [`AUTHORING.md`](AUTHORING.md) before changing anything here.

## One-line positioning

EasyRunner turns a VPS you own into a hardened, HTTPS web host and ships your app to it from one
CLI, so builders get the control and predictable cost of self-hosting without assembling DNS,
routing, secrets, builds, logs, and rollbacks by hand.

Retired taglines (do not reuse): "Own your stack. No surprise bills." · "Self-managed single server
app hosting" · "SaaS Solopreneurs".

## The enemy (a way of working, never a vendor)

- Managed-hosting bills that scale faster than revenue.
- Convenience that quietly becomes lock-in.
- "Sysadmin homework": the week of hardening, TLS, firewall, secrets and reverse-proxy work that
  stands between a VPS and a safe production app.
- Hand-assembled deployment scripts nobody can explain at 2 a.m.

We respect Vercel, Lovable and similar platforms. We never say "cheaper Vercel" or "better Vercel".

## Beliefs (the content engine)

1. Self-hosting should be practical, not ideological.
2. Small apps should not need a platform team, or Kubernetes.
3. Secure-by-default is table stakes, not a premium tier.
4. You should be able to understand, roll back, and move your deployment without a support ticket.
5. A deployment tool should be drivable by an AI agent as easily as by a human at a terminal.

## Segments

| Key | Who | Trigger | Fear to dissolve | Landing page |
| --- | --- | --- | --- | --- |
| `from-vercel` | Next.js / Vercel / v0 builders who have decided to self-host | Bill or platform fit | "Self-hosting Next.js breaks ISR, images, streaming" | `/from-vercel/` |
| `from-lovable` | Lovable / v0 / Bolt builders hitting the ceiling of a hosted prototype | Cost, no backend control, app trapped | "I'm not an infra person" | `/from-lovable/` (until live: `/ai-agent-sandbox/` or quickstart) |
| `undecided` | Still comparing managed hosting vs a VPS | Comparing options | "I'll make the wrong infra choice" | `/is-self-hosting-right-for-you/` (until live: the "you probably just need a VPS" post) |
| `vps-decided` | Already on or moving to a VPS, wants less operational pain | Wants a simpler execution path | "Setup overhead" | `/` and `/user-docs/quickstart/first-app/` |
| `agent-sandbox` | Building AI agents, needs isolated sandboxes on own infra | Running agents unattended safely | "Agents with prod credentials" | `/ai-agent-sandbox/` |
| `not-a-fit` | Needs multi-region, autoscaling, team RBAC, or is happy where they are | n/a | n/a | Do not respond |

Priority order: `from-vercel` → `from-lovable` → `undecided`. `vps-decided` converts on the homepage
with no special handling. `agent-sandbox` is a design-partner invite, not a volume play.

## Intent classes

| Class | Example phrasing | Action |
| --- | --- | --- |
| `learning` | "How do I deploy Next.js on a VPS?" | Helpful answer, link to a guide only if it answers the question |
| `switching-pain` | "Vercel bill doubled this month" | Helpful answer, link to segment page |
| `high-intent` | "Moving off Vercel, what should I use?" | Helpful answer, link to segment page, invite to try |
| `evaluation` | "Can I run this on a VPS?" | Helpful answer, link to education page |
| `comparison` | "Coolify vs Dokploy vs …?" | Honest comparison, link to `/comparisons/` |
| `builder-signal` | "I wrote my own deploy script" | Note as potential user, usually no reply |

## Switching triggers (watch for these)

- A surprise or fast-growing hosting bill.
- Hitting a platform limit: function timeouts, bandwidth, image optimisation quotas, build minutes.
- Wanting to move a Lovable / v0 / Bolt prototype to "a real home".
- A security or compliance requirement that a shared platform cannot meet.
- Wanting an AI coding agent to own deployment end to end.

## Known objections (and the honest answer)

| Objection | Answer |
| --- | --- |
| "I don't want to manage a VPS" | EasyRunner does the hardening and ops; you still own the box. If you want zero ops, stay managed. |
| "Self-hosting Next.js breaks things" | ISR, image optimisation, streaming, graceful shutdown are handled; see the Next.js recipe and blog post. |
| "Closed source, paid" | Yes. But no lock-in: standard containers, your server, exportable config, no feature gates. Always pair these. |
| "Single server won't scale" | Correct. EasyRunner is for apps that fit on one well-run server. Say so. |
| "I already use Coolify / Dokploy" | Fair. Point at `/comparisons/`; the differences are secure-by-default and agent-native, not a feature list. |

## Signal-to-page map

```text
switching-pain | high-intent  + from-vercel   -> /from-vercel/
switching-pain | high-intent  + from-lovable  -> /from-lovable/  (fallback: quickstart)
evaluation     | comparison   + undecided     -> /is-self-hosting-right-for-you/  (fallback: VPS post)
comparison     + any                          -> /comparisons/
learning       + any                          -> /user-docs/... (only the guide that answers it)
agent-sandbox  + any                          -> /ai-agent-sandbox/
```

Every link the loop produces carries a UTM: `utm_source=<reddit|hn|x|linkedin>`,
`utm_medium=reply|post`, `utm_campaign=<segment>`, `utm_content=<response id>`.

## Activation event

The metric that matters is **a target builder completing a real deployment and being willing to say
why they'd do it again**. Until first deploys are observable, the proxy is the GA-tracked Download
CTA click (see the download demand test). Impressions and followers are not success metrics.

## Vocabulary

- Say "a server you own" for Lovable-origin readers; "VPS" is fine for Vercel-origin readers.
- Avoid "sysadmin", "DevOps", "SRE" in headlines (allowed inside body copy as the villain).
- Disclose affiliation in every public reply: "I build EasyRunner, so bias noted."
