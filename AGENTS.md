# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **`runAsInit: true` is load-bearing.** The base is a LinuxServer s6-overlay image and needs PID 1.
- **`SALTED_PASS` is read by the app ahead of its own datastore password**, which is what lets the package own the login without writing into the app's data. Don't "fix" this by editing the app's settings file instead — the two would then disagree.
