# Compose-Format Files and Labels Reference

EasyRunner reads Compose-format files and converts them into Podman/systemd configuration for the web host. **Compose** means the Docker Compose file format in this reference, not the Docker Compose CLI tool.

## Required Network for Public Services

```yaml
networks:
  easyrunner_proxy_network:
    name: easyrunner_proxy_network
    external: true # (1)!
```

1. EasyRunner creates this network during web-host initialization. Public services attach to it so Caddy can reach them.

Attach public web services to this network so Caddy can route traffic to them.

## Current Labels

| Label | Applied to | Meaning |
| --- | --- | --- |
| `xyz.easyrunner.appNodeType` | Service entry | Service role. Common values: `web`, `internal`. |
| `xyz.easyrunner.appFramework` | Service entry | Routing/framework hint such as `standardbackend` or `nextjs`. |
| `xyz.easyrunner.appContainerInternalPort` | Service entry | Port the service listens on inside the container network. |
| `xyz.easyrunner.appBuildContext` | Service entry | Optional Flow A build context relative to the repo root. |

!!! note "Terminology"
  These labels currently use `app...` names, but they configure service entries. Read them as service-level settings.

## Service Examples

=== "Public web service"

    ```yaml
    services:
      web:
        image: localhost/my-app:latest
        networks:
          - easyrunner_proxy_network
        labels:
          xyz.easyrunner.appNodeType: web # (1)!
          xyz.easyrunner.appFramework: standardbackend
          xyz.easyrunner.appContainerInternalPort: "3000" # (2)!
    ```

    1. Marks this service as publicly routable.
    2. Tells Caddy which internal container port to use.

=== "Internal service"

    ```yaml
    services:
      worker:
        image: localhost/my-worker:latest
        labels:
          xyz.easyrunner.appNodeType: internal # (1)!
    ```

    1. Keeps the service internal to the app stack.

=== "Flow A build context"

    ```yaml
    services:
      api:
        image: localhost/my-api:latest
        labels:
          xyz.easyrunner.appNodeType: web
          xyz.easyrunner.appBuildContext: "apps/api" # (1)!
    ```

    1. Builds this service from a subdirectory relative to the repo root.

## Naming Guidance

- Set `name:` to an app-specific value. Avoid generic names reused across multiple apps.
- Use service names that describe the process, such as `web`, `api`, `worker`, or `redis`.
- Keep secrets out of Compose-format files; use [App Secrets](../apps/secrets.md).
