## ADDED Requirements

### Requirement: Concepts-first CLI documentation
The documentation SHALL provide a public CLI user docs section that introduces EasyRunner concepts before detailed task guides.

#### Scenario: User opens CLI docs section
- **WHEN** a user enters the CLI docs section
- **THEN** the docs present a concepts-first path before or alongside quickstart and reference pages

#### Scenario: User needs a high-level model
- **WHEN** a user reads the concepts overview
- **THEN** the docs explain control plane, web host, app, service, deploy flow, link, and mesh terminology at a high level

### Requirement: Server provisioning paths are explicit
The documentation SHALL clearly distinguish EasyRunner-provisioned servers from manually provisioned Ubuntu servers.

#### Scenario: User wants EasyRunner to create a server
- **WHEN** a user chooses the EasyRunner-provisioned server path
- **THEN** the docs guide them through linking Hetzner and using `er server create`

#### Scenario: User already has a server
- **WHEN** a user chooses the existing Ubuntu server path
- **THEN** the docs guide them through registering the server with `er server add` and authorizing the generated SSH key

#### Scenario: Server setup paths converge
- **WHEN** a user completes either server provisioning path
- **THEN** the docs show that both paths converge at `er server init` before app deployment

### Requirement: App and service terminology is defined
The documentation SHALL define an EasyRunner app as a deployable app stack and a Compose service as a container/process inside that app.

#### Scenario: User configures a one-service app
- **WHEN** a user reads app configuration guidance for a simple app
- **THEN** the docs explain that the EasyRunner app may contain one Compose service

#### Scenario: User configures a multi-service app
- **WHEN** a user reads app configuration guidance for a multi-service app
- **THEN** the docs explain how multiple Compose services can belong to one EasyRunner app

#### Scenario: User reads service labels
- **WHEN** a user reads EasyRunner label reference material
- **THEN** the docs identify current service-level labels and explain that they are applied to Compose services

### Requirement: Setup and integrations are task-oriented
The documentation SHALL provide task-oriented setup guidance for installing the CLI, running first-time setup, installing a license, and linking external services.

#### Scenario: User installs EasyRunner
- **WHEN** a user follows install guidance
- **THEN** the docs cover supported install channels and verification with the CLI version or help command

#### Scenario: User prepares required credentials
- **WHEN** a user follows integration guidance
- **THEN** the docs explain which `er link` command to use for GitHub, Hetzner, and Cloudflare and why each link is useful

### Requirement: Deployment workflows are documented
The documentation SHALL explain app deployment using task-oriented guides for adding apps, choosing deploy flows, configuring Compose files, managing secrets, DNS/HTTPS, and deploying.

#### Scenario: User chooses a deploy flow
- **WHEN** a user reads deploy-flow guidance
- **THEN** the docs compare Flow A build-on-server deployments with Flow B pre-built registry image deployments

#### Scenario: User deploys from source
- **WHEN** a user follows Flow A guidance
- **THEN** the docs explain required repository shape, GitHub linking, Compose file expectations, and `er app deploy`

#### Scenario: User deploys from a registry
- **WHEN** a user follows Flow B guidance
- **THEN** the docs explain registry image references, app secrets for registry access when required, compose-file storage, and `er app update-details`

### Requirement: Operational docs are available
The documentation SHALL include day-2 operations guidance for inspecting, controlling, and troubleshooting EasyRunner servers and apps.

#### Scenario: User checks app health
- **WHEN** a user needs to inspect a deployed app
- **THEN** the docs reference app status, app logs, and lifecycle commands such as start, stop, and restart

#### Scenario: User checks server health
- **WHEN** a user needs to inspect a web host
- **THEN** the docs reference server verification, server logs, SSH connection testing, Fail2Ban status, and security scan guidance where applicable

#### Scenario: User hits a common failure
- **WHEN** a user encounters a common setup or deployment failure
- **THEN** the docs provide troubleshooting guidance with likely causes and next commands to run

### Requirement: Material for MkDocs readability patterns are used
The documentation SHALL use the existing Material for MkDocs feature set to improve readability and scanning for CLI users.

#### Scenario: User compares options
- **WHEN** a page presents platform, provisioning, release-channel, or deploy-flow choices
- **THEN** the docs use an appropriate readable pattern such as tabs, cards, or comparison tables

#### Scenario: User follows commands
- **WHEN** a page presents a command sequence
- **THEN** the docs use clear code blocks and explanatory text or annotations to show what each command does

#### Scenario: User needs optional details
- **WHEN** a page includes deeper background or troubleshooting detail
- **THEN** the docs use details blocks or admonitions so the primary task flow remains readable