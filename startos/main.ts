import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting ChangeDetection.io'))

  // changedetection.io reads SALTED_PASS ahead of its datastore password, so
  // injecting the hash set by the "Manage Access" action enables the upstream
  // login. Read reactively so toggling access restarts the service to apply it.
  const saltedPass = await storeJson
    .read((s) => s?.uiPasswordHash)
    .const(effects)

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: sdk.SubContainer.of(
      effects,
      { imageId: 'main' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: '/config',
        readonly: false,
      }),
      'changedetection-sub',
    ),
    exec: {
      command: sdk.useEntrypoint(),
      runAsInit: true,
      env: {
        PUID: '1000',
        PGID: '1000',
        TZ: 'Etc/UTC',
        DISABLE_VERSION_CHECK: 'true',
        // MCP OAuth discovery must preserve the client-facing origin behind StartOS.
        USE_X_SETTINGS: '1',
        // Select Playwright for custom WebSocket browser connections as well
        // as watches with browser steps. Custom connections in the app override
        // this upstream default; no browser companion is provided here.
        PLAYWRIGHT_DRIVER_URL: 'ws://playwright-chrome:3000',
        ...(saltedPass ? { SALTED_PASS: saltedPass } : {}),
      },
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
