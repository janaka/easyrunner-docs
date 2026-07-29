# License Setup

EasyRunner requires a license file.

!!! tip "Don't have a license yet?"
    A **free license — 1 app on 1 server, every feature included — is weeks away** from self-serve download. Until then, alpha access (license included) is available by email.

    [Get the free download when it lands →](../../download.md){ .md-button data-ga-event="download_cta_click" data-ga-source="license_page" }

## Install

```bash
er license install ~/Downloads/easyrunner-license.jwt
```

## Check Status

```bash
er license status
er license validate
```

The status output shows the licensed customer, app limit, issue date, and update period.

## Replace a License

Install the new license file with the same command:

```bash
er license install ~/Downloads/new-easyrunner-license.jwt
```

## Common Issues

??? question "The CLI says no license is installed"
    Install the license file again and check status:

    ```bash
    er license install ~/Downloads/easyrunner-license.jwt
    er license status
    ```

??? question "I reached my app limit"
    Remove an unused app from EasyRunner or upgrade your license before adding another app.
