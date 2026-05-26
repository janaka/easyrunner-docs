# Flow B: Deploy from a Registry

Flow B pulls a pre-built image from a container registry instead of building on the web host.

```text
CI builds image -> registry -> web host pulls image -> systemd service -> Caddy HTTPS
```

## Use Flow B When

- Your CI already builds and publishes images.
- You want faster deploys on small web hosts.
- You are deploying a third-party app that already publishes images.

## Add or Update the App

```bash
er app add my-app my-server "" --custom-domain app.example.com

er app update-details my-app my-server \
  --deploy-flow flow_b \
  --compose-file ./docker-compose.yaml
```

`--compose-file` reads a Compose-format file at command time and stores its content on the app. If you edit the file later, run `er app update-details --compose-file ...` again.

## Compose-Format Shape

```yaml
name: my-app
services:
  web:
    image: ghcr.io/yourname/your-app:latest
    restart: unless-stopped
    networks:
      - easyrunner_proxy_network
    labels:
      xyz.easyrunner.appNodeType: web
      xyz.easyrunner.appContainerInternalPort: "3000"

networks:
  easyrunner_proxy_network:
    name: easyrunner_proxy_network
    external: true
```

## Private GHCR Images

Store the registry pull credentials as reserved app secrets:

```bash
er app secret set my-app EASYRUNNER_GHCR_USERNAME
er app secret set my-app EASYRUNNER_GHCR_PAT
```

Use a classic GitHub PAT with `read:packages` for GHCR pulls.

## Deploy

```bash
er app deploy my-app my-server
```

Flow B ignores `--branch`; it deploys the image references in the stored Compose-format content.

??? question "Compose-format changes are not taking effect"
    Flow B stores Compose-format content when you run `er app update-details --compose-file`. Rerun that command after editing the file, then deploy again.
