# Server Operations

These commands help inspect and operate an EasyRunner web host.

## List and Details

```bash
er server list
er server update-details my-server --description "Production web host"
```

## Health and Status

```bash
er server doctor my-server   # (1)!
er server status my-server   # (2)!
```

1. Runs pass/fail health diagnostics across the host stack (Podman, Caddy, the EasyRunner user, firewall rules, connectivity). Add `--fix` to attempt automatic remediation where supported.
2. Shows a read-only snapshot of runtime state — see the fields below.

`er server doctor` answers "is this web host healthy?" and exits non-zero when a check fails. `er server status` answers "what is this web host doing right now?" and never fails on observed state.

`er server status` samples live resource use from the host and reports:

| Section | Fields |
| --- | --- |
| System | Uptime, load average, **CPU %**, memory free/total, disk free/total, **disk I/O** (read/write throughput), mesh IP. |
| Per app | Deployment state (running / stopped / not deployed), **readiness** (is the web service listening on its `service.port`?), and **per-app CPU % and memory** aggregated across the app's containers. |

!!! info "Readiness is a port-level check"
    Readiness reports whether *something is listening* on the web service's
    `xyz.easyrunner.service.port` inside the container — it catches "container up
    but nothing on the port". A listening port can still return errors, so this
    is not a full HTTP health check. Values: `listening`, `not listening`, or
    `readiness unknown` (no web port, or the probe could not run).

Any field shows `—` when its probe could not be read; the command still succeeds.

### Machine-readable output

Add `--json` to emit the full snapshot as JSON instead of the formatted view — useful for scripting, dashboards, or piping into `jq`:

```bash
er server status my-server --json
```

!!! note "Renamed from `er server verify`"
    Earlier releases used `er server verify`. It is now `er server doctor`, part of a unified diagnostics pattern shared by `er doctor`, `er server doctor`, `er link doctor`, and `er mesh doctor`.

## Security Scan

```bash
er server security-scan my-server
```

Scans deployed apps for information-disclosure vulnerabilities. Use `--scan-all-apps`, or target a specific app or URL with the command's options (see `er server security-scan --help`).

## Reapply Firewall Policy

```bash
er server reapply-firewall my-server
```

Re-applies EasyRunner's canonical host firewall policy on an existing server. It is idempotent — only missing rules are added and stale ones removed — and is the way to backfill new firewall rules (for example mesh-related rules) onto servers initialized by an older CLI version.

## SSH Troubleshooting

```bash
er server ssh-connect-test my-server --username root
```

Use this when `er server init`, `er app deploy`, or logs commands cannot connect.

## Reverse Proxy Logs

```bash
er server logs my-server --lines 100
er server logs my-server --since "1 hour ago"
```

These logs come from the Caddy reverse proxy service on the web host.

## Intrusion Prevention

```bash
er server fail2ban-status my-server
```

Use this to inspect Fail2Ban jail status, policies, and banned IPs.

## EasyRunner Stack Lifecycle

```bash
er server easyrunner-stop my-server
er server easyrunner-start my-server
```

Use these carefully. Stopping the EasyRunner stack can interrupt app routing.
