# Secure Access with the Mesh VPN

The mesh is an optional private network between your machine and your EasyRunner web hosts, built on [WireGuard](https://www.wireguard.com/). Its main purpose is to let you lock SSH down to that private network so port 22 is no longer reachable from the public internet, while HTTP/HTTPS stay open for your apps.

!!! note "Optional and advanced"
    The mesh is not required for the normal install → deploy path. Reach for it when you want to reduce your servers' SSH attack surface. The mesh CLI is currently developed and tested on macOS.

## What Problem It Solves

A server with SSH open to the internet is a constant target for port scanners, brute-force attempts, and credential stuffing. The mesh lets you move SSH off the public internet entirely: after you lock a server, `sshd` only answers on the private WireGuard interface, and the public port 22 shows as filtered to the outside world.

## How It Works

EasyRunner builds a **hub-and-spoke** WireGuard network. Your machine (the CLI) is the hub; each server you join is a spoke.

```text
        ┌──────────────────────────┐
        │  Your machine (CLI hub)  │  10.99.0.254
        └────────────┬─────────────┘
                     │ WireGuard (UDP 51820)
        ┌────────────┼─────────────┐
        ▼            ▼             ▼
   ┌─────────┐  ┌─────────┐   ┌─────────┐
   │ server  │  │ server  │   │ server  │
   │10.99.0.1│  │10.99.0.2│   │10.99.0.3│
   └─────────┘  └─────────┘   └─────────┘
```

| Property | Value |
| --- | --- |
| Topology | Hub-and-spoke; your machine is the hub, servers are spokes |
| Mesh subnet | `10.99.0.0/24` |
| Your machine's mesh IP | `10.99.0.254` |
| Server mesh IPs | Assigned from `10.99.0.1` upward as servers join |
| Transport | WireGuard over UDP port `51820` |
| Local interface | `wg0` |

Once a server is locked, EasyRunner automatically routes its SSH commands (`er app deploy`, `er app logs`, etc.) over the server's mesh IP. You do not change how you run commands.

## Prerequisites

The mesh needs the `wireguard-tools` package on your machine. Check and install prerequisites with:

```bash
er doctor        # (1)!
er doctor --fix  # (2)!
```

1. Reports whether CLI prerequisites such as `wireguard-tools` are installed.
2. Attempts to install any that are missing.

On macOS you can also install it directly with `brew install wireguard-tools`. Mesh commands require `sudo` because they bring network interfaces up and down; the CLI prompts for it when needed.

## 1. Initialize the Mesh

Run this once on your machine. It generates the CLI's WireGuard keypair and brings up the local `wg0` interface.

```bash
er mesh init
```

The output shows the mesh subnet, the listen port, and your machine's mesh IP (`10.99.0.254`).

## 2. Join a Server

```bash
er mesh join my-server
```

Joining a registered server does several things for you:

- Installs and starts WireGuard on the server.
- Adds the server as a peer on your local `wg0` interface and assigns it a mesh IP.
- Opens UDP `51820` on the server's host firewall **and** on the cloud-provider firewall. For Hetzner, EasyRunner reconciles the cloud firewall automatically (best-effort; it warns if it can't, for example when no Hetzner link is present).

!!! tip "Backfilling firewall rules"
    If a server was initialized by an older CLI version and is missing mesh-related firewall rules, run [`er server reapply-firewall my-server`](operations.md#reapply-firewall-policy).

## 3. Check Status and Health

```bash
er mesh status   # (1)!
er mesh doctor   # (2)!
```

1. Lists the mesh subnet, listen port, and every peer with its mesh IP, endpoint, and key. Your machine (the hub) is shown first.
2. Diagnoses mesh health: `wireguard-tools` installed, mesh initialized, interface up, stored config in sync with the live interface, and — per peer — that a route is installed and a handshake was seen recently.

Confirm the tunnel is healthy with `er mesh status` and that you can reach the server over its mesh IP **before** locking SSH down.

## 4. Lock SSH to the Mesh

```bash
er mesh lock my-server
```

After this, the server's firewall only accepts SSH on the `wg0` interface. Public port 22 becomes unreachable from the internet; ports 80 and 443 stay open. EasyRunner routes its own SSH for the server over the mesh from this point on.

!!! warning "Safety: the dead-man's switch"
    `er mesh lock` arms a timer on the server that automatically reverts the firewall if no WireGuard handshake is seen within roughly 150 seconds. A broken tunnel therefore re-opens public SSH on its own rather than locking you out permanently. The threshold is wider than WireGuard's natural rekey interval, so a healthy but idle tunnel still passes.

Use `er mesh lock my-server --yes` to skip the confirmation prompt in scripts.

## 5. Reopen Public SSH

```bash
er mesh unlock my-server
```

Use this when you need public SSH back — for example before rotating keys or decommissioning the mesh on that server. While the lockdown is in force this command reaches the server over the mesh IP, so a healthy tunnel is required.

## If the Tunnel Breaks While Locked

The dead-man's switch from `er mesh lock` reverts the firewall automatically if no handshake is observed within the freshness window. If you need access sooner, open a root shell through your VPS provider's web console / VNC and run:

```bash
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -D INPUT -i wg0 -p tcp --dport 22 -j ACCEPT
```

Then SSH back in over the public IP and run `er mesh unlock my-server` from the CLI to clear the local lockdown state.

## Day-to-Day

=== "After a reboot"

    macOS does not persist the WireGuard interface across reboots. If `er mesh doctor` reports the interface is down, bring it back up:

    ```bash
    er mesh up
    ```

=== "Pause without destroying"

    Bring the local interface down without losing the mesh config or keys:

    ```bash
    er mesh down
    er mesh up    # bring it back later
    ```

=== "Remove a server"

    ```bash
    er mesh leave my-server
    ```

    This stops WireGuard on the server, removes the peer locally, and removes the UDP `51820` firewall rule (including the cloud-provider rule).

## Command Summary

| Task | Command |
| --- | --- |
| Initialize the local mesh | `er mesh init` |
| Bring the local interface up / down | `er mesh up` / `er mesh down` |
| Join / remove a server | `er mesh join <server>` / `er mesh leave <server>` |
| Show status and peers | `er mesh status` |
| Diagnose mesh health | `er mesh doctor` |
| Lock / unlock SSH | `er mesh lock <server>` / `er mesh unlock <server>` |

See the [CLI Command Reference](../reference/commands.md) for the full command list.
