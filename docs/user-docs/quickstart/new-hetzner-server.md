# Quickstart: New Hetzner Server

Use this path when you want EasyRunner to create and register a Hetzner Cloud server for you.

## Steps

```bash
er link hetzner default --api-key <hetzner-api-token>
er server create my-server hetzner
er server init my-server --username root
er server verify my-server
```

!!! info "What happens"
    EasyRunner uses the Hetzner API token to provision infrastructure, records the server in EasyRunner, then initializes it as a web host.

## Before You Run It

- Create a Hetzner Cloud account.
- Create a Hetzner project.
- Create an API token for the project.
- Install and set up the EasyRunner CLI.

## After It Finishes

Continue with [Deploy Your First App](first-app.md#3-link-github).
