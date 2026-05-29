# Initialize a Web Host

After a server is created or registered, initialize it with EasyRunner.

```bash
er server init my-server --username root
```

## What Initialization Prepares

- Dedicated EasyRunner operational user
- Podman container runtime
- Caddy reverse proxy with automatic HTTPS routing
- OS firewall rules
- Systemd user services for app lifecycle
- Supporting network configuration for app containers

## Check the Setup

```bash
er server doctor my-server
```

`er server doctor` runs health-check diagnostics on the web host (Podman, Caddy, the EasyRunner user, firewall rules, and more) and reports pass/fail for each. Add `--fix` to attempt automatic remediation where supported.

If checks fail, verify SSH first:

```bash
er server ssh-connect-test my-server --username root
```

## Shared Lifecycle

```text
er server create ─┐
                  ├── er server init ── er app add ── er app deploy
er server add ────┘
```

Both provisioning paths become the same EasyRunner web-host lifecycle after initialization.
