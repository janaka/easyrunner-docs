# Create a Hetzner Server with EasyRunner

Use `er server create` when you want EasyRunner to provision the server for you.

## Prerequisites

- EasyRunner installed and set up
- License installed
- Hetzner Cloud account and project
- Hetzner API token

## Link Hetzner

```bash
er link hetzner default --api-key <hetzner-api-token>
er link hetzner default --status
```

## Create the Server

```bash
er server create my-server hetzner
```

!!! note "Current command status"
    In current CLI help, `er server create` may be marked legacy while server provisioning is being refined. It is still the implemented EasyRunner-created Hetzner path documented here.

## Initialize It

```bash
er server init my-server --username root
er server doctor my-server
```

After initialization, continue with [Add an App](../apps/add-app.md).
