# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `changedetection`.** Single `ui` interface on the `ui-multi` MultiHost; no dependents.
- **App-native login, hash-only storage.** The "Manage Access" action toggles changedetection.io's own login by injecting the `SALTED_PASS` env var (PBKDF2-HMAC-SHA256, computed in `startos/utils.ts`). Only the salted hash is persisted (`store.json`, never plaintext); `main.ts` reads it reactively so toggling access restarts the service to apply it.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach changedetection -n changedetection-sub -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `changedetection-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
