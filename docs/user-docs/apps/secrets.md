# App Secrets

App secrets are per-app values stored in EasyRunner's encrypted secrets vault and injected during deploy.

The vault is designed to keep the same security posture while avoiding prompt fatigue. On macOS, commands that need several secrets use one master-key access path instead of triggering an approval prompt for every individual key. Operations that reveal or export sensitive material still require user presence when the configured unlock window has expired.

## Set a Secret

```bash
er app secret set my-app DATABASE_URL
```

With no value flag, the CLI prompts for the value with hidden input so it does not appear in shell history. You can also supply the value non-interactively:

=== "Hidden prompt (default)"

    ```bash
    er app secret set my-app DATABASE_URL
    ```

    Best for typing a value by hand — it never reaches your shell history.

=== "From a file"

    ```bash
    er app secret set my-app SERVICE_ACCOUNT_JSON --value-file ./service-account.json
    ```

    Reads the value from a file. Use this for **large or multi-line secrets**
    (e.g. JSON keys) that exceed the hidden prompt's ~1024-byte single-line
    limit. A single trailing newline is stripped.

=== "From stdin"

    ```bash
    jq -c . service-account.json | er app secret set my-app SERVICE_ACCOUNT_JSON --value-file -
    ```

    `--value-file -` reads from stdin, so you can pipe a value in from another
    command without it touching disk.

=== "Inline (discouraged)"

    ```bash
    er app secret set my-app DATABASE_URL --value "postgres://..."
    ```

    `--value`/`-v` is convenient in scripts but the value is visible in shell
    history and process listings — prefer `--value-file` for anything sensitive.

## Generate a Secret

```bash
er app secret generate my-app SESSION_SECRET --length 48
```

Use generated secrets for tokens, session keys, and app-specific random values.

## Read, List, Delete

```bash
er app secret get my-app DATABASE_URL
er app secret list my-app
er app secret delete my-app DATABASE_URL
```

`list` shows each secret name alongside a **masked preview** of its value — the last 4 characters, with short values fully masked — so you can tell two secrets apart or confirm a rotation without revealing the full value:

```text
DATABASE_URL       ••••••6f3a
SESSION_SECRET     ••••••••
```

!!! note "Secret values stay hidden"
    The `list` preview never shows the full value. Use `get` only when you
    intentionally need to reveal one. Listing previews are supported on macOS;
    on other platforms `list` returns an empty result.

## Push Secrets to Their Destinations

Use `push` when you want EasyRunner to sync all secrets for an app to the places that need them:

```bash
er app secret push my-app my-server
```

The push command routes secrets by name:

| Secret name | Destination |
| --- | --- |
| `DATABASE_URL`, `SESSION_SECRET`, etc. | The web host, as Podman secrets for the app. |
| `GH_SECRET_<NAME>` | GitHub Actions repository secret named `<NAME>`. |
| `EASYRUNNER_*` | Skipped. These are reserved for EasyRunner itself. |

For GitHub Actions sync, the app must have a repository URL and GitHub must be linked:

```bash
er link github
er app secret set my-app GH_SECRET_DEPLOY_TOKEN
er app secret push my-app my-server
```

This keeps CI/build-time secrets and runtime secrets out of source control without copying values through the browser.

## Reserved EasyRunner Secrets

Secrets beginning with `EASYRUNNER_` are reserved for EasyRunner itself. They are stored like other app secrets but are not exposed to the running container.

Current reserved examples for GHCR Flow B pulls:

```bash
er app secret set my-app EASYRUNNER_GHCR_USERNAME
er app secret set my-app EASYRUNNER_GHCR_PAT
```

!!! note "Reserved secrets vs. injected metadata"
    This reserved rule is about secrets *you set*. Separately, EasyRunner *injects* its own read-only `EASYRUNNER_*` metadata variables (such as `EASYRUNNER_APP_URL`) into your container at deploy time. Those are provided by EasyRunner, not secrets you manage. See [Auto-Injected Environment Variables](../reference/compose-labels.md#auto-injected-environment-variables).

## Runtime Injection

Non-reserved app secrets are made available to your containers during deployment. Keep sensitive values out of Compose-format files and source control; store them as app secrets instead.

Sensitive reads are gated. Commands such as `er app secret get`, `er app secret generate`, `er backup init`, `er backup run`, and `er server run-sudo` may ask for Touch ID or your device password on macOS when the unlock window has expired. The default unlock window is **60 minutes** — a successful presence check keeps subsequent sensitive commands uninterrupted for that period.

## Rotation

To rotate a secret, set it again and redeploy:

```bash
er app secret set my-app SESSION_SECRET
er app deploy my-app my-server
```

If the app is already deployed and you only need to refresh stored secrets on the host or in GitHub Actions, use:

```bash
er app secret push my-app my-server
```
