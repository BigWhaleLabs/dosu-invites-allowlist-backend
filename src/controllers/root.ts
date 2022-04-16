import { AllowedAddressModel } from '@/models/AllowedAddress'
import { Body, Controller, Get, Post, Put } from 'amala'
import AddressBody from '@/validators/AddressBody'

@Controller('/')
export default class LoginController {
  @Post('/allowlist')
  async facebook(@Body({ required: true }) { address }: AddressBody) {
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
  updateMerkleTree() {
    return { updated: false }
  }
}
