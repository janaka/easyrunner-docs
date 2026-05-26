# Quickstart: Existing Ubuntu Server

Use this path when you already have an Ubuntu server and want EasyRunner to manage it as a web host.

## Requirements

- Ubuntu 24.04 or newer
- SSH access as `root` or another user with enough privilege for initialization
- Public IP address or hostname
- Inbound SSH, HTTP, and HTTPS allowed: ports `22`, `80`, and `443`

## Steps

```bash
er server add my-server <server-ip>
er server show-ssh-key my-server
```

Add the printed public key to the server. For example, add it to `~/.ssh/authorized_keys` for the user you will pass to `er server init`, or add it through your cloud provider's SSH-key UI.

Then initialize and verify:

```bash
er server init my-server --username root
er server verify my-server
```

!!! info "What happens"
    `er server add` registers the web host and creates a dedicated EasyRunner SSH key. `er server init` uses that SSH access to install and configure the hosting stack.

## After It Finishes

Continue with [Deploy Your First App](first-app.md#3-link-github).
