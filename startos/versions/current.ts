import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.55.7:1',
  releaseNotes: {
    en_US:
      'Updates the LinuxServer image and capitalizes the StartOS display name.',
    es_ES:
      'Actualiza la imagen de LinuxServer y pone en mayusculas el nombre mostrado en StartOS.',
    de_DE:
      'Aktualisiert das LinuxServer-Image und schreibt den StartOS-Anzeigenamen gross.',
    pl_PL:
      'Aktualizuje obraz LinuxServer i kapitalizuje nazwe wyswietlana w StartOS.',
    fr_FR:
      "Met a jour l'image LinuxServer et met en majuscule le nom affiche dans StartOS.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
