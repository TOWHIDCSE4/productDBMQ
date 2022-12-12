import Base from "./baseService";

class productServices extends Base {
  index = async (filter: any) => {
    return this.request({
      url: "/api/v1/products",
      method: "GET",
      data: filter,
    });
  };

  create = async (data: any) => {
    return this.request({
      url: "/api/v1/products",
      method: "POST",
      data: data,
    });
  };

  detail = async (data: any) => {
    return this.request({
      url: "/api/v1/products/:id",
      method: "GET",
      data: data,
    });
  };

  edit = async (data: any) => {
    return this.request({
      url: "/api/v1/products/:id",
      method: "PUT",
      data: data,
    });
  };

  delete = async (data: any) => {
    return this.request({
      url: "/api/v1/products",
      method: "DELETE",
      data: data,
    });
  };

  destroy = async (data: any) => {
    return this.request({
      url: "/api/v1/products/:id",
      method: "DELETE",
      data: data,
    });
  };
}

export default () => new productServices();
