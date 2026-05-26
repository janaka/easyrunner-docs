# Install the CLI

EasyRunner is distributed with Homebrew. The CLI entry point is `er`; `easy` may also be available as an alias.

## Release Channels

=== "Stable"

    Use stable for the most conservative release channel.

    ```bash
    brew tap janaka/easyrunner
    brew install easyrunner-cli
    ```

=== "Beta"

    Use beta for current preview releases and preview testing.

    ```bash
    brew tap janaka/easyrunner
    brew install easyrunner-cli-beta
    ```

=== "Dev"

    Use dev only when you intentionally want bleeding-edge builds.

    ```bash
    brew tap janaka/easyrunner-dev
    brew install easyrunner-cli-dev
    ```

## Verify

```bash
er --version
er --help
```

## Update

=== "Stable"

    ```bash
    brew update
    brew upgrade easyrunner-cli
    ```

=== "Beta"

    ```bash
    brew update
    brew upgrade easyrunner-cli-beta
    ```

=== "Dev"

    ```bash
    brew update
    brew upgrade easyrunner-cli-dev
    ```

## Troubleshooting

??? question "Homebrew says formula not found"
    Check that the correct tap exists:

    ```bash
    brew tap | grep easyrunner
    ```

    Stable and beta use `janaka/easyrunner`. Dev uses `janaka/easyrunner-dev`.

??? question "Multiple versions conflict"
    Remove all EasyRunner formulae, then install one channel:

    ```bash
    brew list | grep easyrunner
    brew uninstall easyrunner-cli easyrunner-cli-beta easyrunner-cli-dev
    brew install easyrunner-cli-beta
    ```

## Next

Run [First-Run Setup](first-run-setup.md), then [Install a License](license.md).
