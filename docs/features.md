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


-   #### CI/CD - Deploy Easily

    ---

    Several CI/CD flows to securely deploy you application.

    CLI command trigger + web host build
    Git push trigger + web host build (coming)
    Git push trigger + Github Action build (coming)


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

    CloudFlare: for secure DNS record setup

</div>