import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'changedetection',
  title: 'ChangeDetection.io',
  license: 'GPL-3.0',
  packageRepo: 'https://github.com/BeeJoe/changedetection-startos',
  upstreamRepo: 'https://github.com/dgtlmoon/changedetection.io',
  marketingUrl: 'https://changedetection.io/',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerTag: 'lscr.io/linuxserver/changedetection.io:0.55.7-ls296',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
