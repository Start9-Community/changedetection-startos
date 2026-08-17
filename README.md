<p align="center">
  <img src="icon.svg" alt="ChangeDetection.io Logo" width="21%">
</p>

# ChangeDetection.io on StartOS

> Everything not listed in this document should behave the same as upstream
> ChangeDetection.io. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[ChangeDetection.io](https://github.com/dgtlmoon/changedetection.io) watches web pages and tells you when they change. This package runs the LinuxServer image unmodified and adds one thing: a way to turn the application's own login on and off from StartOS, without handing it a plaintext password.

- **Upstream repo:** <https://github.com/dgtlmoon/changedetection.io>
- **Wrapper repo:** <https://github.com/Start9-Community/changedetection-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One upstream image, consumed unmodified.

| Property      | Value                                      |
| ------------- | ------------------------------------------ |
| Image         | `lscr.io/linuxserver/changedetection.io`   |
| Architectures | x86_64, aarch64                            |
| Entrypoint    | The image's own, via `sdk.useEntrypoint()` |

| Subcontainer          | Purpose                                  |
| --------------------- | ---------------------------------------- |
| `changedetection-sub` | The only daemon — the one to `attach` to |

**`runAsInit: true` is required**, not stylistic: this is a LinuxServer image built on s6-overlay, which must be PID 1.

The package sets the standard LinuxServer user, group, and timezone variables, and turns off the application's upstream version check — a self-hosted install has no use for a nag about a release it cannot apply itself.

## Volume and Data Layout

One volume, holding everything the application keeps.

| Volume | Mount Point | Purpose                                            |
| ------ | ----------- | -------------------------------------------------- |
| `main` | `/config`   | Watches, snapshot history, settings, and the store |

Change history grows with the number of watches and how often they change, so this volume is the one that grows over time — and it is entirely in the backup.

## File Models

One model, and what it does **not** hold is the point.

| File         | Format | Modelled                | Written by               |
| ------------ | ------ | ----------------------- | ------------------------ |
| `store.json` | JSON   | Yes — `FileHelper.json` | The Manage Access action |

It holds exactly one field: a **salted PBKDF2 hash** of the web password. The plaintext is never written anywhere — it is shown once in the action's result and then exists only wherever the user saved it.

The hash is computed to the format the application itself expects, and handed to it as environment. The application reads that variable **ahead of** the password in its own datastore, which is what lets the package control the login without writing into the application's data at all — no editing its settings file, no risk of the two disagreeing.

`main` reads the field reactively, so turning access on or off restarts the service and the change takes effect immediately.

Everything else — watches, notification settings, schedules, proxies — belongs to the application and its own configuration on the volume. The package neither seeds nor rewrites any of it.

## Dependencies

None.

## Network Access and Interfaces

One interface.

| Interface | Id   | Type | Port | Description                          |
| --------- | ---- | ---- | ---- | ------------------------------------ |
| Web UI    | `ui` | ui   | 5000 | The ChangeDetection.io web interface |

Bound on the `ui-multi` MultiHost over HTTP and not masked.

**By default there is no login.** Anyone who can reach the address can add, edit, and delete watches, and read everything the instance has captured. That is upstream's default and the package keeps it — StartOS's per-address controls are the access boundary until [Manage Access](#actions) is used to add a password.

The application also makes **outbound** requests to every page it watches, on its own schedule. Those requests come from the server, so a watched site sees the server's address rather than the user's.

## Installation and First-Run Flow

There is no wizard, no task, and no credential. The service starts and the interface is immediately usable, with no login.

The decision worth making early is whether to leave it that way. An instance reachable beyond a trusted LAN should have a password set before watches are added, because the watch list itself reveals what is being monitored.

## Actions

One action.

### Manage Access

Turns the application's login on or off. Run it to add a password, to change one, or to remove the requirement entirely.

- **What it changes:** the password hash in the store, and through it the application's login on the next start.
- **Cost:** the service restarts.
- **Repeat safety:** idempotent in effect. Choosing **Private** always sets a **fresh** password — the field starts empty even when a password already exists, because only the hash is kept and the old plaintext cannot be shown again.
- **Outputs:** the new password, once, when setting one. Nothing is output when opening the instance back up.
- **Choosing Public removes the login**, immediately reopening the instance to anyone who can reach it.

The password field can generate a strong random value or take one you type.

## Tasks

None. This package raises no tasks, so the service is never held on a prompt and its ordinary controls are always available.

## Health Checks

One check, on the only daemon.

| Check     | Displayed as    | Method                 |
| --------- | --------------- | ---------------------- |
| `primary` | "Web Interface" | Port 5000 is listening |

It reports that the interface is serving, not that watches are succeeding. A watch that cannot reach its target, or that a site is blocking, shows inside the application rather than here.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. That is every watch, the full snapshot history, the application's settings, and the password hash.

A restored instance comes back complete, still requiring the same password if one was set — the hash travels with it. Nothing needs re-entering.

The practical caveat is size: snapshot history is the bulk of the volume and grows with every detected change, so the backup grows with it. Pruning history is done inside the application.

## Limitations and Differences

1. **No login by default.** Upstream ships open, and the package keeps that until Manage Access is used.
2. **A password cannot be read back**, only replaced. Only the hash is stored.
3. **The password is StartOS's, not the application's own setting.** It is injected as environment and takes precedence over anything set inside the app, so changing it there will not have the effect the user expects.
4. **The upstream version check is disabled**, so the application will not tell you a newer release exists — updates come through StartOS.
5. **Watch traffic originates from the server**, and there is no package-level proxy setting; configure one inside the application if it matters.

---

## Quick Reference for AI Consumers

```yaml
package_id: changedetection # note: the title is "ChangeDetection.io"
image: lscr.io/linuxserver/changedetection.io
architectures:
  - x86_64
  - aarch64
subcontainers:
  - changedetection-sub
volumes:
  main: /config
file_models:
  - store.json # holds only a salted password hash
startos_managed_env_vars:
  - PUID
  - PGID
  - TZ
  - DISABLE_VERSION_CHECK
  - SALTED_PASS # only when a password is set
dependencies: []
interfaces:
  ui: { type: ui, port: 5000 }
actions:
  - manage-access
tasks: []
health_checks:
  - primary # displayed "Web Interface"
```
