import React from "react";
import { Form, Input, Row, Col, Select } from "antd";
import useBaseHook from "@src/hooks/BaseHook";
import validatorHook from "@src/hooks/ValidatorHook";
import { LockOutlined } from "@ant-design/icons";
import roleService from "@src/services/roleService";
import userService from "@src/services/userService";
import useSWR from "swr";

const { Option } = Select;

const ProductsForm = ({ form, isEdit }: { form: any; isEdit: boolean}) => {
  const { t, getData } = useBaseHook();
  const { validatorRePassword, CustomRegex } = validatorHook();

  const { data: dataT } = useSWR("groupSelect2", () =>
  roleService().withAuth().select2({ pageSize: -1 })
  );

  const groups = ["Stack In" , "Stack Out" , "Expired"];



  const children = [];

  return (
    <Row gutter={[24, 0]}>
      <Col md={24}>
        <Form.Item
          label={t("pages:products.form.name")}
          name="name"
          rules={[
            { required: true, message: t("messages:form.required", { name: t("pages:products.form.name") }) },
            { whitespace: true, message: t("messages:form.required", { name: t("pages:products.form.name") }) },
            CustomRegex({
              length: 6,
              reGex: "^[0-9A-z._](\\w|\\.|_){5,100}$",
              message: t("messages:form.name"),
            }),
          ]}
        >
          <Input
            placeholder={t("pages:products.form.name")}
            readOnly={isEdit}
          />
        </Form.Item>
      </Col>


      <Col md={12}>
        <Form.Item
          label={t("pages:products.form.brand")}
          name="brand"
          rules={[
            { required: true, message: t("messages:form.required", { name: t("pages:products.form.brand") }) },
            { whitespace: true, message: t("messages:form.required", { name: t("pages:products.form.brand") }) },
            { max: 255, message: t("messages:form.maxLength", { name: t("pages:products.form.brand"), length: 255 }) },
          ]}
        >
          <Input placeholder={t("pages:products.form.brand")} />
        </Form.Item>
      </Col>

      <Col md={12}>
        <Form.Item
          label={t("pages:products.form.modelName")}
          name="modelName"
          rules={[
            { required: true, message: t("messages:form.required", { name: t("pages:products.form.modelName") }) },
            { whitespace: true, message: t("messages:form.required", { name: t("pages:products.form.modelName") }) },
            { max: 255, message: t("messages:form.maxLength", { name: t("pages:products.form.modelName"), length: 255 }) },
          ]}
        >
          <Input placeholder={t("pages:products.form.modelName")} />
        </Form.Item>
      </Col>

      <Col md={12}>
        <Form.Item
          label={t("pages:products.form.madeIn")}
          name="madeIn"
          rules={[
            { required: true, message: t("messages:form.required", { name: t("pages:products.form.madeIn") }) },
            { whitespace: true, message: t("messages:form.required", { name: t("pages:products.form.madeIn") }) },
            { max: 255, message: t("messages:form.maxLength", { name: t("pages:products.form.madeIn"), length: 255 }) },
          ]}
        >
          <Input placeholder={t("pages:products.form.madeIn")} />
        </Form.Item>
      </Col>
      <Col md={12}>
        <Form.Item
          label={t("pages:products.form.price")}
          name="price"
          rules={[
            { required: true, message: t("messages:form.required", { name: t("pages:products.form.price") }) },
            { whitespace: true, message: t("messages:form.required", { name: t("pages:products.form.price") }) },
            { max: 255, message: t("messages:form.maxLength", { name: t("pages:products.form.price"), length: 255 }) },
          ]}
        >
          <Input placeholder={t("pages:products.form.price")} />
        </Form.Item>
      </Col>

  

   
          {/* <Col md={24}>
            <Form.Item
              label={t("pages:products.form.status")}
              name="status"
              rules={[
                { required: true, message: t("messages:form.required", { name: t("pages:products.form.status") }) },
              ]}
            >
              <Select
                placeholder={t("pages:products.form.status")}
                allowClear
                showSearch
              >
                {groups.map((item) => (
                  <Option value={item} key={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col> */}
     


    </Row>
  );
};

export default ProductsForm;
