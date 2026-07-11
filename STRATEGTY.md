# EasyRunner strategy brief

## Purpose

This document consolidates the decisions and strategic direction developed in the discussion about applying *Why Killer Products Don’t Sell* to [EasyRunner](https://easyrunner.xyz/). It is intended to give another agent enough context to plan tactics, produce landing pages and blog content, and adjust the information architecture (IA) and messaging of the marketing site.

## Product context

EasyRunner is positioned as a CLI-first self-hosting platform that helps users deploy apps to their own servers without the usual operational complexity[1]. The current public positioning emphasizes ownership, predictable costs, and avoiding surprise bills or platform lock-in[2][1]. Pricing is based on the number of hosted apps, while users pay their VPS provider directly for compute[2].

## Strategic lens from the book

The central idea taken from *Why Killer Products Don’t Sell* is that a product should not be sold with a generic sales motion; the company should match its sales and messaging to the buyer’s buying culture[3][4]. The book’s relevance to EasyRunner is that self-hosting is not just a feature choice but often a category and workflow decision, so some prospects need straightforward product conversion while others need education and category conviction first[3][5][6].

The most important conclusion is that EasyRunner should not try to serve all prospects with one homepage message. The market contains at least two different readiness states, and they should be treated as distinct paths rather than blended into one generic self-hosting pitch[3][4][6].

## Core decisions

- EasyRunner should be framed primarily as a control, predictability, and ownership product rather than a generic PaaS alternative[2][1].
- The default conversion audience should be people who have already decided that self-hosting on a VPS is the right direction for them[3][4].
- Prospects who are still deciding whether self-hosting is right should be treated as an education audience, not the default homepage audience[3][5].
- Messaging should be segmented by both buyer readiness and source ecosystem, especially users coming from [Vercel](https://vercel.com/) and [Lovable Cloud](https://lovable.dev/cloud)[7][8][9].
- The main marketing site should optimize for conversion of VPS-decided users, while supporting ecosystem-specific and decision-support content through dedicated pages[2][1].

## Segmentation model

### Axis 1: buyer readiness

There are two primary readiness segments:

1. **Already decided on VPS self-hosting.** These users already believe self-hosting is the right path. They are not looking for philosophical persuasion; they want a simpler way to execute on a decision they have already made. For this segment, the right motion is low-friction, product-led, and direct[3][4].
2. **Still deciding whether self-hosting is right.** These users are comparing managed platforms with self-hosting and need help understanding trade-offs. For this segment, the right motion is education-first, trust-building, and qualification-oriented[3][5].

This readiness split is more important than any single technical niche because it determines the sales and messaging motion[3][6].

### Axis 2: source ecosystem

Within those readiness segments, there are two promising ecosystem-specific niches:

- **[Lovable Cloud](https://lovable.dev/cloud) users.** These users may have started with Lovable for speed and convenience, but some will later want portability, control, or infrastructure ownership[7][10].
- **[Vercel](https://vercel.com/) / Next.js / v0 users.** These users are likely to care about excellent developer experience, but some will seek alternatives when cost predictability, infrastructure control, or platform fit becomes more important[8][11][9].

The ecosystem dimension overlays the readiness dimension. In practice, this creates a 2 x 2 matrix: buyers can come from Lovable or Vercel, and they can be either already decided on self-hosting or still evaluating it[7][8].

## ICP matrix

| Segment | Buyer state | Trigger | Biggest fear | Best message | Recommended motion |
|---|---|---|---|---|---|
| VPS-decided builders | Already committed to self-hosting | Wants control and predictable hosting on own VPS | Operational complexity and setup overhead | Deploy on your own VPS without the self-hosting pain[1] | Direct conversion, product-led, docs-first |
| VPS-undecided builders | Unsure whether self-hosting is right | Comparing managed cloud with VPS ownership | Making the wrong infrastructure choice | Find out whether self-hosting is actually right for your app[3][4] | Education-first, qualification-driven |
| Lovable-origin builders | Built fast on Lovable, now want more ownership | Need more control, portability, or less dependence | Getting trapped in a hosted workflow | Keep the speed, gain infrastructure ownership[7][10] | Migration narrative, outcome-led |
| Vercel / Next.js / v0 builders | Used to strong DX and managed workflows | Cost, platform fit, or desire for infra control | Losing DX or breaking app behavior | A calmer path off managed hosting for apps that have outgrown it[8][11][9] | Comparison-led, migration proof |

## Priority order

The highest-priority ICP should be Vercel or Next.js-oriented builders who have already decided that self-hosting is worth it[8][9]. This audience is closest to conversion because the decision about hosting philosophy is already made, and EasyRunner can position itself as the simpler execution path[3][4][1].

The second-priority ICP should be Lovable users who are moving from fast prototyping into longer-term ownership and deployment needs[7][10]. The third-priority audience is uncertain buyers in either ecosystem; these users are still valuable, but they should enter through educational content rather than the default conversion path[3][5].

## Positioning

### Core positioning

EasyRunner should be positioned as a way to run apps on a user’s own VPS without forcing them to become their own platform team[1][12]. The product promise is not “infinite flexibility” or “enterprise platform engineering.” The promise is predictable infrastructure ownership with much less operational pain[2][1].

### Core value pillars

- **Ownership.** The customer controls the server and stack[1].
- **Predictability.** Pricing is app-based rather than usage-metered by EasyRunner, and the user pays the VPS provider directly for compute[2].
- **Reduced complexity.** EasyRunner simplifies the operational work of deploying to owned infrastructure[1][12].
- **Lower lock-in.** The message of “own your stack” and “no surprise bills” directly supports a portability and trust narrative[1].

### Positioning guardrails

- Do not market EasyRunner as a generic “better Vercel” or “cheaper cloud.” That is too broad and weakens differentiation.
- Do not lead with a long feature list.
- Do not use the same message for convinced and unconvinced prospects.
- Do not over-target “all developers.” The message should feel specific to builders who value control, cost predictability, and VPS ownership.

## Messaging framework

### Primary site message

The main site should speak first to users who already want to self-host.

Suggested strategic message:

> EasyRunner helps you deploy apps on your own VPS without the complexity, surprise bills, or platform lock-in of managed hosting[2][1].

### Messaging by audience

#### For VPS-decided users

Lead with:

- Speed to deployment.
- Simpler operations.
- Predictable pricing model.
- Infrastructure ownership.
- Reduced lock-in[2][1][12].

This audience wants confirmation that EasyRunner makes the path they have already chosen easier and safer.

#### For VPS-undecided users

Lead with:

- Decision support.
- Honest trade-offs.
- When self-hosting is a fit and when it is not.
- Cost and complexity comparison.
- Qualification rather than hard selling[3][4][5].

This audience should be routed to guides, comparisons, and educational pages rather than the default product CTA.

#### For Vercel / Next.js / v0 users

Lead with:

- Cost predictability.
- Control over infrastructure.
- A credible path away from a managed platform when the app has outgrown it.
- Respect for why they chose [Vercel](https://vercel.com/) in the first place, especially its workflow and developer experience[8][11][9].

The tone should not be hostile or dismissive toward Vercel. It should acknowledge the strengths of Vercel while making the case for when self-hosting becomes the better fit.

#### For Lovable users

Lead with:

- Keeping the speed of rapid creation while gaining portability and ownership.
- A path from hosted convenience to infrastructure control.
- Reduced dependence on a closed hosted path[7][10].

## Recommended information architecture

The marketing site should move toward a clear separation between conversion pages and education pages.

### Core IA recommendation

- `/` should be the main conversion page for users already inclined toward self-hosting.
- `/is-self-hosting-right-for-you/` should be the main education and qualification page for uncertain users.
- `/from-vercel/` should be the ecosystem-specific page for [Vercel](https://vercel.com/) / Next.js / v0 users.
- `/from-lovable/` should be the ecosystem-specific page for [Lovable Cloud](https://lovable.dev/cloud) users.
- `/pricing/` should continue to foreground EasyRunner’s app-based pricing model and infrastructure ownership model[2].

### IA principle

The homepage should not try to be the full decision guide for every possible visitor. It should convert the most ready audience first, while offering obvious side routes for people who need either ecosystem-specific framing or help deciding whether self-hosting is right[3][4].

## Homepage message map

### Hero

- **Headline:** Deploy on your own VPS without the self-hosting pain.
- **Subheadline:** EasyRunner gives builders a CLI-first way to run apps on their own infrastructure with predictable licensing, no usage metering from EasyRunner, and less platform lock-in[2][1].
- **Primary CTA:** See how it works.
- **Secondary CTA:** Is self-hosting right for you?

### Suggested section order

1. **Pain-led opening.** Explain when managed hosting stops feeling simple, focusing on surprise bills, lock-in, and complexity creep[2][1].
2. **Product fit filter.** State who EasyRunner is for and who it is not for, so the right buyers self-qualify quickly[3][4].
3. **How it works.** Show the simple path from owned VPS to deployed app[13][12].
4. **Ecosystem entry points.** Include tailored routes for Vercel/Next.js/v0 users and Lovable users[7][8].
5. **Pricing clarity.** Reinforce the app-based model and the fact that the user pays the VPS provider directly[2].
6. **Decision support CTA.** Offer an education path for visitors who are still unsure about self-hosting[3][4].

## Content strategy brief for the next agent

The next agent should treat content planning as a combination of conversion content, ecosystem landing pages, and educational qualification content.

### Content goals

- Convert VPS-decided users who are actively seeking a simpler self-hosting path.
- Capture Vercel and Lovable-origin users with ecosystem-specific entry pages.
- Educate and qualify prospects who are still deciding whether self-hosting is a fit.
- Support IA changes by making each page serve a distinct job rather than mixing jobs.

### Content workstreams

#### 1. Conversion pages

Primary goal: convert ready buyers.

Recommended pages:

- Homepage.
- Pricing page refinement.
- Product “how it works” page.
- Lightweight “why EasyRunner” page if needed.

#### 2. Ecosystem landing pages

Primary goal: contextualize EasyRunner for source audiences.

Recommended pages:

- `/from-vercel/`
- `/from-lovable/`

Each page should:

- Acknowledge why the source platform is attractive.
- Explain when teams outgrow it or want something different.
- Reframe EasyRunner as a next step, not a generic replacement.
- Include practical migration-oriented proof and use cases.

#### 3. Educational and qualification content

Primary goal: help uncertain users decide if self-hosting is right.

Recommended pages or posts:

- “Is self-hosting right for your app?”
- “When to choose managed hosting vs your own VPS.”
- “What changes when you move from managed hosting to a VPS.”
- “When Vercel is great, and when it’s worth self-hosting instead.”
- “A founder’s guide to predictable hosting costs.”

This content should be balanced and credible. It should not read like disguised product hype. Its job is to help buyers reach a decision and then naturally route the best-fit ones toward EasyRunner[3][4][5].

## Site messaging adjustment plan

### Immediate changes

- Tighten the homepage to target the VPS-decided segment first.
- Make the control, predictability, and ownership story more prominent.
- Add a visible alternate path for users who are still deciding whether self-hosting is right.
- Add ecosystem-specific navigation or sectional entry points for Vercel and Lovable audiences.

### Medium-term changes

- Build dedicated ecosystem landing pages.
- Build a decision-support pillar page around self-hosting fit.
- Rework navigation and CTA logic so that high-intent users get conversion CTAs, while uncertain users get educational CTAs.

### Messaging tests to consider

Potential headline or angle tests:

- Own your VPS without owning all the complexity.
- Self-host your apps without building your own platform.
- Predictable app hosting on your own infrastructure.
- For builders who want out of surprise bills and into owned infrastructure.

Potential CTA tests:

- See how it works.
- Is self-hosting right for you?
- Coming from Vercel?
- Built in Lovable?

## Instructions for the next agent

The next agent should use this brief as strategic context and then produce the tactical plan and content. Specifically, the next agent should:

1. Turn the segmentation and readiness model into a detailed content plan.
2. Propose the revised IA and navigation structure for the marketing site.
3. Create a messaging architecture covering homepage, ecosystem pages, and educational pages.
4. Draft the actual copy for the homepage and the highest-priority ecosystem landing page first.
5. Draft blog and guide content only where it serves a specific funnel role.
6. Keep all writing aligned to the central strategic rule: convert the convinced, educate the uncertain[3][4][6].

## Final strategic summary

EasyRunner should not market itself as a broad self-hosting tool for everyone. It should market itself first to builders who already want VPS ownership and need a simpler execution path[3][4][1]. Around that core, the site should create dedicated messaging for Vercel and Lovable-origin users and add educational content for people still deciding whether self-hosting is a fit[7][8][9].

The key strategic principle is simple: one product, multiple entry points, with messaging shaped by readiness and source ecosystem rather than a single generic homepage story[3][5][6].