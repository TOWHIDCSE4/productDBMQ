import BaseController from './BaseController'
import RoleModel from '@root/server/app/Models/RoleModel'
import UserModel from '@root/server/app/Models/UserModel'
import ApiException from '@app/Exceptions/ApiException'
import constantConfig from '@config/constant'
import { removeVietnameseTones } from '@helpers/utils'
import _ from 'lodash'

const { roleKey } = constantConfig

export default class RoleController extends BaseController {
  Model: any = RoleModel
  UserModel: any = UserModel

  async index() {
    const inputs = this.request.all();
    const project = ['roles.*', 'ag.name as parentName']

    let result = await this.Model.query()
      .leftJoin('roles as ag', 'roles.parentId', 'ag.id')
      .whereNot('roles.key', 'root')
      .select(project)
      .getForGridTable(inputs);

    return result;
  }

  async detail() {
    const allowFields = {
      id: "number!"
    }
    let inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });

    let result = await this.Model.getById(params.id);
    if (!result) throw new ApiException(6000, "Role Group doesn't exist!")

    return result
  }

  async select2() {
    const data = this.request.all()
    const project = [
      'name as label',
      'id as value'
    ]
    let result = await this.Model.query()
      .select(project)
      .getForGridTable(data);

    return result;
  }

  async store() {
    const { auth } = this.request
    const allowFields = {
      name: "string!",
      description: "string",
      parentId: "number"
    }
    let inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });

    let name = params.name.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')

    let exist = await this.Model.findExist(name, 'name')
    if (exist) throw new ApiException(6002, "Role Group name already exists!")

    // let parentExist = await this.Model.getById(params.parentId);
    // if (!parentExist) throw new ApiException(6000, "Role Group doesn't exist!")
    let key = removeVietnameseTones(params.name)
    let result = await this.Model.insertOne({ ...params, createdBy: auth.id,key });

    return result
  }

  async update() {
    const { auth } = this.request
    const allowFields = {
      id: "number!",
      name: "string!",
      description: "string",
      parentId: "number"
    }
    let inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });

    let { id, parentId } = params
    delete params.id

    let exist = await this.Model.getById(id);
    if (!exist) throw new ApiException(6000, "Role doesn't exist!");

    let existUserGroupName = await this.Model.findExist(params.name, 'name');
    if (existUserGroupName && existUserGroupName.id != id) {
      throw new ApiException(6002, "Role name already exists!");
    }

    if (parentId) {
      let parentExist = await this.Model.getById(params.parentId);
      if (!parentExist) throw new ApiException(6000, "Role doesn't exist!")
    }

    let result = await this.Model.updateOne(id, { ...params, updatedBy: auth.id });

    return result
  }

  async destroy() {
    const allowFields = {
      id: "number!"
    }
    const inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });

    let role = await this.Model.getById(params.id);
    if (!role) throw new ApiException(6000, "Role doesn't exist!")

    if (role.key === roleKey.root) throw new ApiException(6003, "Cannot delete root!")

    let checkUser = await this.UserModel.query().where('roleId', role.id)
    if (!_.isEmpty(checkUser)) throw new ApiException(6004, "Role contains user cannot be deleted!")

    let result = await this.Model.deleteById(role.id);
    return result
  }

  async delete() {
    const allowFields = {
      ids: ["number!"]
    }
    const inputs = this.request.all();
    let params = this.validate(inputs, allowFields);

    let roles = await this.Model.query().whereIn('id', params.ids);
    if (roles.length !== params.ids.length) throw new ApiException(6000, "Role doesn't exist!")

    let role = roles.find(role => role.key === roleKey.root)
    if (role) throw new ApiException(6003, "Cannot delete root group!")

    let checkUser = await this.UserModel.query().whereIn('roleId', params.ids)
    if (!_.isEmpty(checkUser)) throw new ApiException(6004, "Role contains user cannot be deleted!")

    let result = await this.Model.deleteByIds(params.ids);
    return result
  }
}
