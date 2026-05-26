# EasyRunner CLI Docs

EasyRunner is a CLI-first way to turn your own Ubuntu server into a secure web host for containerized apps. These docs are organized around the model you need to understand, then the tasks you need to complete.

<div class="grid cards" markdown>

-   #### Concepts

    ---

    Learn the shape of EasyRunner: control plane, web host, app, service, deploy flow, link, and mesh.

    [Start with concepts](concepts/index.md)

-   #### Quickstart

    ---

    Install the CLI, prepare a server, and deploy your first app over HTTPS.

    [Deploy your first app](quickstart/first-app.md)

-   #### Setup

    ---

    Install EasyRunner, run first-time setup, install a license, and link external services.

    [Prepare the CLI](setup/install.md)

-   #### Servers

    ---

    Create a Hetzner server with EasyRunner or bring an existing Ubuntu server.

    [Set up a web host](servers/create-hetzner-server.md)

-   #### Apps

    ---

    Add apps, configure Compose files, choose a deploy flow, manage secrets, and operate deployments.

    [Deploy apps](apps/add-app.md)

-   #### Reference

    ---

    Command reference, Compose labels, and troubleshooting notes for when something needs a closer look.

    [Use the reference](reference/commands.md)

</div>

## The Short Version

```text
Install CLI -> run setup -> prepare web host -> add app -> deploy -> operate
```

The main split happens when you prepare a web host:

```text
Need a server?
├── Let EasyRunner create one on Hetzner
│   └── er link hetzner ... + er server create <name> hetzner
└── Bring an existing Ubuntu server
    └── er server add <name> <ip> + authorize the generated SSH key

Both paths converge at:
└── er server init <name> --username <user>
```

!!! tip "New to EasyRunner?"
    Read [EasyRunner in One Page](concepts/index.md), then follow [Deploy Your First App](quickstart/first-app.md). That gives you the concepts and the practical path without making you read every reference page first.
