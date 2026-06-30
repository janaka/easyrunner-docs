# Add an App

`er app add` registers a deployable app stack on an EasyRunner web host.

## Flow A App

Flow A builds from a GitHub repo on the web host.

```bash
er app add my-app my-server git@github.com:yourname/your-repo.git
```

Options you will commonly use:

| Option | Meaning |
| --- | --- |
| `my-app` | EasyRunner app name. |
| `my-server` | EasyRunner web host name. |
| `git@github.com:...` | SSH repository URL for Flow A. |
| `--default-deploy-branch` | Branch to deploy when `er app deploy` has no `--branch`. |
| `--description` | Short, one-line description of the app. |

!!! info "Domains are not set here"
    Public domains are declared **per web service** in the compose file via the
    `xyz.easyrunner.service.domain` label — there is no `--custom-domain` flag.
    DNS is provisioned at `er app deploy`. See
    [Domains and HTTPS](dns-https.md).

## Flow B App

Flow B pulls a pre-built image from a registry. Register the app, then store the Flow B Compose-format file on it:

```bash
er app add my-app my-server --deploy-flow flow_b

er app update-details my-app my-server \
  --compose-file ./docker-compose.yaml
```

You can also snapshot the compose file in a single step:

```bash
er app add my-app my-server \
  --deploy-flow flow_b \
  --compose-file ./docker-compose.yaml
```

The repo URL is optional for Flow B — omit it. (Flow A still requires one.)

## Inspect

```bash
er app list
er app show-details my-app my-server
```
