# Flow A: Deploy from Source

Flow A clones your GitHub repo onto the web host and builds the container image there.

```text
GitHub repo -> web host -> podman build -> systemd service -> Caddy HTTPS
```

## Use Flow A When

- You do not have CI publishing container images yet.
- You want the shortest path to a first deployment.
- Your web host has enough CPU/memory to build the image during deploy.

## Prerequisites

```bash
er link github
er link doctor
```

Your repo must contain:

- `Dockerfile` or `Containerfile`
- `.easyrunner/docker-compose-app.yaml`

## Add and Deploy

```bash
er app add my-app my-server git@github.com:yourname/your-repo.git

er app deploy my-app my-server
```

The public domain comes from the `xyz.easyrunner.service.domain` label on each `web` service in `.easyrunner/docker-compose-app.yaml` — see [Domains and HTTPS](dns-https.md).

Deploy a specific branch:

```bash
er app deploy my-app my-server --branch main
```

## What EasyRunner Does

1. Uses GitHub auth to prepare repository access.
2. Connects to the web host over SSH.
3. Pulls or clones the selected branch.
4. Builds the image with Podman.
5. Converts the Compose-format configuration into systemd-managed containers.
6. Provisions DNS (when Cloudflare is linked) and configures Caddy to route each `web` service to its `service.domain`.
7. Starts or restarts the app.

??? question "Build fails on the server"
    Check the deploy output first, then inspect app logs:

    ```bash
    er app logs my-app my-server --lines 200
    ```

    Common causes are missing Dockerfile/Containerfile, wrong build context, dependency install failures, or insufficient server resources.
