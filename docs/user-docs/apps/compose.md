# Compose Configuration

EasyRunner uses the Docker Compose file format as the user-facing app configuration format. It reads the file and turns it into Podman/systemd configuration on the web host.

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
      xyz.easyrunner.appNodeType: web
      xyz.easyrunner.appFramework: standardbackend
      xyz.easyrunner.appContainerInternalPort: "3000"

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
| `xyz.easyrunner.appNodeType` | Marks a service as `web` or `internal`. |
| `xyz.easyrunner.appContainerInternalPort` | Tells Caddy which internal port the service listens on. |

!!! warning "Do not bind public host ports"
    EasyRunner expects Caddy to be the public entry point. Avoid exposing app containers directly with host port bindings unless a guide explicitly tells you to.

## Multi-Service Apps

```yaml
name: shop
services:
  web:
    image: localhost/shop-web:latest
    networks: [easyrunner_proxy_network]
    labels:
      xyz.easyrunner.appNodeType: web
      xyz.easyrunner.appContainerInternalPort: "3000"
  worker:
    image: localhost/shop-worker:latest
    labels:
      xyz.easyrunner.appNodeType: internal
  redis:
    image: docker.io/library/redis:7-alpine
    labels:
      xyz.easyrunner.appNodeType: internal

networks:
  easyrunner_proxy_network:
    name: easyrunner_proxy_network
    external: true
```

See [Compose and Labels](../reference/compose-labels.md) for the reference.
