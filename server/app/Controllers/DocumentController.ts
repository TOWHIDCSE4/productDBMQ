import BaseController from './BaseController'
import DocumentModel from '@root/server/app/Models/DocumentModel'
import UserModel from '@root/server/app/Models/UserModel'
import ApiException from '@app/Exceptions/ApiException'
import constantConfig from '@config/constant'
import _ from 'lodash'
const { roleKey } = constantConfig

export default class DocumentController extends BaseController {
  Model: any = DocumentModel
  UserModel: any = UserModel

  async index() {
    const data = this.request.all()
    let result = await this.Model.query().getForGridTable(data);
    return result;
  }

  async detail({ allowFields = '*' }) {
    let params = this.request.all()
    let id = params.id
    if (!id) throw new ApiException(9996, "ID is required!");
    let result = await this.Model.query().findById(id, allowFields);
    if (!result) {
      throw new ApiException(7002, 'Data not found')
    }
    return result
  }

}
