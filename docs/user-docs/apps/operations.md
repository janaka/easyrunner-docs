# App Operations

Use these commands after an app has been added and deployed.

## Inspect

```bash
er app list
er app show-details my-app my-server
er app status my-app my-server
```

## Logs

```bash
er app logs my-app my-server --lines 100
er app logs my-app my-server --since "1 hour ago"
```

Logs come from the systemd user journal for the containers generated from your service entries.

## Lifecycle

```bash
er app stop my-app my-server
er app start my-app my-server
er app restart my-app my-server
```

## Redeploy

```bash
er app deploy my-app my-server
er app deploy my-app my-server --branch main
```

Flow A can use `--branch`. Flow B deploys the stored image references and ignores branch selection.

## Remove

```bash
er app remove my-app my-server
```

!!! warning "Data and volumes"
    Understand where your app stores data before removing or redeploying stateful services. For production databases, prefer managed database providers unless you have a backup and restore plan.
