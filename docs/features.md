# Features

<div class="grid cards" markdown>

-   #### Server Spin Up Automation

    ---

    Launch an Ubuntu 24.04 VPS/VM in _your_ cloud provider account with a single `er server create` command. 

    Current support for: Hetzner. More providers coming soon.


-   #### Configure a Server as a Web Host

    ---

    A single `er server init` command configures _your_ Ubuntu VPS/VM as a secure web host.

-   #### CIS Level 1 Server Hardening OTB [Coming]

    ---

    Your Ubuntu server hardened to CIS Level 1 Server [benchmark](https://www.cisecurity.org/cis-benchmarks-overview) profile out-of-the-box.

    Involves 100s of configurations to provide a solid server security foundation.


-   #### Container Based App Hosting

    ---

    Your applications run in containers. Podman is the container runtime.

-   #### Intrusion Prevention. OOTB

    ---

    Fail2Ban installed and configured OOTB.

    Ability to add your own policies (coming)


-   #### Private Mesh VPN + SSH Lockdown

    ---

    Build a WireGuard mesh between your machine and your servers with `er mesh`, then lock SSH down to that private network so port 22 is no longer exposed to the public internet. A dead-man's switch guards against accidental lockout.


-   #### Application Security Scanning

    ---

    Scan your deployed apps for information-disclosure vulnerabilities with a single `er server security-scan` command.


-   #### CI/CD - Deploy Easily

    ---

    Multiple deploy flows to securely ship your application.

    Flow A: trigger from the CLI and build the image on the web host.

    Flow B: deploy a pre-built image from a container registry such as GHCR (private images supported).

    Git push trigger (coming). Git push + GitHub Action build (coming).


-   #### Host Multiple Apps on a Single Server

    ---

    Gives you the option the host multiple apps on a large server.

-   #### Custom domains + HTTPS always

    ---

    Configure your apps with custom domains. HTTPS is the default and configured automatically. TLS certs issued by Let's Encrypt and automatically renewed.


-   #### Manage Multiple Web Host Servers

    ---

    Give you the option to host each app on a smaller server or spread your apps across servers as you wish.


-   #### Apps can be composed of several services

    ---

    Define your application's composition using as a Docker compose file. You can define your UI and public API containers as public. Internal service containers will be on the internal network only.


-   #### Encrypted App Secrets

    ---

    Store per-app secrets in your system keyring with `er app secret`. They are injected into your containers at deploy time and kept out of your repo and Compose files.


-   #### Built-in Health Checks

    ---

    `er doctor` checks your local setup and `er server doctor` runs pass/fail diagnostics on a web host (container runtime, reverse proxy, firewall, connectivity) with remediation hints. `er server status` shows live runtime state, and missing CLI prerequisites install with `er doctor --fix`.


-   #### Predictable Cost

    ---

    You pick your cloud provider and server product hence know your where your cost is capped.


-   #### No Lock-in

    ---

    The freedom to switch cloud server provider. As easy as launching a server with the new provider. Run `er server init` and `er app deploy`. Finally cut over your DNS.

    Don't want to use EasyRunner any longer. No problem, you can still manually manage your servers.


-   #### Integrations

    ---

    Github: for automated secure CI/CD setup

    Hetzner: for automated server provisioning

    CloudFlare: for secure DNS record setup

</div>