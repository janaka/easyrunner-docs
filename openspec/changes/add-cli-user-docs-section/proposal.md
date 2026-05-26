## Why

EasyRunner has strong CLI and platform concepts, but the public docs currently mix high-level marketing pages with scattered command guidance. A dedicated CLI user docs section should help users understand the model, choose the right setup path, and deploy confidently while also demonstrating EasyRunner's product value through clear, practical documentation.

This is timely because the CLI now has enough user-facing surface area to need a coherent public learning path: first-run setup, licensing, links/integrations, two server provisioning paths, two deploy flows, app secrets, server/app operations, and troubleshooting.

## What Changes

- Add a new user docs section for the EasyRunner CLI, organized around user journeys rather than raw command groups.
- Introduce a concepts-first structure that explains EasyRunner's mental model before task walkthroughs.
- Add a one-page concepts overview covering control plane, web host, app, service, deploy flow, link, and mesh terminology.
- Clarify server provisioning paths: EasyRunner-created Hetzner servers vs manually provisioned Ubuntu servers, with both paths converging at server initialization.
- Clarify the app/service model: an EasyRunner app is a deployable app stack; Compose services are the container/process units inside it.
- Rework install and first-run guidance into a polished CLI onboarding path.
- Add task-oriented guides for server setup, app deployment, deploy flow selection, app secrets, DNS/HTTPS, and day-2 operations.
- Add reference material for commands, Compose expectations, EasyRunner labels, and troubleshooting.
- Use Material for MkDocs formatting patterns already available in the site for readability: tabs, admonitions, annotations, details blocks, grids/cards, and code examples.
- Preserve existing marketing pages while using the docs section to support content marketing through clarity, proof, and practical usefulness.

## Capabilities

### New Capabilities

- `cli-user-docs`: Public CLI user documentation that teaches EasyRunner concepts, setup paths, deployment workflows, terminology, and operational tasks.

### Modified Capabilities

- None.

## Impact

- Adds new documentation pages under `docs/` and updates `mkdocs.yml` navigation.
- Revises or replaces the current lightweight install/alpha getting-started content with a structured CLI docs section.
- Reuses and polishes source material from the private EasyRunner CLI repository's user guides and design notes.
- Does not change CLI behavior, product APIs, command names, or runtime behavior.
- May surface follow-up product decisions, especially around service-level Compose label terminology, but those changes are outside this docs change.