# Domains and HTTPS

Every public EasyRunner service is served over HTTPS through Caddy. Domains are declared **per web service** in your Compose-format file — there is no app-level domain flag.

!!! info "Domains live in the compose file"
    Each `web` service sets its own public domain with the
    `xyz.easyrunner.service.domain` label. The compose file is the single source
    of truth for routing, and DNS is provisioned at **deploy** time. The old
    `--custom-domain` flag on `er app add` / `er app update-details` has been
    removed.

## Set a Domain on a Service

Add the `xyz.easyrunner.service.domain` label to each public (`web`) service:

```yaml
services:
  web:
    networks:
      - easyrunner_proxy_network
    labels:
      xyz.easyrunner.service.type: web
      xyz.easyrunner.service.domain: app.example.com # (1)!
      xyz.easyrunner.service.port: "3000"
```

1. The public domain Caddy routes to this service. Required on every `web` service; must be unique within the app.

How you change it depends on the deploy flow:

=== "Flow A (repo apps)"

    Edit `.easyrunner/docker-compose-app.yaml` in the repo, commit, and push.

=== "Flow B (registry apps)"

    Edit your local compose file, then re-snapshot it onto the app:

    ```bash
    er app update-details my-app my-server --compose-file ./compose.yaml
    ```

Then deploy — DNS and Caddy routing for the domain are set up during the deploy:

```bash
er app deploy my-app my-server
```

## Multiple Domains per App

An app can declare several `web` services, each on its own domain. They are all routed, and a DNS record is provisioned for each declared domain:

```yaml
services:
  storefront:
    networks: [easyrunner_proxy_network]
    labels:
      xyz.easyrunner.service.type: web
      xyz.easyrunner.service.domain: shop.example.com
      xyz.easyrunner.service.port: "8000"
  admin:
    networks: [easyrunner_proxy_network]
    labels:
      xyz.easyrunner.service.type: web
      xyz.easyrunner.service.domain: admin.example.com
      xyz.easyrunner.service.port: "7001"
```

Each `service.domain` must be unique within the app. See [Compose-Format Files and Labels](../reference/compose-labels.md#multiple-public-services) for a fuller multi-service example, including how one service reads another's public URL.

## DNS

Create an `A` record pointing each service domain at the web host IP:

```text
app.example.com -> <web-host-ip>
```

Find the web host IP with:

```bash
er app show-details my-app my-server
er server list
```

## Cloudflare Automation

If your domains are managed in Cloudflare, link Cloudflare and EasyRunner creates or confirms the `A` records for you — **at deploy time**, one per declared `service.domain`:

```bash
er link cloudflare production --api-token <cloudflare-api-token>
er app deploy my-app my-server
```

The deploy prints the record it created or confirmed for each domain. If DNS setup fails (for example, the domain is not in the linked account), EasyRunner warns and continues — the deploy is not blocked.

## HTTPS

Caddy handles certificate issuance and renewal for every routed domain. Because DNS is provisioned right before routing, certificates issue cleanly on the first deploy.

!!! note "First-deploy TLS"
    Certificates can take a minute to issue while a freshly created DNS record
    propagates (TTL 300s). Caddy retries automatically.

??? question "HTTPS is not working"
    Check these first:

    - DNS resolves to the web host IP for the service's `service.domain`.
    - Ports `80` and `443` are open to the internet.
    - The `xyz.easyrunner.service.domain` label matches the DNS name.
    - Caddy logs do not show certificate challenge failures.

    ```bash
    er server logs my-server --lines 200
    ```
