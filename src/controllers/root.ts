import { AllowedAddressModel } from '@/models/AllowedAddress'
import { Body, Controller, Flow, Get, Post, Put } from 'amala'
import { MerkleTree } from 'merkletreejs'
import { utils } from 'ethers'
import AddressBody from '@/validators/AddressBody'
import authenticate from '@/middlewares/authenticate'
import dosuInvites from '@/helpers/dosuInvites'

@Controller('/')
export default class LoginController {
  @Post('/allowlist')
  @Flow(authenticate)
  async addAddress(@Body({ required: true }) { address }: AddressBody) {
    let allowedAddress = await AllowedAddressModel.findOne({ address })
    if (!allowedAddress) {
      allowedAddress = await AllowedAddressModel.create({ address })
    }
    return allowedAddress
  }

  @Get('/allowlist')
  getAllowedAddress() {
    return AllowedAddressModel.find()
  }

  @Put('/merkle-tree')
  @Flow(authenticate)
  async updateMerkleTreeRoot() {
    const addresses = (await AllowedAddressModel.find()).map((a) => a.address)
    const merkleTree = new MerkleTree(addresses, utils.keccak256, {
      sortPairs: true,
      hashLeaves: true,
    })
    const currentContractMerkleTreeRoot =
      await dosuInvites.allowlistMerkleRoot()
    const needsUpdating =
      currentContractMerkleTreeRoot !== merkleTree.getRoot().toString()
    if (needsUpdating) {
      const tx = await dosuInvites.setAllowlistMerkleRoot(merkleTree.getRoot())
      await tx.wait()
    }
    return { updated: needsUpdating }
  }
}
