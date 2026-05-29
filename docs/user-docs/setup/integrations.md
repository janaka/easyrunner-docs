# Links and Integrations

EasyRunner stores integration credentials in your system keyring. Link only the services you need for the path you are using.

## GitHub

```bash
er link github
```

Use GitHub linking for Flow A deployments. EasyRunner uses it to manage deploy keys for repositories.

## Hetzner

```bash
er link hetzner default --api-key <hetzner-api-token>
```

Use Hetzner linking when you want EasyRunner to create servers in your Hetzner Cloud project.

## Cloudflare

```bash
er link cloudflare production --api-token <cloudflare-api-token>
```

Use Cloudflare linking when you want EasyRunner to create or update DNS records for app domains.

## Status and Unlinking

```bash
er link doctor
er link github --status
er link hetzner default --status
er link cloudflare production --status
```

`er link doctor` reports health across all linked services at once. The per-service `--status` flags inspect a single integration.

Unlink a service when you want EasyRunner to forget the stored credential:

```bash
er link github --unlink
er link hetzner default --unlink
er link cloudflare production --unlink
```

!!! tip "Keyring prompts"
    Your OS may ask you to approve keyring access when EasyRunner reads stored credentials. That is expected.
