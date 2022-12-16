import dynamic from 'next/dynamic'
import DataTable, { Alignment } from 'react-data-table-component';
import {
  ArrowDownOutlined
} from "@ant-design/icons";
import { SearchOutlined, DashOutlined, SmallDashOutlined, MoreOutlined } from '@ant-design/icons';
import {Tooltip, Space, Input } from 'antd';
import {
  Pagination,
  Spin,
  Form,
  Typography,
  Button,
  Badge,
  Modal,
  Empty,
} from "antd";
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import useBaseHook from '@src/hooks/BaseHook';
import { GridTable } from "@src/components/Table";
import FilterDatePicker from "@src/components/Table/SearchComponents/DatePicker";
import documentService from "@root/src/services/documentService";
import _ from "lodash";
import moment from "moment";
import to from "await-to-js";
import auth from "@src/helpers/auth";
import React, { useState, useRef } from "react";

const Index = () => {
  const { redirect, t, notify } = useBaseHook();
  const { Search } = Input;
  const tableRef = useRef(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [hiddenDeleteBtn, setHiddenDeleteBtn] = useState(true);

  const onSearch = (value: string) => console.log(value);

  const fetchData = async (values: any) => {
    if (!values.sorting.length) {
      values.sorting = [{ field: "documents.id", direction: "desc" }];
    }
    let [error, users]: [any, User[]] = await to(
      documentService().withAuth().index(values)
    );
    if (error) {
      const { code, message } = error;
      notify(t(`errors:${code}`), t(message), "error");
      return {};
    }
    return users;
  };

  const onChangeSelection = (data: any) => {
    if (data.length > 0) setHiddenDeleteBtn(false);
    else setHiddenDeleteBtn(true);
    setSelectedIds(data);
  };

  const rowSelection = {
    getCheckboxProps: (record) => ({
      disabled: record.id == auth().user.id,
      id: record.id,
    }),
  };

    const columns = [
      {
        title: t("pages:documents.table.formName"),
        dataIndex: "formName",
        key: "documents.formName",
        sorter: true,
        filterable: true,
      },
      {
        title: t("pages:documents.table.formId"),
        dataIndex: "formId",
        key: "documents.formId",
        sorter: true,
        filterable: true,
      },
      {
        title: t("pages:documents.table.issuedBy"),
        dataIndex: "issuedBy",
        key: "documents.issuedBy",
        sorter: true,
        filterable: true,
      },
      {
        title: t("pages:documents.table.issuedDate"),
        dataIndex: "issuedDate",
        key: "documents.issuedDate",
        sorter: true,
        filterable: true,
      },
      {
        title: t("pages:documents.table.status"),
        dataIndex: "status",
        key: "documents.status",
        sorter: true,
        filterable: true,
      },
      {
        title: t("pages:documents.table.updatedDate"),
        dataIndex: "updatedDate",
        key: "documents.updatedDate",
        sorter: true,
        filterable: true,
        render: (text: string, record: any) =>
          text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
        renderFilter: ({ column, confirm, ref }: FilterParam) => (
          <FilterDatePicker column={column} confirm={confirm} ref={ref} />
        ),
      },
      {
        title: "",
        key: 'action',
        render: (text, record) => {
          console.log("record",record)
          return (
          <Space size="middle" style={{ float: "right", }}>
            {/* <a
              type="primary"
              className="btn-top"
              onClick={() => redirect("frontend.admin.users.edit", { id: record.id })}
            > */}
              <MoreOutlined />
            {/* </a> */}
          </Space>
        )}
      }
    ];

  return <>
    <div className="content">
          <GridTable
          ref={tableRef}
          columns={columns}
          fetchData={fetchData}
          rowSelection={{
            selectedRowKeys: selectedIds,
            onChange: (data: any[]) => onChangeSelection(data),
            ...rowSelection,
          }}
          addIndexCol={false}
          selectableRowsHighlight
          // subHeader
          // subHeaderComponent={
          //   <Search placeholder=" search " width={10} allowClear onChange={(e)=>console.log("eval is ", e.target.value)} onSearch={onSearch} style={{ width: 200 }} />
          // }
          // actions={<div style={{ float: "right" }}>
          //             <Button size="small" onClick={()=>console.log("button is clicked")}>All</Button> 
          //             <Button size="small" onClick={()=>console.log("button is clicked")}>To be Forwarded</Button>
          //             <Button size="small" onClick={()=>console.log("button is clicked")}>Completed</Button>
          //         </div>
          // }
        />
    </div>
  </>
}

Index.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t('pages:documents.index.title')}
    description={t('pages:documents.index.description')}
    {...props}
  />
}

Index.permissions = {
  documents: "R",
};

export default Index


