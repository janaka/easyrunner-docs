# Control-Plane Backup and Restore

`er backup` backs up the **EasyRunner control plane**: the local state EasyRunner uses to remember servers, apps, links, secrets, license, and SSH keys.

!!! warning "Not an app-data backup"
    Control-plane backups do **not** back up your hosted app data, container volumes, Caddy certificates, databases, or files created by your applications. Back up production app data separately.

## What Gets Backed Up

- The EasyRunner SQLite store, captured consistently while EasyRunner is running.
- `config.json`, including run mode and EasyRunner server connections.
- The installed license file.
- EasyRunner-managed SSH keys for web hosts.
- The encrypted secrets vault state stored in the SQLite database.

Backups use [restic](https://restic.net/) and store encrypted snapshots in Cloudflare R2. R2 reuses your linked Cloudflare token, so you do not need a separate S3 credential.

## One-Time Setup

First, link Cloudflare if you have not already:

```bash
er link cloudflare production --api-token <cloudflare-api-token>
```

Your Cloudflare token needs the DNS permissions used by EasyRunner plus **Account -> Workers R2 Storage -> Edit** for backups.

Then initialise the backup destination:

```bash
er backup init production
```

`er backup init`:

- auto-detects the Cloudflare account ID when it can;
- creates a per-install R2 bucket by default;
- shows the account, bucket, and restic repository plan before changing anything;
- asks for confirmation, unless you pass `--yes`;
- prints the restic repository password once.

!!! danger "Save the restic password"
    Store the restic repository password in a password manager when `er backup init` shows it. You need that password, plus access to the Cloudflare token, to restore onto a fresh machine. EasyRunner does not store the password inside the backup.

Optional setup flags:

```bash
er backup init production --bucket er-my-backups --account-id <account-id>
er backup init production --prefix laptop-a --yes
```

## Everyday Commands

```bash
er backup run production
er backup status production
er backup list production
er backup doctor production
er backup doctor production --fix
```

| Command | Purpose |
| --- | --- |
| `er backup run` | Take a control-plane backup now. Use `--dry-run` to preview. |
| `er backup status` | Show observed state such as destination and last backup. This is read-only and does not fail just because something needs attention. |
| `er backup list` | List snapshots in the restic repository. |
| `er backup doctor` | Check restic, Cloudflare link, R2 scope, destination, repository password, staging space, and repository integrity. |
| `er backup doctor --fix` | Attempt supported fixes, including installing restic where EasyRunner knows how. |

!!! tip "Back up around upgrades"
    Run `er backup run` before and after upgrading EasyRunner. That gives you a last-known-good snapshot from the old version and a fresh snapshot in the new schema after the upgrade.

## Restore Onto a Fresh Machine

On a replacement machine:

1. Install EasyRunner.
2. Re-link Cloudflare with a token that can access the same R2 account and bucket.
3. Restore the latest snapshot.

```bash
er link cloudflare production --api-token <cloudflare-api-token>
er backup restore production
```

`er backup restore` discovers the Cloudflare account ID and candidate EasyRunner backup buckets when possible. It asks for the escrowed restic password, shows a restore plan, and asks for confirmation before changing anything.

Useful restore flags:

```bash
er backup restore production --snapshot <snapshot-id>
er backup restore production --bucket <bucket> --account-id <account-id>
er backup restore production --dry-run
er backup restore production --force
er backup restore production --password-file <path>
```

!!! warning "Overwrite protection"
    Restore refuses to overwrite an already configured EasyRunner install unless you pass `--force`. Use `--dry-run` first when you want to see what would happen.

## Secrets and Recovery

Current backups do not write a plaintext secrets file. Secrets ride inside the encrypted vault state in the SQLite store, and the vault master key is recovered from metadata tied to the restic password.

On a fresh-host restore, EasyRunner re-caches the recovered vault key on the new machine. If the password is wrong or the vault cannot be recovered, restore reports that clearly instead of pretending secrets are usable.

## What to Keep Safe

To recover the control plane you need both:

- access to the linked Cloudflare account/token with R2 permission;
- the restic repository password shown during `er backup init`.

If you lose both, the backup cannot be decrypted.