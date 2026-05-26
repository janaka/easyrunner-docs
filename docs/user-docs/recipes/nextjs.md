# Recipe: Deploy a Next.js App

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
    restart: unless-stopped
    networks:
      - easyrunner_proxy_network
    labels:
      xyz.easyrunner.appNodeType: web
      xyz.easyrunner.appFramework: nextjs
      xyz.easyrunner.appContainerInternalPort: "3000"

networks:
  easyrunner_proxy_network:
    name: easyrunner_proxy_network
    external: true
```

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
2. Make sure your container listens on the same port as `xyz.easyrunner.appContainerInternalPort`.
3. Store sensitive values with `er app secret`, not in the Compose-format file.
4. Deploy a release branch with `er app deploy <app> <server> --branch <branch>` if needed.
