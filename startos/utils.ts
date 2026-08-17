import { pbkdf2Sync, randomBytes } from 'node:crypto'

export const uiPort = 5000

/**
 * Compute the value changedetection.io expects in its `SALTED_PASS` env var.
 *
 * changedetection.io derives the key with PBKDF2-HMAC-SHA256, a 32-byte random
 * salt, and 100,000 iterations, then stores `base64(salt + derivedKey)`.
 * Verified against changedetectionio/flask_app.py `check_password()`; re-check
 * the parameters on a version bump, since a silent mismatch locks the user out. The app
 * reads `SALTED_PASS` ahead of its datastore password, so injecting this value
 * enables the upstream login without writing to the datastore.
 */
export function changedetectionSaltedPass(password: string): string {
  const salt = randomBytes(32)
  const key = pbkdf2Sync(password, salt, 100_000, 32, 'sha256')
  return Buffer.concat([salt, key]).toString('base64')
}
