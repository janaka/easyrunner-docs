# Troubleshooting

Start with the command closest to the failing layer.

```text
Install/setup -> license/link -> SSH/server init -> DNS/HTTPS -> deploy -> runtime
```

## Install

??? question "`er` command not found"
    Check Homebrew installed the formula and that your shell can see Homebrew's bin directory:

    ```bash
    brew list | grep easyrunner
    er --help
    ```

??? question "Formula not found"
    Check the tap:

    ```bash
    brew tap | grep easyrunner
    ```

## License

??? question "No valid license"
    Install and validate the license:

    ```bash
    er license install ~/Downloads/easyrunner-license.jwt
    er license status
    er license validate
    ```

## Links

??? question "GitHub deploy-key setup fails"
    Check GitHub link status and confirm the app uses an SSH repo URL:

    ```bash
    er link github --status
    er app show-details my-app my-server
    ```

??? question "Cloudflare did not create DNS"
    Check the Cloudflare link, token scopes, and whether the domain belongs to that account:

    ```bash
    er link cloudflare production --status
    er link status
    ```

## SSH and Server Init

??? question "EasyRunner cannot connect to the server"
    Check that the server is reachable and the EasyRunner public key is authorized:

    ```bash
    er server show-ssh-key my-server
    er server ssh-connect-test my-server --username root
    ```

??? question "Server verification fails"
    Re-run verification and inspect server logs:

    ```bash
    er server verify my-server
    er server logs my-server --lines 200
    ```

## DNS and HTTPS

??? question "The app domain does not resolve"
    Confirm the DNS `A` record points at the web host IP:

    ```bash
    er app show-details my-app my-server
    er server list
    ```

??? question "HTTPS certificate fails"
    Make sure DNS is correct before deploy and ports `80` and `443` are open. Then check Caddy logs:

    ```bash
    er server logs my-server --lines 200
    ```

## Deploy Flow

??? question "Flow A build fails"
    Check that the repo has a Dockerfile or Containerfile and `.easyrunner/docker-compose-app.yaml`. Then review deploy output and app logs.

??? question "Flow B uses old compose settings"
    Re-store the compose file and deploy again:

    ```bash
    er app update-details my-app my-server --compose-file ./docker-compose.yaml
    er app deploy my-app my-server
    ```

??? question "Private registry pull fails"
    For GHCR, check reserved secrets and PAT scope:

    ```bash
    er app secret list my-app
    er app secret set my-app EASYRUNNER_GHCR_USERNAME
    er app secret set my-app EASYRUNNER_GHCR_PAT
    ```

## Runtime

??? question "App is deployed but not responding"
    Check app status, logs, and the internal port label:

    ```bash
    er app status my-app my-server
    er app logs my-app my-server --lines 200
    ```

    Confirm `xyz.easyrunner.appContainerInternalPort` matches the port your app listens on inside the container.
