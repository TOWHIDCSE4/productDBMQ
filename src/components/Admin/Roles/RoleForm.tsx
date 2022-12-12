import React from 'react'
import { Form, Input, Select } from 'antd';
import useBaseHook from '@src/hooks/BaseHook'
import roleGroup from '@root/src/services/roleService'
import useSWR from 'swr';

const { Option } = Select

const RoleGroupForm = () => {
  const { t, getData, router } = useBaseHook();
  const { query } = router
  // const { data } = useSWR('selectParent', () => roleGroup().withAuth().selectParent({ id: query.id, pageSize: -1 }))
  // const groups = getData(data, "data", [])

  return <>
    <Form.Item
      label={t("pages:roleGroups.table.name")}
      name="name"
      rules={[
        { required: true, message: t('messages:form.required', { name: t('pages:roleGroups.table.name') }) },
        { whitespace: true, message: t('messages:form.required', { name: t('pages:roleGroups.table.name') }) },
        { max: 255, message: t('messages:form.maxLength', { name: t('pages:roleGroups.table.name'), length: 255 }) }
      ]}
    >
      <Input placeholder={t("pages:roleGroups.table.name")} />
    </Form.Item>
    <Form.Item
      label={t("pages:roleGroups.table.description")}
      name="description"
      rules={[
        { max: 255, message: t('messages:form.maxLength', { name: t('pages:roleGroups.table.description'), length: 255 }) }
      ]}
    >
      <Input placeholder={t("pages:roleGroups.table.description")} />
    </Form.Item>
    {/* <Form.Item
      label={t("pages:roleGroups.form.parent")}
      name="parentId"
      rules={[
        { required: true, message: t('messages:form.required', {name: t('pages:roleGroups.form.parent')}) },
      ]}
    >
      <Select placeholder={t("pages:roleGroups.form.parent")} allowClear showSearch>
        {groups.map((item: any) => (
          <Option value={item.value} key={item.value}>{item.label}</Option>
        ))}
      </Select>
    </Form.Item> */}
  </>
}

export default RoleGroupForm
