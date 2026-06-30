# EasyRunner in One Page

EasyRunner has two jobs: it keeps a small control plane on your machine, and it uses SSH to configure your Ubuntu servers as web hosts for your apps.

```text
Your machine
┌──────────────────────────────┐
│ EasyRunner CLI               │
│ - stores app/server config   │
│ - stores secrets in vault    │
│ - talks to web hosts by SSH  │
└──────────────┬───────────────┘
               │ SSH
               ▼
Your web host
┌──────────────────────────────┐
│ Ubuntu server                │
│ - Podman runs containers     │
│ - systemd keeps them alive   │
│ - Caddy routes HTTPS traffic │
│ - firewall limits exposure   │
└──────────────┬───────────────┘
               │ HTTPS
               ▼
Users visit your app
```

## Core Terms

| Term | Meaning |
| --- | --- |
| Control plane | The EasyRunner CLI install and local state that remembers servers, apps, links, and secrets. |
| Server mode | A first-run setup mode where this EasyRunner install stores the control-plane state. This is usually your laptop or a machine you keep around, not the web host itself. |
| Web host | The Ubuntu server EasyRunner configures to run apps. CLI commands call this a `server`. |
| App | An EasyRunner deployable app stack. It has a name, web host, deploy flow, Compose-format configuration (which declares a public domain per `web` service), secrets, and lifecycle. |
| Service | One service entry inside the app's Compose-format configuration. Usually one container or process. An app can have one service or many. |
| Deploy flow | How the app image gets to the web host: build from source on the server, or pull a pre-built image from a registry. |
| Link | A stored connection to an external service such as GitHub, Hetzner, or Cloudflare. |
| Backup | An encrypted restic snapshot of EasyRunner's control-plane state in Cloudflare R2. It helps recover EasyRunner itself, not app runtime data. |
| Mesh | An optional WireGuard VPN between your machine and your web hosts. It lets you lock SSH to a private network instead of the public internet. Not required for the first deployment path. See [Secure Access with the Mesh VPN](../servers/mesh.md). |

!!! note "Server can mean two things"
    EasyRunner has `er setup --mode server`, which means a control-plane server mode install. It also has `er server ...`, which manages Ubuntu web hosts. These docs use **web host** when talking about the machine that runs apps.

!!! note "Compose means the file format"
    EasyRunner reads the Docker Compose file format as app configuration, then converts it into Podman/systemd units on the web host. In these docs, **Compose** is shorthand for that file format, not the Docker Compose CLI tool.

## App Shape

An EasyRunner app is the thing you add, deploy, start, stop, inspect, and remove with `er app ...`. A simple app might contain one service entry:

```text
EasyRunner app: blog
└── service entry: web
```

A larger app can contain several services:

```text
EasyRunner app: shop
├── service entry: web      public, routed by Caddy
├── service entry: api      internal
├── service entry: worker   internal
└── service entry: redis    internal
```

EasyRunner routes public HTTPS traffic to services marked as web services. Other services stay internal unless you deliberately expose them through EasyRunner-supported configuration.

## Normal Flow

```text
1. Install the CLI
2. Run first-time setup
3. Install your license
4. Link services you need
5. Create or add a web host
6. Initialize the web host
7. Add an app
8. Deploy the app
9. Inspect logs, status, and lifecycle
```

## Where to Go Next

- [Server Provisioning Paths](server-provisioning.md)
- [Apps and Services](apps-and-services.md)
- [Deploy Flows](deploy-flows.md)
- [Links and Integrations](links-and-integrations.md)
