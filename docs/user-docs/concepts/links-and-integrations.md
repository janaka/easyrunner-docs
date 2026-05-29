# Links and Integrations

A **link** is a stored connection to an external service. EasyRunner stores the credential securely through your system keyring and uses it only when needed.

| Integration | Command | Why link it |
| --- | --- | --- |
| GitHub | `er link github` | Let EasyRunner create repository deploy keys for Flow A deployments. |
| Hetzner | `er link hetzner <project> --api-key <token>` | Let EasyRunner create servers in your Hetzner Cloud project. |
| Cloudflare | `er link cloudflare <account> --api-token <token>` | Let EasyRunner create or update DNS records for app domains. |

Check all links:

```bash
er link doctor
```

!!! note "Link is the command, integration is the concept"
    The CLI uses `er link ...` because linking is the action. These docs use "integrations" when talking about the external services themselves.
