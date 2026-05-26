# Domains and HTTPS

Every public EasyRunner app is expected to be served over HTTPS through Caddy.

## Add a Domain to an App

```bash
er app add my-app my-server git@github.com:yourname/your-repo.git \
  --custom-domain app.example.com
```

or update an existing app:

```bash
er app update-details my-app my-server --custom-domain app.example.com
```

## DNS

Create an `A` record pointing your app domain at the web host IP address.

```text
app.example.com -> <web-host-ip>
```

You can find app and server details with:

```bash
er app show-details my-app my-server
er server list
```

## Cloudflare Automation

If your domain is managed in Cloudflare, link Cloudflare before adding the app:

```bash
er link cloudflare production --api-token <cloudflare-api-token>
er app add my-app my-server git@github.com:yourname/your-repo.git \
  --custom-domain app.example.com
```

EasyRunner can then create or update the DNS record for you.

## HTTPS

Caddy handles certificate issuance and renewal. Make sure DNS points at the web host before deploying so HTTP-01 validation can succeed.

??? question "HTTPS is not working"
    Check these first:

    - DNS resolves to the web host IP.
    - Ports `80` and `443` are open to the internet.
    - The app domain in EasyRunner matches the DNS name.
    - Caddy logs do not show certificate challenge failures.

    ```bash
    er server logs my-server --lines 200
    ```
