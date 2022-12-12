import dynamic from "next/dynamic";
import _ from "lodash";
import React, { useState } from "react";
import useBaseHook from "@src/hooks/BaseHook";
import { Card, Col, Form, Row, Statistic } from "antd";
import OverviewForm from "@root/src/components/Admin/Application/OverviewForm";

const Layout = dynamic(() => import("@src/layouts/Admin"), { ssr: false });

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState({});

  const onFinish = async (values: any): Promise<void> => {
    values = {...values,...data}
    console.log('value',values)
  }
  
  

  return (
    <div className="content">
      <OverviewForm />
    </div>
  );
};

Index.Layout = (props) => {
  const { t } = useBaseHook();
  return (
    <Layout
      title={t("pages:application.index.title")}
      description={t("pages:application.index.description")}
      {...props}
    />
  );
};

Index.permissions = {
  application: "R",
};

export default Index;
