# Apps and Services

EasyRunner uses **app** for the deployable thing you operate. Compose uses **service** for each container/process inside that app.

## The Model

```text
EasyRunner app
├── app metadata
│   ├── app name
│   ├── web host
│   ├── custom domain
│   ├── deploy flow
│   └── default deploy branch
├── app secrets
└── Compose services
    ├── web service
    ├── internal service
    └── worker or supporting service
```

An EasyRunner app can be one public web service, or it can be a small stack of services that work together.

## One-Service App

```text
app: docs-site
└── service: web
```

This is the common first deployment. The service listens on an internal port, and Caddy routes public HTTPS traffic to it.

## Multi-Service App

```text
app: customer-portal
├── service: web       public
├── service: api       internal
├── service: worker    internal
└── service: redis     internal
```

Only the service you mark as public should receive external traffic. Internal services remain on the app network.

## Compose Labels

EasyRunner reads labels on Compose services to understand how to route and run them.

Current labels use `app...` names even though they are applied at the service level:

```yaml
labels:
  xyz.easyrunner.appNodeType: web
  xyz.easyrunner.appFramework: standardbackend
  xyz.easyrunner.appContainerInternalPort: "3000"
```

!!! note "Current naming"
    Treat these labels as service-level configuration. The product may introduce clearer `service.*` labels in the future, but the current labels are the supported public interface today.

See [Compose and Labels](../reference/compose-labels.md) for the reference.
