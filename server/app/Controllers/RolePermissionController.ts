import BaseController from './BaseController'
import RolePermissionModel from "@root/server/app/Models/RolePermissionModel";
import PermissionModel from "@root/server/app/Models/PermissionModel";
import RoleModel from "@root/server/app/Models/RoleModel";
import ApiException from '@app/Exceptions/ApiException'

export default class PermissionController extends BaseController {
  Model: any = PermissionModel;
  RolePermissionModel: any = RolePermissionModel;
  RoleModel: any = RoleModel;

  async update() {
    const allowFields = {
      roleId: "number!"
    }
    let inputs = this.request.all();
    let auth = this.request.auth;
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });

    const { roleId } = params;
    const { permissions } = inputs

    if (!permissions) throw new ApiException(6005, "No data");

    let role = await this.RoleModel.getById(roleId)
    if (!role) throw new ApiException(6000, "User role doesn't exist!")

    for (let key in permissions) {
      const value = permissions[key]

      const exist = await this.Model.getByKey(key);
      if (!exist) throw new ApiException(7003, `${key} doesn't exist`);

      const role = await this.RolePermissionModel.getByPermissionKey({ key, roleId: roleId });
      // kiem tra gia tri moi cua quyen
      if (!value) { //truong hop xoa bo quyen cu
        await this.RolePermissionModel.query().delete().where({ roleId: roleId, key });
      }
      else if (!role) { //quyen moi chua ton tai trong DB
        await this.RolePermissionModel.insertOne({
          key,
          roleId: roleId,
          permissionId: exist.id,
          value, createdBy: auth.id
        });
      }
      else if (role.value != value) { //update lai gia tri moi
        await this.RolePermissionModel.updateOne(role.id, { value: value })
      }
    }

    return { message: `Update successfully` }
  }

  async getPermissionByGroupId() {
    const { auth } = this.request
    const allowFields = {
      roleId: "number!"
    }
    let inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });

    let role = await this.RoleModel.getById(params.roleId)
    if (!role) throw new ApiException(6000, "User role doesn't exist!")

    let permissions = await this.Model.query().whereNot({key : 'root'})

    for (let index in permissions) {
      let permission = permissions[index]
      let result = await permission.$relatedQuery('rolePermission').where('roleId', role.id).first()
      if (result) permissions[index]['currentValue'] = result.value
      else permissions[index]['currentValue'] = 0
    }

    role['permissions'] = permissions

    return [role]
  }
}
