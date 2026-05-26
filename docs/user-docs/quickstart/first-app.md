# Deploy Your First App

This guide gets you from an installed CLI to one app running over HTTPS on your own server.

!!! info "You need"
    - EasyRunner CLI installed
    - A license file
    - A GitHub repo for your app
    - A domain or subdomain you control
    - Either a Hetzner account or an existing Ubuntu 24.04 server

## 1. Install and Set Up EasyRunner

```bash
brew tap janaka/easyrunner
brew install easyrunner-cli-beta
er --version
er license install ~/Downloads/easyrunner-license.jwt
er setup --mode server
```

??? note "What is server mode?"
    Server mode means this EasyRunner install stores the control-plane state: servers, apps, links, and secrets. For a first setup, your laptop is a good place for that state.

## 2. Prepare a Web Host

=== "New Hetzner server"

    ```bash
    er link hetzner default --api-key <hetzner-api-token>
    er server create my-first-server hetzner
    er server init my-first-server --username root
    er server verify my-first-server
    ```

=== "Existing Ubuntu server"

    ```bash
    er server add my-first-server <server-ip>
    er server show-ssh-key my-first-server
    # Add the printed public key to the server's authorized_keys or cloud SSH-key UI.
    er server init my-first-server --username root
    er server verify my-first-server
    ```

## 3. Link GitHub

```bash
er link github
er link status
```

EasyRunner uses this link to create repository-specific deploy keys for Flow A deployments.

## 4. Add the App

```bash
er app add my-app my-first-server git@github.com:yourname/your-repo.git \
  --custom-domain app.example.com
```

Use the SSH GitHub URL, not the HTTPS URL.

## 5. Add App Configuration to Your Repo

Flow A expects your app repo to contain:

- A `Dockerfile` or `Containerfile`
- `.easyrunner/docker-compose-app.yaml`

Minimal compose shape:

```yaml
name: my-app
services:
  web:
    image: localhost/my-app:latest
    environment:
      - PORT=3000
    restart: unless-stopped
    networks:
      - easyrunner_proxy_network
    labels:
      xyz.easyrunner.appNodeType: web
      xyz.easyrunner.appFramework: standardbackend
      xyz.easyrunner.appContainerInternalPort: "3000"

networks:
  easyrunner_proxy_network:
    name: easyrunner_proxy_network
    external: true
```

Commit and push these files before deploying.

## 6. Point DNS at the Server

Create an `A` record for `app.example.com` pointing at the web host IP.

If Cloudflare is linked and your domain is in that account, EasyRunner can create the record when you add the app.

## 7. Deploy

```bash
er app deploy my-app my-first-server
```

EasyRunner clones the repo, builds the container image on the web host, generates systemd units, configures Caddy, and starts the app.

Check it:

```bash
er app status my-app my-first-server
er app logs my-app my-first-server --lines 100
```

Your app should be reachable at `https://app.example.com`.

## Next

- [Choose a deploy flow](../concepts/deploy-flows.md)
- [Manage app secrets](../apps/secrets.md)
- [Troubleshooting](../reference/troubleshooting.md)
