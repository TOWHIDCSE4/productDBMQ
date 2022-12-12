import BaseModel from './BaseModel'

class RoleModel extends BaseModel {
  static tableName = "roles"

  //fields
  id: number;
  name: string;
  description: any;
}

export default RoleModel
