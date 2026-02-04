---
title: Deploying OpenClaw on EasyRunner
date: 2026-02-02
authors:
  - janaka
categories:
  - guides
tags:
  - deployment
  - openclaw
  - hetzner
slug: deploying-openclaw-with-easyrunner
---
An experiment deploying OpenClaw to a Hetzner server managed by EasyRunner.
<!-- more -->

This guide covers deploying OpenClaw to a server managed by [EasyRunner](https://easyrunner.xyz), a self-hosted PaaS that uses Podman containers with Caddy as a reverse proxy.

Email janaka@easyrunner.xyz if you want to alpha test using EasyRunner to install OpenClaw on a VPS.

## Prerequisites

- EasyRunner CLI installed (`pip install easyrunner`)
- A server registered with EasyRunner (`er server add`)
- Domain configured to point to your server (EasyRunner handles TLS via Caddy)

## Quick Start

### 1. Clone the Repository

This guide uses my fork which includes Dockerfile modifications for EasyRunner/Podman compatibility:

```bash
git clone https://github.com/janaka/moltbot.git
cd moltbot
```

### 2. Create EasyRunner App Configuration

Create `.easyrunner/docker-compose-app.yaml`:

```yaml
name: easyrunner
services:
  openclaw-gateway:
    image: localhost/openclaw:latest
    environment:
      - NODE_ENV=production
      - HOME=/home/node
      - TERM=xterm-256color
      # Gateway token for authentication (use hex characters only)
      - OPENCLAW_GATEWAY_TOKEN=your-secure-token-here
      # State directory must match volume mount
      - OPENCLAW_STATE_DIR=/home/node/.openclaw
    restart: unless-stopped
    networks:
      - easyrunner_proxy_network
    labels:
      xyz.easyrunner.appFramework: standardbackend
      xyz.easyrunner.appIsPublic: true
      xyz.easyrunner.appContainerInternalPort: 18789
    volumes:
      # Persistent state - :U flag handles Podman user mapping
      - openclaw_state:/home/node/.openclaw:U

volumes:
  openclaw_state:
    driver: local

networks:
  easyrunner_proxy_network:
    name: easyrunner_proxy_network
    external: true
    driver: bridge
```

### 3. Generate a Secure Token

Generate a hex-only token (avoids shell encoding issues):

```bash
openssl rand -hex 32
```

Update `OPENCLAW_GATEWAY_TOKEN` in your compose file with the generated token.

### 4. Register and Deploy

```bash
# Register the app with EasyRunner
er app add openclaw . --server your-server-name

# Deploy
er app deploy openclaw your-server-name
```

### 5. Access the Control UI

Open `https://your-domain.com` in your browser. Enter your gateway token when prompted.

## Configuration

### Initial Configuration

On first start, the container automatically creates a minimal config at `/home/node/.openclaw/openclaw.json` with:

- `gateway.mode: "local"` - Required for gateway to start
- `trustedProxies` - Docker/Podman network ranges for proper client IP detection
- `dangerouslyDisableDeviceAuth: true` - Allows Control UI access through reverse proxy
- `plugins.slots.memory: "none"` - Disables the default memory plugin (not bundled)

### Modifying Configuration

**Option 1: Via Control UI**

The web interface at your domain provides a settings panel for most configuration options.

**Option 2: SSH into Container**

```bash
ssh your-user@your-server
podman exec -it systemd-easyrunner__openclaw-gateway \
  node dist/index.js config set agents.defaults.model anthropic/claude-sonnet-4
```

**Option 3: Edit Config File Directly**

```bash
ssh your-user@your-server
vim ~/.local/share/containers/storage/volumes/openclaw_state/_data/openclaw.json
systemctl --user restart easyrunner__openclaw-gateway.service
```

### Adding API Keys

Set your AI provider credentials via environment variables in the compose file:

```yaml
environment:
  - ANTHROPIC_API_KEY=sk-ant-...
  - OPENAI_API_KEY=sk-...
```

Or configure through the Control UI settings panel.

## Connecting Channels

### Telegram

1. Create a bot via [@BotFather](https://t.me/BotFather)
2. Add the token in Control UI → Channels → Telegram
3. Or set `TELEGRAM_BOT_TOKEN` environment variable

### Discord

1. Create a Discord application at [discord.com/developers](https://discord.com/developers/applications)
2. Enable Message Content Intent under Bot settings
3. Add the bot token in Control UI → Channels → Discord

### WhatsApp (via WhatsApp Web)

1. Open Control UI → Channels → WhatsApp
2. Scan the QR code with your phone

## Maintenance

### View Logs

```bash
ssh your-user@your-server
podman logs -f systemd-easyrunner__openclaw-gateway
```

Or via journalctl:

```bash
journalctl --user -u easyrunner__openclaw-gateway.service -f
```

### Restart the Gateway

```bash
ssh your-user@your-server
systemctl --user restart easyrunner__openclaw-gateway.service
```

### Update to Latest Version

```bash
# Pull latest code
cd openclaw
git pull

# Redeploy
er app deploy openclaw your-server-name
```

### Backup State

The persistent volume contains sessions, credentials, and configuration:

```bash
ssh your-user@your-server
tar -czvf openclaw-backup.tar.gz \
  ~/.local/share/containers/storage/volumes/openclaw_state/_data/
```

## Troubleshooting

### 502 Bad Gateway

The gateway container isn't running or isn't listening on the expected port.

```bash
# Check container status
ssh your-user@your-server
systemctl --user status easyrunner__openclaw-gateway.service

# Check logs for errors
podman logs systemd-easyrunner__openclaw-gateway
```

### "Plugin not found: memory-core"

The default memory plugin isn't available in the container. Ensure your config has:

```json
{
  "plugins": {
    "slots": {
      "memory": "none"
    }
  }
}
```

### "Missing workspace template" Error

The `/app/docs` directory isn't readable. This is fixed in recent versions. Redeploy to get the fix.

### Authentication Issues

1. Verify the token matches between your compose file and what you enter in the UI
2. Use hex-only tokens (letters a-f, numbers 0-9) to avoid encoding issues
3. Check the container sees the token: `podman exec ... env | grep TOKEN`

### Control UI Won't Connect

Ensure the config includes `dangerouslyDisableDeviceAuth: true`:

```json
{
  "gateway": {
    "controlUi": {
      "dangerouslyDisableDeviceAuth": true
    }
  }
}
```

This is required when accessing through a reverse proxy.

## Security Considerations

- **Gateway Token**: Use a strong, randomly generated token (32+ hex characters)
- **HTTPS**: EasyRunner/Caddy automatically provisions TLS certificates
- **Device Auth Disabled**: The `dangerouslyDisableDeviceAuth` setting is required for reverse proxy setups. Security relies on the gateway token instead of device pairing.
- **Trusted Proxies**: The default config trusts standard private network ranges. Adjust if your setup differs.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Your Server                       │
│  ┌─────────────┐      ┌──────────────────────────┐  │
│  │   Caddy     │      │  OpenClaw Container      │  │
│  │ (port 443)  │─────▶│  (port 18789)            │  │
│  │             │      │                          │  │
│  │  TLS term   │      │  ┌──────────────────┐   │  │
│  │  + proxy    │      │  │ Gateway Process  │   │  │
│  └─────────────┘      │  └──────────────────┘   │  │
│                       │           │              │  │
│                       │  ┌────────▼─────────┐   │  │
│                       │  │ Persistent Vol   │   │  │
│                       │  │ (.openclaw/)     │   │  │
│                       │  └──────────────────┘   │  │
│                       └──────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Dockerfile Changes

The fork includes several modifications to the upstream Dockerfile for EasyRunner/Podman compatibility:

### Non-root User

The container runs as the `node` user (uid 1000) instead of root. This is essential for rootless Podman and improves security:

```dockerfile
# Create state directory and set ownership
RUN mkdir -p /home/node/.openclaw \
    && chown -R node:node /home/node/.openclaw /home/node \
    && chmod -R a+rX /app/extensions 2>/dev/null || true \
    && chmod -R a+rX /app/docs 2>/dev/null || true

USER node
```

### Entrypoint Script

A custom entrypoint script (`scripts/docker-entrypoint.sh`) handles first-run setup:

- Creates the state directory if missing
- Generates a minimal `openclaw.json` config with sensible defaults for reverse proxy setups
- Sets `trustedProxies` for Docker/Podman network ranges
- Enables `dangerouslyDisableDeviceAuth` for Control UI access through Caddy
- Disables the memory plugin (not bundled in the container)
- Starts the gateway with `--bind lan`

### Directory Permissions

The `/app/extensions` and `/app/docs` directories are made world-readable to avoid permission errors when the container runs as a non-root user.

These changes ensure the container works correctly with Podman's user namespace mapping (the `:U` volume flag) and EasyRunner's rootless container setup.

## Related Documentation

- [Gateway Overview](/gateway)
- [Configuration Reference](/configuration)
- [Channels Setup](/channels)
- [Docker Deployment](/platforms/docker) (for non-EasyRunner Docker setups)
