# App Secrets

App secrets are per-app values stored in your local system keyring and injected during deploy.

## Set a Secret

```bash
er app secret set my-app DATABASE_URL
```

The CLI prompts for the value with hidden input so it does not appear in shell history.

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

!!! note "Listing support"
    Listing secret names depends on OS keyring support and is best supported on macOS.

## Reserved EasyRunner Secrets

Secrets beginning with `EASYRUNNER_` are reserved for EasyRunner itself. They are stored like other app secrets but are not exposed to the running container.

Current reserved examples for GHCR Flow B pulls:

```bash
er app secret set my-app EASYRUNNER_GHCR_USERNAME
er app secret set my-app EASYRUNNER_GHCR_PAT
```

## Runtime Injection

Non-reserved app secrets are made available to your containers during deployment. Keep sensitive values out of Compose-format files and source control; store them as app secrets instead.

## Rotation

To rotate a secret, set it again and redeploy:

```bash
er app secret set my-app SESSION_SECRET
er app deploy my-app my-server
```
