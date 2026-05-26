# CLI Command Reference

This is a task-oriented map of common EasyRunner commands. Use `--help` on any command for current options.

```bash
er --help         # (1)!
er server --help  # (2)!
er app --help     # (3)!
```

1. Top-level CLI help and global options.
2. Web-host/server commands.
3. App deployment and operations commands.

???+ abstract "Setup"

	| Task | Command |
	| --- | --- |
	| First-run setup | `er setup` |
	| Non-interactive server mode setup | `er setup --mode server` |
	| Show config | `er config show` |
	| Run local checks | `er doctor` |

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
	| Show all link status | `er link status` |

???+ abstract "Servers"

	| Task | Command |
	| --- | --- |
	| Add existing server | `er server add <name> <ip-or-hostname>` |
	| Create Hetzner server | `er server create <name> hetzner` |
	| Show generated SSH key | `er server show-ssh-key <name>` |
	| Test SSH | `er server ssh-connect-test <name> --username <user>` |
	| Initialize web host | `er server init <name> --username <user>` |
	| Verify web host | `er server verify <name>` |
	| Show Caddy logs | `er server logs <name>` |
	| Show Fail2Ban status | `er server fail2ban-status <name>` |

???+ abstract "Apps"

	| Task | Command |
	| --- | --- |
	| Add app | `er app add <app> <server> <repo-url> --custom-domain <domain>` |
	| Update app | `er app update-details <app> <server> [options]` |
	| Deploy app | `er app deploy <app> <server>` |
	| Deploy branch | `er app deploy <app> <server> --branch <branch>` |
	| Show app details | `er app show-details <app> <server>` |
	| Show app status | `er app status <app> <server>` |
	| Show app logs | `er app logs <app> <server>` |
	| Start app | `er app start <app> <server>` |
	| Stop app | `er app stop <app> <server>` |
	| Restart app | `er app restart <app> <server>` |
	| Remove app | `er app remove <app> <server>` |

??? abstract "App Secrets"

	| Task | Command |
	| --- | --- |
	| Set secret | `er app secret set <app> <NAME>` |
	| Generate secret | `er app secret generate <app> <NAME>` |
	| Get secret | `er app secret get <app> <NAME>` |
	| List secrets | `er app secret list <app>` |
	| Delete secret | `er app secret delete <app> <NAME>` |

??? abstract "Advanced"

	Mesh commands are advanced and not required for the normal first deployment path:

	```bash
	er mesh --help
	```
