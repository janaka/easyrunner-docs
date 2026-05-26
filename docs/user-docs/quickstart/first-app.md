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
brew tap janaka/easyrunner                         # (1)!
brew install easyrunner-cli-beta                   # (2)!
er --version                                       # (3)!
er license install ~/Downloads/easyrunner-license.jwt  # (4)!
er setup --mode server                             # (5)!
```

1. Adds the EasyRunner Homebrew tap.
2. Installs the beta channel. Use the stable channel if you prefer conservative releases.
3. Confirms the CLI is available as `er`.
4. Installs your license file.
5. Stores EasyRunner control-plane state on this machine.

??? note "What is server mode?"
    Server mode means this EasyRunner install stores the control-plane state: servers, apps, links, and secrets. For a first setup, your laptop is a good place for that state.

!!! success "Checkpoint"
  `er --help`, `er license status`, and `er config show` should work before you prepare a web host.

## 2. Prepare a Web Host

=== "New Hetzner server"

    ```bash
  er link hetzner default --api-key <hetzner-api-token>  # (1)!
  er server create my-first-server hetzner               # (2)!
  er server init my-first-server --username root          # (3)!
  er server verify my-first-server                       # (4)!
    ```

  1. Stores a Hetzner API token in your keyring.
  2. Creates and registers a Hetzner server.
  3. Installs the EasyRunner web-host stack.
  4. Checks the server setup.

  !!! info "What happens"
    EasyRunner handles the cloud provisioning step, then the server joins the same web-host lifecycle as any manually provisioned Ubuntu server.

=== "Existing Ubuntu server"

    ```bash
  er server add my-first-server <server-ip>        # (1)!
  er server show-ssh-key my-first-server           # (2)!
  er server init my-first-server --username root   # (3)!
  er server verify my-first-server                 # (4)!
    ```

  1. Registers the Ubuntu server in EasyRunner and creates a dedicated SSH key.
  2. Prints the public key. Add it to `authorized_keys` or your provider's SSH-key UI before initialization.
  3. Installs the EasyRunner web-host stack.
  4. Checks the server setup.

  !!! info "What happens"
    You own the provisioning step. EasyRunner takes over once its generated SSH key can access the server.

## 3. Link GitHub

```bash
er link github  # (1)!
er link status  # (2)!
```

1. Starts GitHub device-flow auth and stores the token in your keyring.
2. Confirms the integration links EasyRunner can use.

EasyRunner uses this link to create repository-specific deploy keys for Flow A deployments.

## 4. Add the App

```bash
er app add my-app my-first-server git@github.com:yourname/your-repo.git --custom-domain app.example.com
```

Use the SSH GitHub URL, not the HTTPS URL.

!!! info "What happens"
    EasyRunner stores the app name, target web host, repo URL, domain, and default deploy-flow settings. It does not deploy yet.

## 5. Add App Configuration to Your Repo

Flow A expects your app repo to contain:

- A `Dockerfile` or `Containerfile`
- `.easyrunner/docker-compose-app.yaml`

Minimal Compose-format app configuration:

```yaml
name: my-app # (1)!
services:
  web: # (2)!
    image: localhost/my-app:latest
    environment:
      - PORT=3000
    restart: unless-stopped
    networks:
      - easyrunner_proxy_network
    labels:
      xyz.easyrunner.appNodeType: web # (3)!
      xyz.easyrunner.appFramework: standardbackend
      xyz.easyrunner.appContainerInternalPort: "3000" # (4)!

networks:
  easyrunner_proxy_network:
    name: easyrunner_proxy_network
    external: true # (5)!
```

1. Use an app-specific project name in the Compose-format file.
2. This service entry is the public web process.
3. Marks the service as publicly routable through Caddy.
4. Must match the port your app listens on inside the container.
5. Connects the service to EasyRunner's proxy network.

Commit and push these files before deploying.

## 6. Point DNS at the Server

Create an `A` record for `app.example.com` pointing at the web host IP.

If Cloudflare is linked and your domain is in that account, EasyRunner can create the record when you add the app.

!!! warning "DNS before certificates"
  Caddy can only issue the certificate after DNS points at the web host and ports `80` and `443` are reachable.

## 7. Deploy

```bash
er app deploy my-app my-first-server
```

EasyRunner clones the repo, builds the container image on the web host, generates systemd units, configures Caddy, and starts the app.

Check it:

```bash
er app status my-app my-first-server          # (1)!
er app logs my-app my-first-server --lines 100  # (2)!
```

1. Checks the generated systemd/container status.
2. Shows recent logs for the app's services.

Your app should be reachable at `https://app.example.com`.

## Next

- [Choose a deploy flow](../concepts/deploy-flows.md)
- [Manage app secrets](../apps/secrets.md)
- [Troubleshooting](../reference/troubleshooting.md)
