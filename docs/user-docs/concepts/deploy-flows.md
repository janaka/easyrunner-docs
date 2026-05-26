# Deploy Flows

EasyRunner supports two deployment flows. Both end the same way: containers running on your web host, managed by systemd, behind Caddy with HTTPS.

| Concern | Flow A: build on server | Flow B: pull from registry |
| --- | --- | --- |
| Best for | First deployments, solo projects, no CI yet | Teams or apps with CI-built images |
| Image build happens | On the EasyRunner web host | In CI, on your laptop, or elsewhere |
| Repo needed at deploy time | Yes | No, if the image and compose file are already available |
| Server deploy workload | Higher during image build | Lower, mostly image pull and restart |
| Credential needed | GitHub link for repo deploy keys | Registry credentials when pulling private images |
| Compose source | `.easyrunner/docker-compose-app.yaml` in the repo | Stored on the EasyRunner app with `er app update-details --compose-file` |

## Flow A: Build on the Server

```text
GitHub repo -> EasyRunner web host -> podman build -> systemd + Caddy
```

Use Flow A when you want the easiest path and do not already publish container images from CI.

## Flow B: Pull from a Registry

```text
CI builds image -> registry -> EasyRunner web host pulls -> systemd + Caddy
```

Use Flow B when you already build images in CI or want the web host to focus on running apps rather than building them.

!!! tip "Start simple"
    If you are not sure which flow to choose, start with Flow A. Move to Flow B when you have CI publishing images reliably.

See [Flow A: Deploy from Source](../apps/flow-a.md) and [Flow B: Deploy from a Registry](../apps/flow-b.md).
