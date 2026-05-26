# License Setup

EasyRunner requires a license file.

## Install

```bash
er license install ~/Downloads/easyrunner-license.jwt
```

## Check Status

```bash
er license status
er license validate
```

The status output shows the licensed customer, server limit, issue date, and update period.

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

??? question "I reached my server limit"
    Remove an unused server from EasyRunner or upgrade your license before adding another web host.
