# Compose-Format Configuration

EasyRunner uses the Docker Compose file format as the user-facing app configuration format. It reads the file and turns it into Podman/systemd configuration on the web host.

!!! info "Compose is a format here"
    EasyRunner does not require you to run the Docker Compose CLI. It reads Compose-format YAML because it is a familiar way to describe containerized app stacks.

## Flow A Location

For Flow A, commit this file in your app repo:

```text
.easyrunner/docker-compose-app.yaml
```

## Minimal Shape

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
      xyz.easyrunner.service.type: web
      xyz.easyrunner.service.domain: app.example.com
      xyz.easyrunner.service.framework: standardbackend
      xyz.easyrunner.service.port: "3000"

networks:
  easyrunner_proxy_network:
    name: easyrunner_proxy_network
    external: true
```

## Important Fields

| Field | Why it matters |
| --- | --- |
| `name:` | Used in generated systemd unit names. Use a unique app-specific value. |
| `services:` | Defines the containers/processes inside the EasyRunner app. |
| `networks.easyrunner_proxy_network` | Connects public services to Caddy's proxy network. |
| `xyz.easyrunner.service.type` | Marks a service as `web`, `internal`, or `worker`. |
| `xyz.easyrunner.service.domain` | Public domain Caddy routes to this `web` service. Required on every `web` service. |
| `xyz.easyrunner.service.port` | Tells Caddy which internal port the service listens on. |

## Build Arguments

For Flow A, EasyRunner passes standard Compose `build.args` to `podman build`.

```yaml
services:
  web:
    build:
      context: .
      args:
        NEXT_PUBLIC_APP_URL: "https://app.example.com"
```

Use build args for values that must exist while the image is built. Do not use them for secrets; use [App Secrets](secrets.md) for sensitive runtime values.

!!! warning "Do not bind public host ports"
    EasyRunner expects Caddy to be the public entry point. Avoid exposing app containers directly with host port bindings unless a guide explicitly tells you to.

## Auto-Injected Environment Variables

EasyRunner injects read-only metadata variables into every service container at deploy time. `EASYRUNNER_APP_URL` and `EASYRUNNER_APP_DOMAIN` resolve to **this service's own** public URL/domain (from its `service.domain` label). Reference them from your app or from `environment:` instead of hardcoding your domain:

```yaml
services:
  web:
    image: localhost/my-app:latest
    environment:
      - PUBLIC_URL=${EASYRUNNER_APP_URL}
```

When an app has several `web` services, each one's public URL is also exposed to every container as `EASYRUNNER_SERVICE_<NAME>_URL` / `_DOMAIN`, so one service can address another (e.g. a storefront calling its backend API). See [Compose-Format Files and Labels](../reference/compose-labels.md#auto-injected-environment-variables) for the full list.

## Multi-Service Apps

Each `web` service declares its own `service.domain`; `worker` and `internal` services are not routed and have no domain.

```yaml
name: shop
services:
  web:
    image: localhost/shop-web:latest
    networks: [easyrunner_proxy_network]
    labels:
      xyz.easyrunner.service.type: web
      xyz.easyrunner.service.domain: shop.example.com
      xyz.easyrunner.service.port: "3000"
  worker:
    image: localhost/shop-worker:latest
    labels:
      xyz.easyrunner.service.type: worker
  redis:
    image: docker.io/library/redis:7-alpine
    labels:
      xyz.easyrunner.service.type: internal

networks:
  easyrunner_proxy_network:
    name: easyrunner_proxy_network
    external: true
```

See [Compose-Format Files and Labels](../reference/compose-labels.md) for the reference.
