# Compose and Labels Reference

EasyRunner reads Compose files and converts them into Podman/systemd configuration for the web host.

## Required Network for Public Services

```yaml
networks:
  easyrunner_proxy_network:
    name: easyrunner_proxy_network
    external: true
```

Attach public web services to this network so Caddy can route traffic to them.

## Current Labels

| Label | Applied to | Meaning |
| --- | --- | --- |
| `xyz.easyrunner.appNodeType` | Compose service | Service role. Common values: `web`, `internal`. |
| `xyz.easyrunner.appFramework` | Compose service | Routing/framework hint such as `standardbackend` or `nextjs`. |
| `xyz.easyrunner.appContainerInternalPort` | Compose service | Port the service listens on inside the container network. |
| `xyz.easyrunner.appBuildContext` | Compose service | Optional Flow A build context relative to the repo root. |

!!! note "Terminology"
    These labels currently use `app...` names, but they configure Compose services. Read them as service-level settings.

## Public Web Service Example

```yaml
services:
  web:
    image: localhost/my-app:latest
    networks:
      - easyrunner_proxy_network
    labels:
      xyz.easyrunner.appNodeType: web
      xyz.easyrunner.appFramework: standardbackend
      xyz.easyrunner.appContainerInternalPort: "3000"
```

## Internal Service Example

```yaml
services:
  worker:
    image: localhost/my-worker:latest
    labels:
      xyz.easyrunner.appNodeType: internal
```

## Naming Guidance

- Set `name:` to an app-specific value. Avoid generic names reused across multiple apps.
- Use service names that describe the process, such as `web`, `api`, `worker`, or `redis`.
- Keep secrets out of Compose files; use [App Secrets](../apps/secrets.md).
