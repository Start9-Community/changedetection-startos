import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { changedetectionSaltedPass } from '../utils'

const { InputSpec, Value, Variants } = sdk

const randomPassword = { charset: 'a-z,A-Z,0-9', len: 32 }

export const inputSpec = InputSpec.of({
  access: Value.union({
    name: i18n('Access'),
    description: i18n(
      '- Public: anyone who can reach the address can use the web UI.\n- Private (require login): the web UI asks for a password before it can be used.',
    ),
    default: 'public',
    variants: Variants.of({
      public: { name: i18n('Public'), spec: InputSpec.of({}) },
      private: {
        name: i18n('Private (require login)'),
        spec: InputSpec.of({
          password: Value.text({
            name: i18n('Password'),
            description: i18n(
              'Saving replaces any previous password. Only a hash of it is kept, so it is shown once after saving and cannot be retrieved later.',
            ),
            required: true,
            masked: true,
            default: randomPassword,
            generate: randomPassword,
          }),
        }),
      },
    }),
  }),
})

export const manageAccess = sdk.Action.withInput(
  // id
  'manage-access',

  // metadata
  async ({ effects }) => ({
    name: i18n('Manage Access'),
    description: i18n(
      'Require a password to access the changedetection.io web UI, or keep it open to anyone with the address.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // input spec
  inputSpec,

  // pre-fill: select private/public based on whether a password is set. Only
  // the salted hash is stored (never plaintext), so the password field starts
  // empty — choosing Private always sets a fresh password.
  async ({ effects }) => {
    const hasPassword = !!(await storeJson
      .read((s) => s?.uiPasswordHash)
      .once())
    return {
      access: hasPassword
        ? { selection: 'private' as const, value: { password: '' } }
        : { selection: 'public' as const, value: {} },
    }
  },

  // execution
  async ({ effects, input }) => {
    if (input.access.selection === 'private') {
      const { password } = input.access.value
      // Persist only the salted hash. Writing it flips the value main.ts reads
      // reactively, restarting the service so the app picks up SALTED_PASS. The
      // plaintext is returned to the user below and stored nowhere.
      await storeJson.merge(effects, {
        uiPasswordHash: changedetectionSaltedPass(password),
      })
      return {
        version: '1',
        title: i18n('Login Required'),
        message: i18n(
          'Your changedetection.io now requires this password to access the web UI. Log in at the app screen with the password below.',
        ),
        result: {
          type: 'group',
          value: [
            {
              type: 'single',
              name: i18n('Password'),
              description: null,
              value: password,
              masked: true,
              copyable: true,
              qr: false,
              launchable: false,
            },
          ],
        },
      }
    }

    await storeJson.merge(effects, { uiPasswordHash: undefined })
    return {
      version: '1',
      title: i18n('Now Open'),
      message: i18n(
        'Your changedetection.io web UI is now open — anyone with the address can use it.',
      ),
      result: null,
    }
  },
)
