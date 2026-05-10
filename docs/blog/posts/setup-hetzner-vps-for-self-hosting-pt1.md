---
title: "Manually Set Up a Hetzner VPS for Self-Hosting, Pt 1: Base Web Host"
date: 2025-11-05
authors:
  - janaka
categories:
  - guides
tags:
  - hetzner
  - self-hosting
  - ubuntu
  - podman
  - caddy
slug: manually-setup-hetzner-vps-for-self-hosting
---
A slightly opinionated guide to turning a small Hetzner VPS into a clean base host for self-hosted apps. In this first part we will create the server, point a domain at it, install Podman and Caddy, and get a test app online over HTTPS.
<!-- more -->

If you plan to use EasyRunner, this is a useful exercise because it shows the moving parts EasyRunner is managing for you.

This post is about building a solid starting point, not fully locking the server down. [Part 2](setup-hetzner-vps-for-self-hosting-pt2.md) will cover automated deployment, and Part 3 will cover security hardening.

!!! note
    We will make a few sensible choices here, like using a non-root user and keeping the public surface area small. We are intentionally leaving stricter SSH policy, intrusion protection, update strategy, backup policy, and deeper hardening for Part 3.

## Prerequisites

- Hetzner account
- A domain name you control
- An SSH key on your laptop or workstation
- About 30 to 45 minutes

## What You Will Have At The End

- A Hetzner Cloud VPS running Ubuntu LTS
- A simple Hetzner firewall in front of it
- A non-root user for day-to-day admin work
- Podman installed for running containers
- Caddy installed as a reverse proxy with automatic HTTPS
- A small test app reachable at your domain

That is enough for a small self-hosted app, a side project API, or a static frontend backed by containers.

## Architecture

- DNS points your domain to the VPS
- Hetzner Firewall allows only the traffic you actually need
- Ubuntu runs Caddy and Podman
- Caddy terminates HTTPS and forwards traffic to containers on localhost

In plain English, the request flow looks like this:

```text
Browser -> DNS -> Hetzner Firewall -> Caddy -> Container on 127.0.0.1:8080
```

That separation matters because it keeps your app container off the public internet. Only Caddy is exposed.

## 1. Create Or Reuse An SSH Key

If you already use SSH keys for GitHub or other servers, you can usually reuse an existing key pair.

If not, generate one on your machine:

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

This will usually create:

- `~/.ssh/id_ed25519` as your private key
- `~/.ssh/id_ed25519.pub` as your public key

Keep the private key private. You will upload only the `.pub` file to Hetzner.

## 2. Create A Small Hetzner Firewall

Before you create the server, create a firewall in Hetzner Cloud and attach it during provisioning.

Use rules like these:

| Direction | Protocol | Port | Source | Why |
| --- | --- | --- | --- | --- |
| Inbound | TCP | 22 | Your current public IP | SSH access |
| Inbound | TCP | 80 | 0.0.0.0/0 | HTTP for redirects and ACME challenges |
| Inbound | TCP | 443 | 0.0.0.0/0 | HTTPS traffic |
| Outbound | Any | Any | 0.0.0.0/0 | Package installs, DNS, image pulls |

If your home IP changes often, start with a temporary wider SSH rule, then tighten it later. We will revisit that in Part 3.

## 3. Create The Server In Hetzner Cloud

In the Hetzner Cloud console:

1. Create a new project if you do not already have one.
2. Create a new server.
3. Choose the latest Ubuntu LTS image.
4. Pick a small shared instance to start. For many side projects, a basic 2 vCPU box is enough.
5. Add the SSH public key from the previous step.
6. Attach the firewall you just created.
7. Give the server a clear name such as `app-prod-1`.

Once the server is created, note its public IPv4 address.

Connect as root for the very first bootstrapping steps:

```bash
ssh root@your_server_ip
```

## 4. Do First-Boot Housekeeping

Update the box first. On a brand new server, this is the fastest way to avoid working against stale packages.

```bash
apt update && apt upgrade -y
```

Set a hostname that makes sense when you see it in logs or your prompt:

```bash
hostnamectl set-hostname app-prod-1
```

Now create a normal admin user. I will call it `deploy`, but use any name you like.

```bash
adduser deploy
usermod -aG sudo deploy
install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
cp /root/.ssh/authorized_keys /home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys
```

Open a second terminal and make sure that new user can log in before you end the root session:

```bash
ssh deploy@your_server_ip
```

For now, keep root access available until you are sure your normal admin flow works. We will tighten that in Part 3.

## 5. Point Your Domain At The Server

In your DNS provider:

- Create an `A` record for the root domain, such as `example.com`, pointing to the server IPv4 address
- Create a `CNAME` for `www` pointing to the root domain, if you want both names to work

Give DNS a few minutes, then verify from your machine:

```bash
dig +short example.com
dig +short www.example.com
```

If those commands return the server IP, you are ready for HTTPS setup.

## 6. Install Podman

Log in as your normal user and install Podman:

```bash
sudo apt install -y podman
podman --version
```

Why Podman?

- It runs containers without requiring a long-running daemon
- It works well for small self-hosted setups
- Running containers as your normal user is a good default

Pull a small image now so you know container networking works:

```bash
podman pull docker.io/library/nginx:alpine
```

## 7. Install Caddy

Caddy is a very nice fit for self-hosting because it handles HTTPS automatically and keeps the config small.

Install the official package:

```bash
sudo apt install -y curl gnupg debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list > /dev/null
sudo apt update
sudo apt install -y caddy
```

Check that the service is running:

```bash
sudo systemctl status caddy
```

You do not need to configure certificates manually. Once DNS is correct and ports `80` and `443` are reachable, Caddy will request and renew certificates for you.

## 8. Run A Tiny Test App In Podman

Before you deploy a real project, prove the plumbing with something very small.

Create a basic static page:

```bash
mkdir -p "$HOME/apps/hello/html"
cat > "$HOME/apps/hello/html/index.html" <<'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello from Hetzner</title>
  </head>
  <body>
    <h1>Hello from Hetzner</h1>
    <p>If you can read this, Podman and Caddy are wired correctly.</p>
  </body>
</html>
EOF
```

Run Nginx behind localhost-only port `8080`:

```bash
podman run -d \
  --name hello-site \
  -p 127.0.0.1:8080:80 \
  -v "$HOME/apps/hello/html:/usr/share/nginx/html:ro" \
  docker.io/library/nginx:alpine
```

Check it locally on the server:

```bash
curl http://127.0.0.1:8080
```

If you get the HTML back, the container side is working.

## 9. Put Caddy In Front Of It

Replace the default Caddy config with a simple reverse proxy:

```bash
sudo tee /etc/caddy/Caddyfile > /dev/null <<'EOF'
example.com, www.example.com {
    encode zstd gzip
    reverse_proxy 127.0.0.1:8080
}
EOF
```

Validate the config and reload Caddy:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Now test from your machine:

```bash
curl -I https://example.com
```

If everything is lined up, Caddy will obtain a certificate automatically and you should see an HTTP `200` or `301` style response over HTTPS.

Open the domain in your browser as well. A browser test catches a surprising number of mistakes quickly.

## 10. What We Deliberately Did Not Do Yet

At this point you have a working base host, but it is still just that: a base host.

We have not yet covered:

- SSH hardening and disabling root login
- Automatic security updates and patch policy
- Backups and restore testing
- Monitoring and alerting
- Container restart policy and automated deploys

That is intentional.

[Part 2](setup-hetzner-vps-for-self-hosting-pt2.md) will turn this into a repeatable deployment flow. Part 3 will focus on hardening the server once the happy path is already working.

## Troubleshooting

### Caddy Does Not Get A Certificate

Usually one of these is wrong:

- DNS has not propagated yet
- Port `80` or `443` is blocked by the Hetzner firewall
- The domain is pointing to a different server than the one running Caddy

### SSH Works For Root But Not For The New User

Check these first:

- `/home/deploy/.ssh` is `700`
- `/home/deploy/.ssh/authorized_keys` is `600`
- The file is owned by `deploy:deploy`

### The Container Works On `127.0.0.1:8080` But The Domain Returns `502`

That usually means Caddy is fine, but the backend target is wrong or the container is not running.

Useful checks:

```bash
podman ps
curl http://127.0.0.1:8080
sudo journalctl -u caddy -n 50 --no-pager
```

## Wrap Up

You now have a clean, understandable baseline for self-hosting on Hetzner:

- a small VPS
- a narrow firewall
- a normal admin user
- Podman for containers
- Caddy for HTTPS and reverse proxying

This is exactly the point where manual infrastructure starts to become repetitive. That is why the next step is automation, not more clicking around in dashboards.

Continue with [Part 2](setup-hetzner-vps-for-self-hosting-pt2.md) when you are ready to automate deployments. We will come back for hardening in Part 3.

## Setup steps