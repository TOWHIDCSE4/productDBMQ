import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { Button, Form, Col, Row } from 'antd';
import productService from '@root/src/services/productServices';
import to from 'await-to-js'
import useBaseHook from '@src/hooks/BaseHook'
import { LeftCircleFilled, SaveFilled } from '@ant-design/icons';
import ProductsForm from '@src/components/Admin/Products/ProductsForm';

const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })

const Create = () => {
  const { t, notify, redirect, router } = useBaseHook();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  //submit form
  const onFinish = async (values: any): Promise<void> => {
    
    setLoading(true)
    let {...otherValues } = values;
    let [error, result]: any[] = await to(productService().withAuth().create(otherValues));
    console.log(error , otherValues)
    setLoading(false)
    if (error) return notify(t(`errors:${error.code}`), '', 'error')
    notify(t("messages:message.recordProductCreated"))
    redirect("frontend.admin.products.index")
    return result
  }

  return <>
    <div className="content">
      <Form
        form={form}
        name="createAdmin"
        layout="vertical"
        initialValues={{
          productId: "",
          productName: "",
          brand: "",
          modelName: "",
          madeIn: "",
          price: "",
          status: "",
          activeDate: "",
          expriedDate: "",
          tags: []
        }}   
        onFinish={onFinish}
        scrollToFirstError
      >
        <Row>
          <Col md={{span: 16, offset: 4}}>
            <ProductsForm form={form} isEdit={false} />
            <Form.Item wrapperCol={{ span: 24 }} className="text-center">
              <Button onClick={() => router.back()} className="btn-margin-right">
                <LeftCircleFilled /> {t('buttons:back')}
              </Button>
              <Button type="primary" htmlType="submit" loading={loading} className="btn-margin-right">
                <SaveFilled /> {t('buttons:submits')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  </>
}

Create.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t("pages:products.create.title")}
    description={t("pages:products.create.description")}
    {...props}
  />
}

Create.permissions = {
  "products": "C"
}

export default Create
