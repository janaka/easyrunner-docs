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

## Service Labels

EasyRunner reads labels on each service entry to decide how to route and run it. The canonical labels use the `xyz.easyrunner.service.*` prefix.

| Label | Applied to | Meaning |
| --- | --- | --- |
| `xyz.easyrunner.service.type` | Service entry | Service role. Values: `web`, `internal`, `worker`. |
| `xyz.easyrunner.service.domain` | `web` services | Public domain Caddy routes to this service. **Required on every `web` service; must be unique within the app.** |
| `xyz.easyrunner.service.framework` | `web` services | Routing/framework hint such as `standardbackend` or `nextjs`. |
| `xyz.easyrunner.service.port` | `web` services | Port the service listens on inside the container network, quoted as a string (default `3000`). |
| `xyz.easyrunner.service.build-context` | Service entry | Optional Flow A build context relative to the repo root. |

### Label values

- **`service.type`** — `web` (publicly routable through Caddy), `internal` (reachable only inside the app stack), or `worker` (background process with no inbound port).
- **`service.domain`** — the public domain for a `web` service, for example `shop.example.com`. The compose file is the source of truth for routing — there is no app-level `--custom-domain` flag. Required on every `web` service and must be unique within the app. DNS A-records for every declared domain are provisioned at deploy time.
- **`service.framework`** — `standardbackend` (generic HTTP backend) or `nextjs` (Next.js-aware Caddy configuration).
- **`service.port`** — the container's internal listen port, quoted as a string (for example `"3000"`). Defaults to `3000` when omitted.
- **`service.build-context`** — a path relative to the repo root, used by Flow A to build a service from a subdirectory.

!!! note "Renamed from the `app*` labels"
    Earlier releases used `appNodeType`, `appFramework`, `appContainerInternalPort`, and `appBuildContext`. Those names still work — EasyRunner falls back to them when the matching `service.*` label is absent — but the `service.*` names are canonical and recommended for new files. When both names are set on a service, the `service.*` value wins.

    | Deprecated alias | Canonical label |
    | --- | --- |
    | `xyz.easyrunner.appNodeType` | `xyz.easyrunner.service.type` |
    | `xyz.easyrunner.appFramework` | `xyz.easyrunner.service.framework` |
    | `xyz.easyrunner.appContainerInternalPort` | `xyz.easyrunner.service.port` |
    | `xyz.easyrunner.appBuildContext` | `xyz.easyrunner.service.build-context` |

    The older `xyz.easyrunner.appIsPublic: true` flag is also still honored but deprecated. Mark public services with `xyz.easyrunner.service.type: web` instead.

## Service Examples

=== "Public web service"

    ```yaml
    services:
      web:
        image: localhost/my-app:latest
        networks:
          - easyrunner_proxy_network
        labels:
          xyz.easyrunner.service.type: web # (1)!
          xyz.easyrunner.service.domain: app.example.com # (2)!
          xyz.easyrunner.service.framework: standardbackend
          xyz.easyrunner.service.port: "3000" # (3)!
    ```

    1. Marks this service as publicly routable.
    2. The public domain Caddy routes to this service.
    3. Tells Caddy which internal container port to use.

=== "Internal service"

    ```yaml
    services:
      worker:
        image: localhost/my-worker:latest
        labels:
          xyz.easyrunner.service.type: internal # (1)!
    ```

    1. Keeps the service internal to the app stack.

=== "Flow A build context"

    ```yaml
    services:
      api:
        image: localhost/my-api:latest
        labels:
          xyz.easyrunner.service.type: web
          xyz.easyrunner.service.build-context: "apps/api" # (1)!
    ```

    1. Builds this service from a subdirectory relative to the repo root.

## Multiple public services

An app can declare **several `web` services**, each with its own `service.domain` — for example a storefront, an admin, and an API on three different domains. They are all routed, and a DNS record is provisioned for each domain at deploy time.

```yaml
name: medusa
services:
  storefront:
    image: ghcr.io/acme/storefront:latest
    networks: [easyrunner_proxy_network]
    labels:
      xyz.easyrunner.service.type: web
      xyz.easyrunner.service.framework: nextjs
      xyz.easyrunner.service.port: "8000"
      xyz.easyrunner.service.domain: shop.example.com
  admin:
    image: ghcr.io/acme/admin:latest
    networks: [easyrunner_proxy_network]
    labels:
      xyz.easyrunner.service.type: web
      xyz.easyrunner.service.framework: standardbackend
      xyz.easyrunner.service.port: "7001"
      xyz.easyrunner.service.domain: admin.example.com
  backend:
    image: ghcr.io/acme/backend:latest
    networks: [easyrunner_proxy_network, medusa_internal] # (1)!
    environment:
      - REDIS_URL=redis://redis:6379 # (2)!
    labels:
      xyz.easyrunner.service.type: web
      xyz.easyrunner.service.framework: standardbackend
      xyz.easyrunner.service.port: "9000"
      xyz.easyrunner.service.domain: api.example.com
  redis:
    image: docker.io/library/redis:7
    networks: [medusa_internal] # (3)!
    labels:
      xyz.easyrunner.service.type: internal

networks:
  easyrunner_proxy_network:
    external: true
  medusa_internal:
    driver: bridge
```

1. A `web` service that also needs a private sibling joins both the public proxy network and a private network you declare yourself.
2. On a private network EasyRunner registers each service under its **bare compose name**, so `redis` resolves the normal docker-compose way.
3. `internal` / `worker` services stay off `easyrunner_proxy_network` — they get no domain and are not publicly reachable.

The storefront can reach the backend's public API via `EASYRUNNER_SERVICE_BACKEND_URL` (see below), and the backend reaches redis internally by the bare name `redis`.

!!! note "Bare-name resolution is private only"
    EasyRunner registers bare compose-name DNS only on private networks you
    declare, never on the shared `easyrunner_proxy_network`, so service names
    cannot collide across apps.

## Build Arguments

Flow A passes standard Compose `build.args` through to `podman build`. Use this for build-time values such as `NEXT_PUBLIC_*` variables in Next.js apps.

```yaml
services:
  web:
    build:
      context: .
      args:
        NEXT_PUBLIC_APP_URL: "https://app.example.com"
```

!!! warning "Build args are not secrets"
    Build arguments can be visible in image history and build logs. Do not use them for passwords, tokens, or private keys. Store sensitive runtime values with [App Secrets](../apps/secrets.md).

## Auto-Injected Environment Variables

When EasyRunner deploys an app it injects a set of read-only metadata environment variables into every service container — and, for Flow A, as build args too. You can reference them from your application or from the `environment:` block of your Compose-format file. They are available in both Flow A and Flow B.

| Variable | Value |
| --- | --- |
| `EASYRUNNER_APP_NAME` | The EasyRunner app name. |
| `EASYRUNNER_APP_DOMAIN` | **This service's own** domain without a scheme, e.g. `app.example.com` (from its `service.domain` label). |
| `EASYRUNNER_APP_URL` | This service's own full HTTPS URL, e.g. `https://app.example.com`. |
| `EASYRUNNER_SERVICE_<NAME>_DOMAIN` | The bare domain of each public `web` service in the app, so one service can address another. |
| `EASYRUNNER_SERVICE_<NAME>_URL` | The full HTTPS URL of each public `web` service in the app. |
| `EASYRUNNER_SERVER_NAME` | The EasyRunner web-host name. |
| `EASYRUNNER_SERVER_IP` | The web host's IP address or hostname. |

`<NAME>` is the compose service name upper-cased with non-alphanumerics replaced by `_` — e.g. `store-front` becomes `EASYRUNNER_SERVICE_STORE_FRONT_URL`.

These are plain environment variables, not secrets. EasyRunner injects them *before* your service's own `environment:` entries, so a service can override one by setting the same name. Use them to build absolute URLs, OAuth/OIDC callback URLs, and CORS allowlists without hardcoding your domain.

```yaml
services:
  web:
    image: localhost/my-app:latest
    environment:
      - PUBLIC_URL=${EASYRUNNER_APP_URL} # (1)!
```

1. Resolves to `https://app.example.com` at deploy time.

!!! note "`EASYRUNNER_*` secrets are different"
    App secrets you set with names beginning `EASYRUNNER_` (such as `EASYRUNNER_GHCR_USERNAME`) are reserved for EasyRunner's own use and are *not* injected into your container. The metadata variables above are provided by EasyRunner and *are* injected. See [App Secrets](../apps/secrets.md).

## Naming Guidance

- Set `name:` to an app-specific value. Avoid generic names reused across multiple apps.
- Use service names that describe the process, such as `web`, `api`, `worker`, or `redis`.
- Keep secrets out of Compose-format files; use [App Secrets](../apps/secrets.md).
