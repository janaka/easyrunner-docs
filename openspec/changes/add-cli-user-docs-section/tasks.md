## 1. Navigation and Structure

- [x] 1.1 Decide the final `Docs` navigation hierarchy in `mkdocs.yml` for concepts, quickstart, setup, servers, apps, recipes, and reference.
- [x] 1.2 Create the directory structure for the new CLI user docs section under `docs/`.
- [x] 1.3 Add a docs landing page that routes users into concepts, quickstarts, task guides, recipes, and reference.
- [x] 1.4 Keep existing public marketing pages reachable while avoiding duplicate or competing install/getting-started paths.

## 2. Concepts Documentation

- [x] 2.1 Create the one-page EasyRunner concepts overview with a simple control-plane to web-host to app request-flow model.
- [x] 2.2 Create or include terminology guidance for control plane, server mode, web host, app, service, deploy flow, link, and mesh.
- [x] 2.3 Create the server provisioning concept page that distinguishes EasyRunner-provisioned Hetzner servers from manually provisioned Ubuntu servers.
- [x] 2.4 Create the apps-and-services concept page explaining EasyRunner apps as deployable app stacks and Compose services as container/process units.
- [x] 2.5 Create the deploy-flow concept page comparing Flow A and Flow B at a high level.

## 3. Install and Setup Guides

- [x] 3.1 Rewrite the CLI install guidance with supported release channels, verification commands, update commands, and troubleshooting.
- [x] 3.2 Add first-run setup guidance for `er setup`, including server/client mode terminology where appropriate.
- [x] 3.3 Add license setup guidance for `er license install`, status validation, and common license issues.
- [x] 3.4 Add links and integrations guidance for GitHub, Hetzner, Cloudflare, and `er link status`.

## 4. Server Guides

- [x] 4.1 Add the EasyRunner-provisioned Hetzner server guide using `er link hetzner` and `er server create`.
- [x] 4.2 Add the existing Ubuntu server guide using `er server add`, `er server show-ssh-key`, and SSH key authorization.
- [x] 4.3 Add the shared server initialization guide for `er server init` and `er server verify`.
- [x] 4.4 Add server operations guidance for server logs, SSH connection testing, Fail2Ban status, and security scan commands where applicable.
- [x] 4.5 Make the convergence from both provisioning paths into initialization visually clear with text, diagrams, tabs, or cards.

## 5. App Deployment Guides

- [x] 5.1 Add the first-app quickstart that gets a user from prepared CLI and web host to a deployed app over HTTPS.
- [x] 5.2 Add app registration guidance for `er app add`, custom domains, repository URLs, and default deploy branches.
- [x] 5.3 Add Compose configuration guidance covering required file location, `name:`, services, networks, public service labels, and internal services.
- [x] 5.4 Add Flow A deploy-from-source guidance covering GitHub linking, repository shape, server-side builds, branch deploys, and `er app deploy`.
- [x] 5.5 Add Flow B deploy-from-registry guidance covering image references, `er app update-details --deploy-flow flow_b`, compose-file storage, and registry credentials.
- [x] 5.6 Add app secrets guidance for set, get, list, delete, generate, reserved `EASYRUNNER_*` secrets, and runtime secret injection.
- [x] 5.7 Add DNS and HTTPS guidance covering manual DNS, Cloudflare automation, Caddy routing, and common certificate failures.

## 6. Operations, Reference, and Recipes

- [x] 6.1 Add app operations guidance for status, logs, start, stop, restart, redeploy, and common deployment failures.
- [x] 6.2 Add a concise CLI command reference organized by task and command group.
- [x] 6.3 Add a Compose and EasyRunner labels reference, including a note that current `app...` labels are service-level configuration.
- [x] 6.4 Add troubleshooting reference sections for install, setup, SSH, DNS, deploy-flow, secrets, and app runtime failures.
- [x] 6.5 Decide whether recipes are included in the initial implementation; if included, add at least one canonical recipe using existing demo app material.

## 7. Material Formatting and Content Polish

- [x] 7.1 Apply consistent Material for MkDocs patterns: tabs for choices, admonitions for notes/warnings, details blocks for optional depth, and code annotations where helpful.
- [x] 7.2 Use diagrams, comparison tables, and term maps to make the docs structure communicate the product model.
- [x] 7.3 Review copy for friendly, precise terminology and remove outdated alpha/beta wording where it no longer matches current behavior.
- [x] 7.4 Ensure marketing value appears through clarity, confidence, and proof rather than promotional copy inside task guides.

## 8. Validation

- [x] 8.1 Build the MkDocs site locally and fix navigation, Markdown, link, and rendering issues.
- [x] 8.2 Check that all new docs pages are reachable through navigation and search.
- [x] 8.3 Review the new docs against the OpenSpec requirements and mark completed tasks.
- [x] 8.4 Verify no CLI behavior or product API changes are included in this docs-only implementation.