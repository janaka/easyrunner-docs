# Audit Trail

EasyRunner records a local, tamper-evident audit trail for CLI actions, secret-vault access, and authentication challenges.

Use it when you need to answer questions like:

- Which EasyRunner commands ran recently?
- Which operations accessed secrets?
- Did an authentication challenge happen before a sensitive operation?
- Is the audit log hash chain still intact?

## General Audit Log

```bash
er audit
er audit --limit 100
er audit --event action
er audit --event vault_access
er audit --event auth_challenge
er audit --verify
```

| Option | Meaning |
| --- | --- |
| `--limit <n>` / `-n <n>` | Show the most recent `n` events. Use `0` for all events. |
| `--event <type>` / `-e <type>` | Filter by `action`, `vault_access`, or `auth_challenge`. |
| `--verify` | Check the hash chain and report integrity instead of showing normal entries. |

## Secret-Vault Audit View

For a secret-focused view, use:

```bash
er secrets_vault audit
er secrets_vault audit --event vault_access
er secrets_vault audit --event auth_challenge
er secrets_vault audit --verify
```

This filters the audit trail down to secret-vault access and authentication challenge events. For the full log, use `er audit`.

!!! note "Best-effort logging"
    The audit trail is designed to help operators understand what happened. It should not be treated as a remote, append-only compliance system. Keep host access and backups protected as usual.