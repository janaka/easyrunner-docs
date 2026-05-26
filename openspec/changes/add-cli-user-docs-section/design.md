## Context

The current public site has strong positioning pages for EasyRunner, but user-facing CLI guidance is shallow or fragmented. The existing [Install](../../../docs/install.md) page is short, the alpha getting-started guide exists but is not in navigation, and deeper command guidance lives in the private EasyRunner CLI repository under internal user-guide and design documents.

The docs site uses Material for MkDocs 9.7+ with useful free features already enabled, including tabs, admonitions, details blocks, superfences, annotations, grids/cards, search, blog, social cards, and custom styling. The new CLI docs section should take advantage of those features without turning the docs into a marketing landing page.

The main stakeholders are new users evaluating EasyRunner, alpha/beta users trying to deploy real apps, and the product itself: clear docs should expose terminology and model problems early enough to influence CLI and config naming decisions.

## Goals / Non-Goals

**Goals:**

- Create a concepts-first CLI docs section that teaches EasyRunner's model before detailed tasks.
- Make the docs structure itself communicate the high-level product concepts.
- Provide a one-page concepts guide covering control plane, web host, app, service, deploy flow, link, and mesh.
- Split server setup guidance into two visible paths: EasyRunner-provisioned Hetzner server and manually provisioned Ubuntu server.
- Show that both server provisioning paths converge at `er server init` and then share the same app deployment lifecycle.
- Define terminology consistently: an EasyRunner app is a deployable app stack; a Compose service is one container/process inside that app.
- Build task-oriented pages for onboarding, server setup, app deployment, deploy flows, app secrets, operations, and troubleshooting.
- Use Material for MkDocs formatting to improve scanning, readability, and confidence.
- Preserve the existing public marketing pages and let the new docs support content marketing by being genuinely useful.

**Non-Goals:**

- Change EasyRunner CLI behavior, command names, or product APIs.
- Implement the proposed service-label migration from `app...` names to `service...` names.
- Document unreleased or experimental mesh behavior as part of the main onboarding path.
- Build a full API reference generator or automated CLI help extraction pipeline.
- Replace the blog or existing marketing pages with the docs section.

## Decisions

### Decision: Add a Top-Level Docs Navigation Section

Add a `Docs` top-level navigation area that contains the CLI user documentation. Keep existing `Home`, `How It Works`, `Install`, `Features`, `FAQ`, and `Blog` pages available, but move serious user guidance into the new section.

Alternative considered: expand the existing `Install` page into a long guide. This would be faster but would keep concepts, setup, deployment, and troubleshooting tangled together.

### Decision: Lead with Concepts, Then Quickstarts

Use this broad structure:

```text
Docs
├── Concepts
│   ├── EasyRunner in One Page
│   ├── Servers and Web Hosts
│   ├── Apps and Services
│   ├── Links and Integrations
│   └── Deploy Flows
├── Quickstart
│   ├── Deploy Your First App
│   ├── New Hetzner Server
│   └── Existing Ubuntu Server
├── Install & Setup
├── Servers
├── Apps
├── Recipes
└── Reference
```

Alternative considered: command-group structure such as `Install`, `Server`, `App`, `Link`, `Config`. That is useful for reference, but it does not teach the product model as well as a concepts and journey structure.

### Decision: Treat Server Provisioning as a First-Class Branch

The docs must distinguish server provisioning from server initialization:

```text
Need a server?
├── Let EasyRunner create one on Hetzner
│   └── er link hetzner ... + er server create <name> hetzner
└── Bring an existing Ubuntu server
    └── er server add <name> <ip> + er server show-ssh-key <name>

Both paths converge at:
└── er server init <name> --username <user>
```

Alternative considered: one combined server setup guide with tabs only. Tabs should still be used inside pages, but the nav should expose the two paths because this is a core product choice and content-marketing point: users can start easy without being locked in.

### Decision: Use `Web Host` in Prose to Reduce `Server` Ambiguity

The CLI has both `er setup --mode server` and `er server ...` commands. Public docs should use precise prose:

- `server mode install` or `control-plane server mode` for EasyRunner's own stateful install mode.
- `web host`, `host server`, or `Ubuntu web host` for the machine that runs apps.
- `server` where matching the CLI command or provider/VPS language is clearest.

Alternative considered: use `server` everywhere because the CLI does. That is shorter but risks confusing control-plane mode with target web hosts.

### Decision: Define App and Service Explicitly

The docs should define an EasyRunner app as a deployable app stack, not as a single container. A Compose service is one container/process inside the app.

Example model:

```text
EasyRunner app: shop
├── Compose service: web      public, routed by Caddy
├── Compose service: api      internal
├── Compose service: worker   internal
└── Compose service: redis    internal
```

Alternative considered: avoid the inconsistency and keep examples to one-service apps. That would make the quickstart easier but would fail users when they reach multi-service deployments.

### Decision: Keep `link` as the CLI Verb, Explain It as an Integration

Docs should group GitHub, Hetzner, and Cloudflare under `Links and Integrations`. A link is a stored connection to an external service:

- Link GitHub so EasyRunner can manage deploy keys.
- Link Hetzner so EasyRunner can create servers.
- Link Cloudflare so EasyRunner can create DNS records.

Alternative considered: rename docs pages to only use `link`. `Integrations` is friendlier for discovery; `link` remains the command users run.

### Decision: Keep Mesh Out of the Main Path

Mesh should appear in the concepts glossary as an advanced/private networking concept, but detailed mesh docs should live under `Advanced` or `Reference` only if the feature is user-ready.

Alternative considered: include mesh as a full top-level concept page immediately. That could distract first-time users from the core deploy story.

### Decision: Use Material Formatting as Documentation UX

Use these patterns consistently:

- Cards/grids for high-level route selection and docs landing pages.
- Tabs for platform choices, release channels, and provisioning alternatives inside a guide.
- Admonitions for prerequisites, notes, warnings, and "what is happening" explanations.
- Code annotations for command walkthroughs.
- Details blocks for troubleshooting, deeper explanations, and optional context.
- Tables for terminology maps, label reference, and deploy-flow comparisons.

Alternative considered: mostly plain Markdown. That is simpler to maintain but misses a chance to make complex CLI infrastructure guidance feel friendly and readable.

## Risks / Trade-offs

- Scope creep from docs IA into product renaming -> Keep CLI/product changes out of this change and track follow-up product decisions separately.
- Stale docs copied from the private CLI repo -> Treat private repo docs as source material, not a direct copy; verify commands and current behavior while implementing.
- Navigation becoming too deep -> Use a small docs landing page and concise sections; keep detailed command material in reference pages.
- Over-documenting alpha/beta behavior -> Mark release-channel and roadmap details clearly, and avoid presenting future features as current behavior.
- App/service label terminology mismatch remains in current product -> Explain current labels as service-level configuration and link the product follow-up issue when appropriate.
- Material formatting overuse -> Use components to clarify choices and workflows, not for decoration.

## Migration Plan

1. Create the new docs section and nav entries without removing existing public pages.
2. Move or rewrite the current hidden alpha getting-started guide into the new quickstart structure.
3. Replace the current install page content with a polished install/setup entry point or redirect users into the new docs section through navigation.
4. Add concepts and terminology pages before expanding task/reference pages.
5. Add deploy-flow, app-secret, server, app operations, and troubleshooting pages using verified CLI repo source material.
6. Build the MkDocs site locally and fix navigation, broken links, formatting, and readability issues.

Rollback is straightforward because this is a documentation-only change: revert the new docs files and `mkdocs.yml` nav changes.

## Open Questions

- Should the top-level public nav keep a standalone `Install` tab after the new docs section exists, or should install live under `Docs` only?
- Should `Recipes` be part of the initial implementation or follow after the core concepts/quickstart/reference pages land?
- How prominently should the docs mention the current service-label terminology mismatch before the product supports clearer `service.*` labels?
- Should the docs call the target machine `web host`, `host server`, or `server` most of the time?
- Which deploy-flow examples should be canonical for the first public version: Next.js, Django, Node API, OpenClaw, or a minimal hello-world app?