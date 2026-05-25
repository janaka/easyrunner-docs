# Install

This how you install EasyRunner.

## Pre-requisites

- Python 3.12+ (recommend using pyenv)

## Install EasyRunner CLI

EasyRunner is a tool with a Command Line Interface that runs on your laptop. It is the control plane (there is no cloud/SaaS dependency from us). 

The CLI can be setup in server or client mode. There needs to be at least one server mode install. The simplest setup initially is to install the CLI in server mode on your laptop.

Use one of the method below to install it.

=== "macOS"

    === "Homebrew"

        EasyRunner is distributed via Homebrew for macOS and Linux systems. We maintain three release channels to suit different use cases.

        ## Release Channels

        ### Stable (Recommended for Production)

        The stable channel contains production-ready releases that have been thoroughly tested. This is the recommended installation for most users.

        ```bash
        brew tap janaka/easyrunner
        brew install easyrunner-cli
        ```

        **When to use:** Production environments, servers, and when stability is critical.

        ### Beta (Preview Releases)

        The beta channel provides early access to upcoming features before they reach stable. Beta is currently the bleeding edge and is far ahead of Stable.

        ```bash
        brew tap janaka/easyrunner
        brew install easyrunner-cli-beta
        ```

        **When to use:** Testing new features, providing feedback, or development environments where you want the latest features.

=== "Linux"

    Coming soon

=== "Windows"

    Not supported yet but might work.

## Update

=== "macOS"

    === "Homebrew"

        ## Release Channels

        ### Stable (Recommended for Production)

        ```bash
        brew update
        brew upgrade easyrunner-cli
        ```

        ### Beta (Preview Releases)

        ```bash
        brew update
        brew upgrade easyrunner-cli-beta
        ```

        **When to use:** Testing new features, providing feedback, or development environments where you want the latest features.

