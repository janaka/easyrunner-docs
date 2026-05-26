# Server Operations

These commands help inspect and operate an EasyRunner web host.

## List and Details

```bash
er server list
er server update-details my-server --description "Production web host"
```

## Verify Setup

```bash
er server verify my-server
er server verify my-server --include-security-scan
```

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
