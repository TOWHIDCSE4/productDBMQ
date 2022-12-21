import React from 'react'
import { Form, Input} from 'antd';
import useBaseHook from '@src/hooks/BaseHook'

const StaffInsuranceForm = () => {
  
  const { t } = useBaseHook();

  return <>
    <Form>
        <Form.Item
        label={t("pages:application.staffInsuranceForm.firstName")}
        name="firstName"
        rules={[
            { required: true, message: t('messages:form.required', { name: t('pages:application.staffInsuranceForm.firstName') }) },
            { whitespace: true, message: t('messages:form.required', { name: t('pages:application.staffInsuranceForm.firstName') }) },
            { max: 255, message: t('messages:form.maxLength', { name: t('pages:application.staffInsuranceForm.firstName'), length: 255 }) }
        ]}
        >
        <Input placeholder={t("pages:application.staffInsuranceForm.firstName")} />
        </Form.Item>
    </Form>
  </>
}

export default StaffInsuranceForm
