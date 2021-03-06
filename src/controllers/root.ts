import { AllowedAddressModel } from '@/models/AllowedAddress'
import { Body, Controller, Flow, Get, Post, Put } from 'amala'
import { MerkleTree } from 'merkletreejs'
import { keccak256 } from 'ethers/lib/utils'
import AddressBody from '@/validators/AddressBody'
import authenticate from '@/middlewares/authenticate'
import dosuInvites from '@/helpers/dosuInvites'

@Controller('/')
export default class RootController {
  @Post('/allowlist')
  @Flow(authenticate)
  async addAddress(@Body({ required: true }) { addresses }: AddressBody) {
    console.log(`POST /allowlist: ${addresses}`)
    for (const address of addresses) {
      let allowedAddress = await AllowedAddressModel.findOne({ address })
      if (!allowedAddress) {
        console.log(`Adding address: ${address}`)
        allowedAddress = await AllowedAddressModel.create({ address })
      }
      console.log(`Allowed address ${allowedAddress.address}`)
    }
    return { success: true }
  }

  @Get('/allowlist')
  async getAllowedAddress() {
    return (await AllowedAddressModel.find()).map((a) => a.address)
  }

  @Put('/merkle-tree')
  @Flow(authenticate)
  async updateMerkleTreeRoot() {
    console.log('Updating merkle tree root...')
    const addresses = (await AllowedAddressModel.find()).map((a) => a.address)
    console.log(`Found ${addresses.length} addresses: ${addresses}`)
    const merkleTree = new MerkleTree(addresses, keccak256, {
      sortPairs: true,
      hashLeaves: true,
    })
    const newRoot = merkleTree.getHexRoot()
    console.log(`New merkle tree root: ${newRoot}`)
    console.log('Getting the current merkle tree root...')
    const currentContractMerkleTreeRoot =
      await dosuInvites.allowlistMerkleRoot()
    console.log(`Current merkle tree root: ${currentContractMerkleTreeRoot}`)
    const needsUpdating = currentContractMerkleTreeRoot !== newRoot
    if (needsUpdating) {
      console.log('Updating merkle tree root to', newRoot)
      const tx = await dosuInvites.setAllowlistMerkleRoot(newRoot)
      await tx.wait()
      console.log('Merkle tree root updated!')
    }
    return { updated: needsUpdating }
  }

  @Get('/contract-address')
  getContractAddress() {
    return { address: dosuInvites.address }
  }
}
