import { Col, Form } from 'antd';
import Layout from 'antd/lib/layout/layout';
import React, { useState, useEffect } from 'react'

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

const Overview = () => {
    const { t, notify, redirect, router } = useBaseHook();
    const [loading, setLoading] = useState(false);
    const [roleGroup, setRoleGroup]: any[] = useState();
    const [form] = Form.useForm();
    const { checkPermission } = usePermissionHook();
    const { query } = router

    const deletePer = checkPermission({
        "roleGroups": "D"
      })

    return (
        <div className = "flex-container">
            <div>1</div>
            <div>2</div>
        </div>
    )

}


function useBaseHook(): { t: any; notify: any; redirect: any; router: any; } {
    throw new Error('Function not implemented.');
}

function usePermissionHook(): { checkPermission: any; } {
    throw new Error('Function not implemented.');
}

Overview.Layout = (props) => {
    const { t } = useBaseHook();
  
    return <Layout
      title={t("pages:application.overview.title")}
      description={t("pages:application.overview.description")}
      {...props}
    />
  }
  
  Overview.permissions = {
    "roleGroups": "U"
  }
  
  export default Overview
