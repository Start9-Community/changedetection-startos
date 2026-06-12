# ChangeDetection.io

You've installed ChangeDetection.io, a web page and API change monitoring service. Use the web UI to add watches, review diffs, and configure notifications.

## Documentation

- [changedetection.io upstream docs](https://github.com/dgtlmoon/changedetection.io) - upstream usage, notifications, filters, API, and browser fetcher documentation.
- [changedetection.io tutorials](https://changedetection.io/tutorials) - practical examples for watches, alerts, and filters.

## What you get on StartOS

- **A persistent ChangeDetection.io instance** with its datastore backed up by StartOS.
- **A web UI and API** exposed through the service's **Web UI** interface.
- **Bundled Playwright content fetching** from the LinuxServer container image for browser-backed watches.
- **Upstream notification integrations** configured inside changedetection.io.

## Getting set up

1. Open the service's **Dashboard** tab.
2. Click the **Web UI** interface.
3. Configure application access control and notification settings in changedetection.io.
4. Add a watch URL, choose the content filters you need, and run a manual recheck to confirm the first snapshot.

## Backups

StartOS backs up the changedetection.io datastore. This includes watches, history, screenshots, settings, and imported data stored by the upstream app.

## Limitations

- The package does not manage separate WebDriver, remote Playwright, or sockpuppetbrowser companion containers. The bundled Playwright fetcher is available for browser-backed watches.
- All changedetection.io settings are managed in the web UI, not in a StartOS configuration form.
- Notification integrations must be reachable from your StartOS device.
- You are responsible for complying with the terms, robots policies, and laws that apply to the sites you monitor.
