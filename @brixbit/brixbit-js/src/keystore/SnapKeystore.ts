import { SnapMeta, snapRPC } from './snapHelpers'
import type { BrixbitEnv } from '../Client'
import {
  SnapKeystoreApiEntries,
  SnapKeystoreApiRequestValues,
  SnapKeystoreInterface,
  snapApiDefs,
} from './rpcDefinitions'

export function SnapKeystore(
  walletAddress: string,
  env: BrixbitEnv,
  snapId: string
) {
  const generatedMethods: Partial<SnapKeystoreInterface> = {}

  const snapMeta: SnapMeta = {
    walletAddress,
    env,
  }

  for (const [method, rpc] of Object.entries(
    snapApiDefs
  ) as SnapKeystoreApiEntries) {
    generatedMethods[method] = async (req?: SnapKeystoreApiRequestValues) => {
      if (!rpc.req) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return snapRPC(method, rpc, undefined, snapMeta, snapId) as any
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return snapRPC(method, rpc, req, snapMeta, snapId) as any
    }
  }

  return {
    ...generatedMethods,
    // Don't bother calling the keystore, since we already have the wallet address
    async getAccountAddress() {
      return walletAddress
    },
  } as SnapKeystoreInterface
}
