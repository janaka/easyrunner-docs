# Links and Integrations

EasyRunner stores integration credentials in its encrypted secrets vault. Link only the services you need for the path you are using.

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

If you also use [control-plane backups](backup-restore.md), the same Cloudflare link is used for R2. Add **Account -> Workers R2 Storage -> Edit** to the token, in addition to the DNS permissions required for domain automation.

## Status and Unlinking

```bash
er link doctor
er link list
er link github --status
er link hetzner default --status
er link cloudflare production --status
```

`er link doctor` reports health across all linked services at once. `er link list` shows linked account names on macOS, which is useful when several Cloudflare or Hetzner accounts are configured. The per-service `--status` flags inspect a single integration.

Unlink a service when you want EasyRunner to forget the stored credential:

```bash
er link github --unlink
er link hetzner default --unlink
er link cloudflare production --unlink
```

!!! tip "Keyring prompts"
    EasyRunner stores linked credentials in the encrypted secrets vault. Your OS may ask you to approve secret access for sensitive operations, but normal multi-secret commands should avoid prompting once per individual key.
