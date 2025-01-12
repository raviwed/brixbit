import { keystore } from '@brixbit/proto'

export class KeystoreError extends Error implements keystore.KeystoreError {
  code: keystore.ErrorCode

  constructor(code: keystore.ErrorCode, message: string) {
    super(message)
    this.code = code
  }
}
