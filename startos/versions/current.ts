import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.55.7:3',
  releaseNotes: {
    en_US: 'Updates the LinuxServer image to the 0.55.7-ls298 build.',
    es_ES: 'Actualiza la imagen de LinuxServer a la compilación 0.55.7-ls298.',
    de_DE: 'Aktualisiert das LinuxServer-Image auf den Build 0.55.7-ls298.',
    pl_PL: 'Aktualizuje obraz LinuxServer do kompilacji 0.55.7-ls298.',
    fr_FR: "Met à jour l'image LinuxServer vers la build 0.55.7-ls298.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
