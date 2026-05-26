# Add an Existing Ubuntu Server

Use this path when you provisioned the server yourself.

## Requirements

| Requirement | Why |
| --- | --- |
| Ubuntu 24.04 or newer | EasyRunner installs and configures an Ubuntu web-host stack. |
| SSH access | EasyRunner manages the host over SSH. |
| Public IP or hostname | Apps need a routable target for DNS and HTTPS. |
| Ports `22`, `80`, `443` reachable | SSH management, HTTP redirects/ACME, and HTTPS traffic. |

## Register the Server

```bash
er server add my-server <server-ip>
```

Print the EasyRunner public key:

```bash
er server show-ssh-key my-server
```

Add the printed key to the server. For example:

- Add it to `~/.ssh/authorized_keys` for the user you will initialize with.
- Add it through your cloud provider's SSH-key UI.

## Test and Initialize

```bash
er server ssh-connect-test my-server --username root
er server init my-server --username root
er server verify my-server
```

!!! tip "Provider usernames"
    Hetzner often uses `root`. Other providers may use names like `ubuntu` or `azureuser`. Use the username that can complete initialization on your server.
