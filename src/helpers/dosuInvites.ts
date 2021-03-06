import { DosuInvites__factory } from '@big-whale-labs/dosu-invites-contract'
import contractOwnerWallet from '@/helpers/contractOwnerWallet'
import env from '@/helpers/env'

export default DosuInvites__factory.connect(
  env.DOSU_INVITES_CONTRACT_ADDRESS,
  contractOwnerWallet
)
