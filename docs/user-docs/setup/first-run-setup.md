# First-Run Setup

Run setup once after installing the CLI.

```bash
er setup
```

For a first machine, use server mode:

```bash
er setup --mode server
```

## Modes

| Mode | Meaning | First setup? |
| --- | --- | --- |
| `server` | This EasyRunner install stores control-plane state locally. | Yes |
| `client` | This install sends commands to another EasyRunner server-mode install. | Later |
| `both` | This install stores state and can also talk to another server-mode install. | Advanced |

!!! note "Server mode is not your web host"
    Server mode describes where EasyRunner stores its own state. Your web hosts are the Ubuntu machines managed with `er server ...`.

## Check Configuration

```bash
er config show
er doctor
```

Use `er doctor` when setup or local prerequisites feel off.
