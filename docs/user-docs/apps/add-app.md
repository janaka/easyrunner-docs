# Add an App

`er app add` registers a deployable app stack on an EasyRunner web host.

## Flow A App

Flow A builds from a GitHub repo on the web host.

```bash
er app add my-app my-server git@github.com:yourname/your-repo.git \
  --custom-domain app.example.com
```

Options you will commonly use:

| Option | Meaning |
| --- | --- |
| `my-app` | EasyRunner app name. |
| `my-server` | EasyRunner web host name. |
| `git@github.com:...` | SSH repository URL for Flow A. |
| `--custom-domain` | Public domain Caddy will route. |
| `--default-deploy-branch` | Branch to deploy when `er app deploy` has no `--branch`. |

## Flow B App

Flow B pulls a pre-built image from a registry. Create the app, then store the Flow B compose file on the app:

```bash
er app add my-app my-server "" --custom-domain app.example.com
er app update-details my-app my-server \
  --deploy-flow flow_b \
  --compose-file ./docker-compose.yaml
```

The empty repo URL is a current CLI requirement for `er app add`; Flow B does not use it.

## Inspect

```bash
er app list
er app show-details my-app my-server
```
