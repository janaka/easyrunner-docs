---
title: "Manually Set Up a Hetzner VPS for Self-Hosting, Pt 2: Automated Deployment"
date: 2025-11-05
authors:
  - janaka
categories:
  - guides
tags:
  - hetzner
  - self-hosting
  - github-actions
  - podman
  - caddy
slug: manually-setup-hetzner-vps-for-self-hosting-pt2-automated-deployment
---
In [Part 1](setup-hetzner-vps-for-self-hosting-pt1.md) we built the base host: Ubuntu, Podman, Caddy, and a domain serving traffic over HTTPS. In this part we will automate deployments so a merge to `main` pushes your latest code onto the server and restarts the app.
<!-- more -->

This is intentionally a simple pipeline. GitHub Actions will upload the source code to the server over SSH, the server will build the container locally with Podman, and systemd will keep the app running. It is not the fanciest setup, but it is very easy to understand and debug.

If you plan to use EasyRunner, this is useful background because it shows the kind of deploy flow a tool like EasyRunner is abstracting.

!!! note
    We are still not doing the full security pass here. We will make a few good choices, like keeping runtime secrets on the server and pinning the SSH host key in GitHub Actions, but the broader hardening pass is for Part 3.

Before we start, I will use `myapp` as the app name and `3000` as the application port. Replace those with your real values.

## Prerequisites

- A server configured from [Part 1](setup-hetzner-vps-for-self-hosting-pt1.md)
- A GitHub repository for your app
- A `Containerfile` or `Dockerfile` in that repo
- An app that listens on a known port inside the container
- A non-root deploy user on the server, such as `deploy`

## What You Will Have At The End

- A GitHub Actions workflow that runs CI on branches and pull requests
- A deployment workflow that runs only on pushes to `main`
- Runtime environment variables stored on the server instead of in the repo
- A systemd user service that keeps your container running across restarts
- A simple rollback path based on previous release directories

## Architecture

- Your app code lives in GitHub
- GitHub Actions runs CI on every branch push and pull request
- A push to `main` uploads a release bundle to the server over SSH
- The server builds the image with Podman and restarts the app service
- Caddy keeps handling HTTPS and reverse proxying

In plain English, the deploy flow looks like this:

```text
git push -> GitHub Actions -> upload release over SSH -> Podman build -> systemd restart -> Caddy -> browser
```

That gives you a workflow that is easy to reason about with only one trust boundary in the middle: GitHub Actions talking to your server over SSH.

## 1. Decide On The Deployment Shape

There are many ways to automate deployment. You could build images in CI, push them to a registry, and then pull them on the server. That is a good pattern, but it adds a registry and more credentials.

For a single VPS, a simpler approach is often better:

- GitHub Actions uploads the source code to the server
- The server builds the image locally with Podman
- systemd restarts the container

This is slower than prebuilding an image in CI, but it is much easier to inspect when something breaks.

## 2. Prepare A Home For The App On The Server

Log in as your normal deploy user and create a small directory layout:

```bash
mkdir -p "$HOME/apps/myapp/releases"
mkdir -p "$HOME/apps/myapp/shared"
mkdir -p "$HOME/.config/systemd/user"
```

I like this layout because it separates concerns cleanly:

- `releases/` holds each uploaded version of the app
- `shared/` holds runtime data that should survive deployments, like `.env`
- the systemd service lives in the user config directory

One more setup step makes user services survive reboots:

```bash
sudo loginctl enable-linger deploy
```

Run that once, replacing `deploy` with your actual username if needed.

## 3. Put Runtime Configuration On The Server

Keep runtime secrets on the server, not in GitHub Actions and not in the repo.

Create an environment file:

```bash
cat > "$HOME/apps/myapp/shared/.env" <<'EOF'
APP_ENV=production
PORT=3000
EOF
```

Add whatever your app really needs here, for example:

- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET`
- third-party API keys

This is a small but important separation. GitHub Actions is responsible for shipping code. The server is responsible for holding runtime secrets.

## 4. Create A systemd User Service For The App

We want the app to come back after a reboot and to restart cleanly after each deployment. systemd is the simplest reliable way to do that.

Create `~/.config/systemd/user/myapp.service`:

```ini
[Unit]
Description=MyApp container
After=network-online.target
Wants=network-online.target

[Service]
Restart=always
RestartSec=5
TimeoutStopSec=20
ExecStartPre=-/usr/bin/podman rm -f myapp
ExecStart=/usr/bin/podman run --name myapp --env-file /home/deploy/apps/myapp/shared/.env -p 127.0.0.1:3000:3000 localhost/myapp:latest
ExecStop=/usr/bin/podman stop -t 10 myapp

[Install]
WantedBy=default.target
```

Why run the app this way?

- systemd gives you restart behavior and logs
- Podman still runs the actual container
- the app stays bound to `127.0.0.1`, so only Caddy is public

If your app needs volume mounts, extra ports, or different environment files, add those flags to the `ExecStart` line.

Load the unit and enable it:

```bash
systemctl --user daemon-reload
systemctl --user enable myapp.service
```

Do not worry if it is not running yet. The image does not exist until the first deployment.

## 5. Create The Server-Side Deploy Script

Now create the script GitHub Actions will call on each deployment.

Save this as `~/apps/myapp/deploy.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

APP_NAME="myapp"
APP_DIR="$HOME/apps/$APP_NAME"
RELEASE_ID="${1:?release id is required}"
RELEASE_DIR="$APP_DIR/releases/$RELEASE_ID"

if [ ! -d "$RELEASE_DIR" ]; then
  echo "Release directory not found: $RELEASE_DIR" >&2
  exit 1
fi

ln -sfn "$RELEASE_DIR" "$APP_DIR/current"

cd "$APP_DIR/current"
podman build -t "localhost/$APP_NAME:$RELEASE_ID" -t "localhost/$APP_NAME:latest" .

systemctl --user daemon-reload
systemctl --user restart "$APP_NAME.service"
systemctl --user --no-pager --full status "$APP_NAME.service"
```

Make it executable:

```bash
chmod +x "$HOME/apps/myapp/deploy.sh"
```

This script does four things:

1. It picks the uploaded release directory based on the commit SHA.
2. It updates a `current` symlink to point at that release.
3. It builds a local Podman image tagged both with the commit SHA and `latest`.
4. It restarts the systemd user service.

If your app needs database migrations, this script is the right place to run them just before the service restart.

## 6. Point Caddy At The Real App

In Part 1 we pointed Caddy at a tiny test container. Now swap that to your real app port.

For example:

```bash
sudo tee /etc/caddy/Caddyfile > /dev/null <<'EOF'
example.com, www.example.com {
    encode zstd gzip
    reverse_proxy 127.0.0.1:3000
}
EOF
```

Validate and reload Caddy:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

If you still have the Part 1 demo container running, clean it up:

```bash
podman rm -f hello-site
```

## 7. Add Deployment Secrets In GitHub

In your GitHub repository settings, add these Actions secrets:

- `DEPLOY_HOST`: your server IP or DNS name
- `DEPLOY_USER`: your server user, for example `deploy`
- `DEPLOY_SSH_PRIVATE_KEY`: the private key GitHub Actions will use to SSH to the server
- `DEPLOY_KNOWN_HOSTS`: the pinned SSH host key entry for that server

From a trusted machine, you can get the host key entry like this:

```bash
ssh-keyscan -H your_server_ip
```

Paste that exact output into the `DEPLOY_KNOWN_HOSTS` secret.

For the deploy key pair itself, create a dedicated SSH key just for GitHub Actions rather than reusing your personal admin key:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ./github-actions-deploy
```

Then:

- add the public key to `/home/deploy/.ssh/authorized_keys` on the server
- store the private key contents in `DEPLOY_SSH_PRIVATE_KEY`

That keeps the blast radius smaller if you ever need to rotate this credential.

## 8. Add A GitHub Actions Workflow

Create `.github/workflows/deploy.yml` in your app repository:

```yaml
name: ci-cd

on:
  pull_request:
  push:

concurrency:
  group: ci-cd-${{ github.ref }}
  cancel-in-progress: true

jobs:
  ci:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Build container image
        run: docker build -t myapp-ci .

  deploy:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    needs: ci
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Configure SSH
        run: |
          install -m 700 -d ~/.ssh
          printf '%s\n' "${{ secrets.DEPLOY_SSH_PRIVATE_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          printf '%s\n' "${{ secrets.DEPLOY_KNOWN_HOSTS }}" > ~/.ssh/known_hosts

      - name: Upload release bundle
        env:
          DEPLOY_HOST: ${{ secrets.DEPLOY_HOST }}
          DEPLOY_USER: ${{ secrets.DEPLOY_USER }}
          RELEASE_ID: ${{ github.sha }}
        run: |
          ssh "$DEPLOY_USER@$DEPLOY_HOST" "mkdir -p ~/apps/myapp/releases/$RELEASE_ID"
          git archive --format=tar HEAD \
            | gzip \
            | ssh "$DEPLOY_USER@$DEPLOY_HOST" \
                "tar -xzf - -C ~/apps/myapp/releases/$RELEASE_ID"

      - name: Build and restart on server
        env:
          DEPLOY_HOST: ${{ secrets.DEPLOY_HOST }}
          DEPLOY_USER: ${{ secrets.DEPLOY_USER }}
          RELEASE_ID: ${{ github.sha }}
        run: |
          ssh "$DEPLOY_USER@$DEPLOY_HOST" "~/apps/myapp/deploy.sh $RELEASE_ID"
```

This gives you the behavior we wanted:

- every pull request gets a CI run
- every branch push gets a CI run
- every push to `main` gets CI and then deployment

Why use `docker build` in CI when the server uses Podman? Because GitHub-hosted runners already have Docker available, and both Docker and Podman build OCI-compatible images. For a simple build check, that is perfectly fine.

Replace these values for your own app:

- `myapp`
- `3000`
- `main`, if you use a different default branch
- the build command if your `Containerfile` is not at the repo root

If you already have real test commands, add them to the `ci` job before or after the image build.

## 9. Test The Whole Flow

The cleanest way to test this is with a small harmless change.

1. Make a visible change in the app.
2. Open a pull request and confirm the `ci` job passes.
3. Merge into `main`.
4. Watch the `deploy` job run in GitHub Actions.
5. Visit your site and confirm the new version is live.

Useful checks on the server:

```bash
systemctl --user status myapp.service
podman ps
podman logs myapp --tail 50
curl http://127.0.0.1:3000
sudo journalctl -u caddy -n 50 --no-pager
```

## 10. Roll Back If You Need To

One nice side effect of storing releases by commit SHA is that rollback is simple.

If a previous deployment is still present in `~/apps/myapp/releases`, you can redeploy it directly:

```bash
~/apps/myapp/deploy.sh previous_commit_sha
```

That rebuilds the app from the older release directory and restarts the service.

For a small single-server setup, that is often good enough. You do not need a complicated rollout system on day one.

## 11. What We Are Deliberately Not Doing Yet

This pipeline is useful, but it is still the pragmatic version.

We have not yet covered:

- stricter SSH policy and key rotation
- running builds from a container registry instead of source uploads
- multi-server deployments
- zero-downtime deploy strategies
- deeper secret management
- automatic backup and restore flows

That is intentional. The goal here is to get from manual deploys to repeatable deploys without turning the setup into a science project.

Part 3 will cover the security hardening side in more detail.

## Troubleshooting

### The GitHub Action Cannot SSH Into The Server

Check these first:

- the public half of the deploy key is present in `/home/deploy/.ssh/authorized_keys`
- `DEPLOY_USER` and `DEPLOY_HOST` are correct
- `DEPLOY_KNOWN_HOSTS` matches the actual server host key

### The Deploy Job Passes But The Site Returns `502`

That usually means Caddy is fine and the app is not listening where Caddy expects it.

Check these:

- the app really listens on port `3000` inside the container
- the systemd service publishes `127.0.0.1:3000:3000`
- Caddy reverse proxies to `127.0.0.1:3000`

### The Service Restarts But The Container Fails Immediately

Usually that means one of three things:

- a missing environment variable
- the image built successfully but the app startup command is wrong
- the app now requires a migration or dependency that is not available

The fastest checks are:

```bash
systemctl --user status myapp.service
podman logs myapp --tail 100
```

## Wrap Up

You now have a deployment flow that is boring in a good way:

- GitHub runs CI on code changes
- a push to `main` uploads a release to the server
- Podman builds the new image locally
- systemd restarts the app
- Caddy keeps serving HTTPS at the edge

This is a strong place to be for a side project or early product. It is automated, understandable, and still small enough that you can debug every moving part yourself.

The next step is not more deployment complexity. The next step is hardening the host and the deploy path, which we will cover in Part 3.
