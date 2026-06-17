# Recipe: Deploy a Next.js App

EasyRunner runs Next.js using the official self-hosted **Node.js server** model: your app runs as a long-lived container, usually with `next start`, under systemd/Podman, with Caddy in front for HTTPS and Next.js-aware routing.

It does not use OpenNext or serverless adapters for this path. Those tools are useful for platforms without a persistent Node server; EasyRunner is targeting the simpler VPS/container model.

This recipe uses the public demo app as a starting point for a Flow A deployment.

Demo repo: <https://github.com/janaka/next-helloworld-app>

## What You Need

- EasyRunner CLI installed and set up
- A web host initialized with `er server init`
- GitHub linked with `er link github`
- A domain or subdomain pointed at the web host

## Add the App

```bash
er app add next-demo my-server git@github.com:janaka/next-helloworld-app.git \
  --custom-domain next-demo.example.com
```

## Check the Repo Shape

For Flow A, the repo needs:

- A `Dockerfile` or `Containerfile`
- `.easyrunner/docker-compose-app.yaml`

The Compose-format file should mark the public service as a web service and set the internal port your Next.js process listens on.

```yaml
name: next-demo
services:
  web:
    image: localhost/next-demo:latest
    environment:
      - NODE_ENV=production
      - PORT=3000
    volumes:
      - next_cache:/app/.next/cache
    restart: unless-stopped
    networks:
      - easyrunner_proxy_network
    labels:
      xyz.easyrunner.service.type: web
      xyz.easyrunner.service.framework: nextjs
      xyz.easyrunner.service.port: "3000"

volumes:
  next_cache:

networks:
  easyrunner_proxy_network:
    name: easyrunner_proxy_network
    external: true
```

!!! tip "ISR cache volume"
    Apps using ISR or cache-heavy rendering need `.next/cache` mounted on a named volume so the cache survives redeploys. The example Compose file above already includes this. If you omit the volume, EasyRunner will warn you at deploy time that ISR is silently disabled. The exact path depends on your Dockerfile's working directory — `/app/.next/cache` for a `WORKDIR /app` image.

## Recommended Dockerfile Shape

For production Next.js apps, prefer `output: "standalone"` in `next.config.js` and copy the standalone output into a small runtime image.

```js title="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

module.exports = nextConfig;
```

```dockerfile title="Dockerfile"
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

EXPOSE 3000
CMD ["node", "server.js"]
```

## What EasyRunner Configures Automatically

When `xyz.easyrunner.service.framework: nextjs` is set, EasyRunner adjusts the Caddy configuration and build process automatically — you do not need to wire these up yourself.

**Caddy cache and routing:**

| Route | Behaviour |
| --- | --- |
| `/_next/static/*` | Immutable caching (1 year, `Cache-Control: public, max-age=31536000, immutable`) |
| Static assets (`.svg`, `.ico`, `.png`, `.jpg`, etc.) | 24-hour cache |
| `/api/*` | No-store (responses bypass cache) |
| Everything else | Streaming-safe reverse proxy (`flush_interval: -1`) for SSR, Suspense, and Server-Sent Events |

**Auto-injected build args:**

`EASYRUNNER_APP_DOMAIN` and `EASYRUNNER_APP_URL` are injected automatically as Docker build args for Next.js apps. Consume them in your Dockerfile with `ARG`:

```dockerfile title="Dockerfile (builder stage)"
ARG EASYRUNNER_APP_URL
ENV NEXT_PUBLIC_APP_URL=$EASYRUNNER_APP_URL
```

You do not need to add these to `build.args` in your Compose file — EasyRunner passes them for you.

**Graceful shutdown:**

The systemd unit is configured with a 30-second stop timeout so in-flight requests complete before the container is removed on redeploy.

## Build-Time vs Runtime Environment

Values prefixed with `NEXT_PUBLIC_` are baked into the client bundle at build time. `EASYRUNNER_APP_DOMAIN` and `EASYRUNNER_APP_URL` are auto-injected as build args (see above), so you get those for free. For any other build-time values, add them to `build.args` in your Compose file:

```yaml
services:
  web:
    build:
      context: .
      args:
        NEXT_PUBLIC_STRIPE_KEY: "pk_live_..."
```

Runtime-only values should stay in app secrets and normal runtime environment configuration.

## Deploy

```bash
er app deploy next-demo my-server
```

Inspect it:

```bash
er app status next-demo my-server
er app logs next-demo my-server --lines 100
```

Your app should be available at `https://next-demo.example.com` after DNS and certificate issuance complete.

## Adapt for Your Own App

1. Replace the repository URL with your app repo.
2. Make sure your container listens on the same port as `xyz.easyrunner.service.port`.
3. Set `xyz.easyrunner.service.framework: nextjs` on the public service so EasyRunner uses the Next.js-aware Caddy routing.
4. Store sensitive values with `er app secret`, not in the Compose-format file.
5. Use `build.args` for build-time `NEXT_PUBLIC_` values.
6. Deploy a release branch with `er app deploy <app> <server> --branch <branch>` if needed.
