# CLI Command Reference

This is a task-oriented map of common EasyRunner commands. Use `--help` on any command for current options.

```bash
er --help         # (1)!
er server --help  # (2)!
er app --help     # (3)!
er backup --help  # (4)!
```

1. Top-level CLI help and global options.
2. Web-host/server commands.
3. App deployment and operations commands.
4. Control-plane backup and restore commands.

???+ abstract "Setup"

	| Task | Command |
	| --- | --- |
	| First-run setup | `er setup` |
	| Non-interactive server mode setup | `er setup --mode server` |
	| Show config | `er config show` |
	| Check CLI prerequisites | `er doctor` |
	| Install missing prerequisites | `er doctor --fix` |

??? abstract "License"

	| Task | Command |
	| --- | --- |
	| Install license | `er license install <file.jwt>` |
	| Show license | `er license status` |
	| Validate license | `er license validate` |
	| Remove license | `er license remove` |

??? abstract "Links"

	| Task | Command |
	| --- | --- |
	| Link GitHub | `er link github` |
	| Link Hetzner | `er link hetzner <project> --api-key <token>` |
	| Link Cloudflare | `er link cloudflare <account> --api-token <token>` |
	| List linked accounts on macOS | `er link list` |
	| Diagnose all links | `er link doctor` |
	| Show GitHub link status | `er link github --status` |
	| Show named provider status | `er link <provider> <account> --status` |
	| Unlink a service/account | `er link <service> [account] --unlink` |

???+ abstract "Servers"

	| Task | Command |
	| --- | --- |
	| Add existing server | `er server add <name> <ip-or-hostname>` |
	| Create Hetzner server | `er server create <name> hetzner` |
	| Show generated SSH key | `er server show-ssh-key <name>` |
	| Test SSH | `er server ssh-connect-test <name> --username <user>` |
	| Initialize web host | `er server init <name> --username <user>` |
	| Run health diagnostics | `er server doctor <name>` |
	| Auto-fix server issues | `er server doctor <name> --fix` |
	| Show operational status | `er server status <name>` |
	| Operational status as JSON | `er server status <name> --json` |
	| Reapply firewall policy | `er server reapply-firewall <name>` |
	| Security scan | `er server security-scan <name>` |
	| Show Caddy logs | `er server logs <name>` |
	| Show Fail2Ban status | `er server fail2ban-status <name>` |

???+ abstract "Apps"

	| Task | Command |
	| --- | --- |
	| Add app (Flow A) | `er app add <app> <server> <repo-url>` |
	| Add app (Flow B) | `er app add <app> <server> --deploy-flow flow_b --compose-file <path>` |
	| Update app | `er app update-details <app> <server> [options]` |
	| Deploy app | `er app deploy <app> <server>` |
	| Deploy branch | `er app deploy <app> <server> --branch <branch>` |
	| Show app details | `er app show-details <app> <server>` |
	| Show app status | `er app status <app> <server>` |
	| App status as JSON | `er app status <app> <server> --json` |
	| Show app logs | `er app logs <app> <server>` |
	| Start app | `er app start <app> <server>` |
	| Stop app | `er app stop <app> <server>` |
	| Restart app | `er app restart <app> <server>` |
	| Remove app | `er app remove <app> <server>` |

??? abstract "App Secrets"

	| Task | Command |
	| --- | --- |
	| Set secret (hidden prompt) | `er app secret set <app> <NAME>` |
	| Set secret from file/stdin | `er app secret set <app> <NAME> --value-file <path>` (`-` reads stdin) |
	| Generate secret | `er app secret generate <app> <NAME>` |
	| Get secret | `er app secret get <app> <NAME>` |
	| List secrets | `er app secret list <app>` |
	| Delete secret | `er app secret delete <app> <NAME>` |
	| Push secrets to destinations | `er app secret push <app> <server>` |

???+ abstract "Control-Plane Backup"

	Backs up EasyRunner's local control-plane state to an encrypted restic repository in Cloudflare R2. See [Control-Plane Backup and Restore](../setup/backup-restore.md).

	| Task | Command |
	| --- | --- |
	| Initialise backup destination | `er backup init [cloudflare-account]` |
	| Run backup now | `er backup run [cloudflare-account]` |
	| Preview backup | `er backup run [cloudflare-account] --dry-run` |
	| Show backup status | `er backup status [cloudflare-account]` |
	| List snapshots | `er backup list [cloudflare-account]` |
	| Restore latest snapshot | `er backup restore [cloudflare-account]` |
	| Restore specific snapshot | `er backup restore [cloudflare-account] --snapshot <id>` |
	| Preview restore | `er backup restore [cloudflare-account] --dry-run` |
	| Force restore over configured host | `er backup restore [cloudflare-account] --force` |
	| Diagnose backup setup | `er backup doctor [cloudflare-account]` |
	| Fix backup prerequisites | `er backup doctor [cloudflare-account] --fix` |

??? abstract "Audit"

	| Task | Command |
	| --- | --- |
	| View audit trail | `er audit` |
	| Show recent N events | `er audit --limit <n>` |
	| Filter by event type | `er audit --event action` |
	| Verify audit chain | `er audit --verify` |
	| View secret-vault audit | `er secrets_vault audit` |
	| Verify secret-vault audit | `er secrets_vault audit --verify` |

??? abstract "Mesh (Secure Access)"

	An optional WireGuard mesh for private admin access and SSH lockdown. Not required for the normal first deployment path — see [Secure Access with the Mesh VPN](../servers/mesh.md).

	| Task | Command |
	| --- | --- |
	| Initialize the local mesh | `er mesh init` |
	| Bring the local interface up | `er mesh up` |
	| Bring the local interface down | `er mesh down` |
	| Join a server to the mesh | `er mesh join <server>` |
	| Remove a server from the mesh | `er mesh leave <server>` |
	| Show mesh status and peers | `er mesh status` |
	| Diagnose mesh health | `er mesh doctor` |
	| Restrict SSH to the mesh | `er mesh lock <server>` |
	| Reopen public SSH | `er mesh unlock <server>` |
