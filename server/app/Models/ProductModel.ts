import BaseModel from './BaseModel'

class ProductModel extends BaseModel {
  static tableName = "products"

  //fields
//   id: number;
  name: string;
  brand: string;
  modelName: string;
  madeIn: string;
  price: number;
  activeDate: Date;
  expriedDate: Date;
}

export default ProductModel
