import * as dotenv from 'dotenv'
import { ETH_NETWORK, ETH_RPC } from '@big-whale-labs/constants'
import { cleanEnv, num, str } from 'envalid'
import { cwd } from 'process'
import { resolve } from 'path'

dotenv.config({ path: resolve(cwd(), '.env') })

// eslint-disable-next-line node/no-process-env
export default cleanEnv(process.env, {
  PORT: num({ default: 1337 }),
  MONGO: str(),
  DOSU_INVITES_CONTRACT_ADDRESS: str(),
  CONTRACT_OWNER_PRIVATE_KEY: str(),
  ETH_NETWORK: str({ default: ETH_NETWORK }),
  ETH_RPC: str({ default: ETH_RPC }),
  PASSWORD: str(),
})
