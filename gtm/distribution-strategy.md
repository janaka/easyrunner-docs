# EasyRunner distribution strategy

> **The wider challenge.** How EasyRunner reaches people at all, and why any of them should believe
> Janaka is the person to solve their problem. This is the parent of
> [`site-strategy.md`](site-strategy.md), which only governs what happens *after* somebody arrives.
>
> Concrete segments, beliefs and objections live in [`positioning.md`](positioning.md). Phases and
> status live in [`roadmap.md`](roadmap.md). Dated decisions live in [`decisions.md`](decisions.md).

## Diagnosis

**The binding constraint is not the product and not the copy. It is that EasyRunner has no channel to
anybody, and no standing with the few who arrive.**

For a year the working assumption was that the problem was messaging: the wrong words on the homepage,
the wrong segment addressed first. That produced a rewritten hero, an ecosystem landing page, and a
comparison page. All of it was worth doing, and none of it changes the constraint, because it all
operates on traffic that does not exist yet.

### Why the traffic that does arrive is the wrong audience

Assessed 2026-09-20 against the live search landscape and the repo's own content.

1. **The category's search intent is cost reduction, and the answer the market gives is "free".**
   Every roundup ranking for *self-hosted PaaS* and *Vercel alternative* leads with Coolify, Dokploy,
   CapRover and Dokku. The framing is explicit: one quotes self-hosting at 10–20% of a Vercel bill;
   another advertises itself as free to self-host with no per-seat fees. **A paid licence is a
   strictly worse answer to a query whose motivation is a bill.** We are not losing that comparison
   on merit. We are answering a question nobody asked us.
2. **Our own best-ranking content serves the do-it-yourself reader.** The two Hetzner guides teach a
   reader to build the base host by hand in 30–45 minutes. That is the highest-intent search traffic
   we have, and a reader who succeeds no longer needs the product. The only nudge is a sentence that
   assumes they already decided to buy.
3. **Those search results are owned by companies whose distribution *is* content production.**
   Contabo, DigitalOcean, Qovery, Northflank, PandaStack, Temps and ServerCompass publish the
   roundups. EasyRunner appears in none of them. Winning there means out-publishing funded rivals on
   queries that cannot convert at our price.

### Why nobody has reason to listen

Distribution and credibility fail together, and for a paid closed-source infrastructure tool the
credibility bar is *higher* than for the free alternatives, not lower.

- **No owned audience.** No list, no community, no following of consequence. Every reader is earned
  once and then lost.
- **No visible user but us.** Nothing on the site shows another person succeeding with it. Every
  claim is self-authored. Competitors have stars, forks and forum threads, which is exactly the proof
  we lack.
- **Authority is claimed for the product, not the person.** The site argues what EasyRunner does. It
  never establishes why *this person* is credible on hardened self-hosting. The strongest evidence we
  own, a real post-compromise RCA, is filed as a security page rather than as proof of expertise.
- **Closed source and paid reads as risk.** The licensing story is handled everywhere as an objection
  to answer. It is really a trust deficit that has to be paid down with evidence.

### What we cannot yet tell apart

**Twelve of fourteen blog posts contain no call to action**, including both Hetzner guides and the VPS
post. Wrong-audience traffic and right-audience traffic with no exit look identical in analytics. Until
that is fixed, no traffic number can be trusted as evidence about audience quality. The Download CTA
review due in August 2026 has not been done.

## Guiding policy

**Stop competing for cost-motivated demand. Build a channel to risk-motivated buyers, and pay down the
trust deficit with evidence produced by doing the work in public.**

Four commitments follow from that, and each one rules something out.

- **Sell to people whose problem is risk or time, not price.** Somebody escaping a bill will take the
  free tool and should. Somebody who cannot afford a breach, a 2 a.m. outage, or a week of
  hardening is a buyer. We give up the largest and loudest part of the market deliberately.
- **Go where the audience already is before building one of our own.** With no list, owned-channel
  strategies compound from zero too slowly. Useful participation in threads where the pain is being
  described is the only channel available that works on day one.
- **Earn standing with operational evidence, not opinions.** The durable asset is a public record of
  real infrastructure decisions, failures and incidents. That is something a content farm cannot
  fake and a free competitor rarely bothers to write.
- **Never manufacture the crowd.** No invented testimonials, urgency or momentum. This audience
  detects it, and the cost of being caught exceeds anything the tactic could earn.

## Coherent actions

Ordered. Each one is worthless until the one above it is done.

### 1. Close the leak before adding traffic

No channel work is justified while arriving readers have nowhere to go.

- Add a specific, honest next step to every blog post that can carry one, starting with the two
  Hetzner guides and the VPS post.
- Reframe the Hetzner guides so that finishing them produces a reason to want the product rather than
  a substitute for it. The honest version is not "now buy this"; it is showing what the manual path
  costs on the *tenth* server and the second incident.
- Complete the Download CTA review that was due in August, and record it in `decisions.md`.

### 2. Reposition away from the cost query

- Stop pursuing rankings for *self-hosted PaaS* and *Vercel alternative* as primary targets. We
  cannot win them and the readers cannot convert.
- Lead with risk and time wherever we choose our own framing: the week of hardening, the blast
  radius, the thing that breaks at 2 a.m.
- Treat `/comparisons/` as an objection-handling page for people already talking to us, not as an
  acquisition asset.

### 3. Build proof before scaling reach

Nothing here requires many users. Everything here requires evidence.

- **One real user story**, even a single early tester, in their words, naming what broke.
- **One public end-to-end run** somebody else can reproduce without asking us.
- **A visible operational record**: incidents, decisions reversed, features deliberately not built.
- **Promote the compromise RCA** from a security page to the centrepiece credibility asset, because
  publishing an honest incident write-up is something almost nobody in this category does.

### 4. Earn standing in public

The founder's presence explores the problem space; EasyRunner is the evidence that the worldview
works. Three pillars, all drawn from the signal queue or the build log, never from an editorial
calendar.

1. **Practical infrastructure for the missing middle.** VPS versus managed, what a deployment
   abstraction should expose, self-hosting without ideology.
2. **Building EasyRunner in public.** Decisions, failures, what confuses users, what was deliberately
   not built.
3. **Building the distribution engine itself.** How switching intent is classified, why follower
   counts are a weak metric, what the experiment memory reveals. This dogfoods the agent sandbox
   story, because the sandbox is what runs those agents unattended.

Cadence: two LinkedIn posts and three to five X posts per week, plus one source asset every one to
two weeks. One source asset becomes several native pieces; the platforms get different entry points,
never copies.

### 5. Run the distribution loop

Demand capture, automated. This is the channel that works with no audience, because it borrows other
people's.

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

Built as the **Distribution** module in [Talon](README.md#glossary). Scope, data model and phasing are
in [`roadmap.md`](roadmap.md) → Workstream D.

**Operating rules.**

- **Humans post; agents prepare.** Automation reduces research and drafting. It does not publish
  public words until the loop has earned that.
- **Relevant density over reach.** Ten conversations with people actively leaving a platform beat a
  viral post read by nobody who will deploy.
- **Problem-led, not topic-led.** Content comes from observed signals or the build log.
- **Every link carries a UTM**, and every public reply discloses affiliation.

**Its limit, stated plainly.** The loop is demand *capture*. It inserts a helpful stranger into a
thread. It does not build authority, and a stranger with a link is the weakest trust position
available. It only works once action 3 has produced something to point at.

## The market we are actually addressing

### Readiness × source ecosystem

Buyers differ on two axes, and the readiness split matters more than any technical niche because it
determines the motion.

1. **Already decided to self-host.** They want a simpler way to execute a decision already made. The
   motion is low-friction and direct.
2. **Still deciding.** They are weighing managed hosting against ownership. The motion is
   education-first and qualifying.

Overlaid on that, two source ecosystems supply most of the pain we can address: **Vercel / Next.js /
v0**, and **Lovable / v0 / Bolt**. The concrete segment table is in
[`positioning.md`](positioning.md#segments).

### Current priority order

Vercel/Next.js builders who have already decided to self-host, then Lovable-origin builders, then the
undecided. The rationale is proximity to a decision, not market size.

### Open question: which demand pool to build the channel around

Flagged 2026-09-20, **not yet decided.**

The agent-sandbox market has a materially different structure from the self-hosting market. Its
search landscape is dominated by commercial vendors (Modal, Northflank, Beam, Bunnyshell, Coder)
rather than free open-source tools. Buyers there already expect to pay, and their motivation is
containing blast radius rather than reducing a bill. That fits a paid product far better than the
cost-driven self-hosting query does, and it matches our most ownable claim.

Two obstacles. The capability is not shipped, so there is nothing to convert to. And that market's
literature treats plain containers as suitable only for trusted code, while incumbents ship microVMs;
so the isolation claim carries a proof burden we have not yet met.

**Recommendation:** keep the current priority order for anything shipping now, and treat the sandbox
audience as the channel to build toward, so that the standing earned in action 4 accrues in the market
where a paid product can actually win. Revisit when the sandbox capability has a ship date.

## Metrics

Weekly, in this order. The first two layers are the ones currently unmeasured.

| Layer | What to count | Why |
| --- | --- | --- |
| **Proof** | User stories, reproducible public runs, incident write-ups published | The input to everything else; currently zero |
| **Standing** | Repeat readers, inbound questions, unprompted mentions, people citing us | Measures whether anyone listens; currently untracked |
| **Intent** | Tagged landing-page and docs visits, quality replies, direct conversations | Measures whether the loop finds the right people |
| **Activation** | First deployments; proxy is the Download CTA click | The only number that means revenue is possible |
| **Vanity** | Impressions, followers | Watched, never optimised for |

The activation event is defined in [`positioning.md`](positioning.md#activation-event). Message and
CTA variants are rows in the experiment memory, not a list here.

## What this document does not cover

- **What a visitor sees once they arrive.** That is [`site-strategy.md`](site-strategy.md): the
  information architecture, homepage, messaging by audience, and page-level content plan.
- **Product roadmap.** Whether and when agent sandboxes ship is a product decision that this strategy
  depends on but does not make.
- **Pricing.** Treated here as a fixed constraint that rules out cost-motivated buyers.
