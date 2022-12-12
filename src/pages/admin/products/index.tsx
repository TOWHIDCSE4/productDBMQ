import dynamic from "next/dynamic";
import { GridTable } from "@src/components/Table";
import FilterDatePicker from "@src/components/Table/SearchComponents/DatePicker";
import { Button, Tag, Space } from "antd";
import userService from "@root/src/services/userService";
import _ from "lodash";
import moment from "moment";
import to from "await-to-js";
import auth from "@src/helpers/auth";
import React, { useState, useRef } from "react";
import { confirmDialog } from "@src/helpers/dialogs";
import useBaseHook from "@src/hooks/BaseHook";
import usePermissionHook from "@src/hooks/PermissionHook";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  LoginOutlined,
  EditOutlined,
} from "@ant-design/icons";

const Layout = dynamic(() => import("@src/layouts/Admin"), { ssr: false });

const Index = () => {
  const { t, notify, redirect } = useBaseHook();
  const tableRef = useRef(null);
  const { checkPermission } = usePermissionHook();
  const [selectedIds, setSelectedIds] = useState([]);
  const [hiddenDeleteBtn, setHiddenDeleteBtn] = useState(true);
  const createPer = checkPermission({
    users: "C",
  });
  const updatePer = checkPermission({
    users: "U",
  });
  const deletePer = checkPermission({
    users: "D",
  });

  const columns = [
    {
      title: t("pages:products.table.productName"),
      dataIndex: "productName",
      key: "products.productName",
      sorter: true,
      filterable: true,
    },
    {
      title: t("pages:products.table.price"),
      dataIndex: "price",
      key: "products.price",
      sorter: true,
      filterable: true,
    },
    {
      title: t("pages:products.table.modelName"),
      dataIndex: "modelName",
      key: "products.modelName",
      sorter: true,
      filterable: true,
    },
    {
      title: t("pages:products.table.brand"),
      dataIndex: "brand",
      key: "products.brand",
      sorter: true,
      filterable: true,
    },
    {
      title: t("pages:products.table.madeIn"),
      dataIndex: "madeIn",
      key: "products.madeIn",
      sorter: true,
      filterable: true,
    },
    {
      title: t("pages:products.table.status"),
      dataIndex: "status",
      key: "products.status",
      sorter: true,
      filterable: true,
    },
    // {
    //   title: t("pages:users.table.tags"),
    //   dataIndex: "tags",
    //   key: "users.tags",
    //   sorter: false,
    //   render: (text: String) => {
    //     const items = [];
    //     let tagsName = [].concat(text);
    //     tagsName.map((tag: string, index: number) => {
    //       items.push(<Tag key={index}>{tag}</Tag>);
    //     });
    //     return <>{items}</>;
    //   },
    // },
    {
      title: t("pages:products.table.activeDate"),
      dataIndex: "activeDate",
      key: "products.activeDate",
      sorter: true,
      filterable: true,
      render: (text: string, record: any) =>
        text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
      renderFilter: ({ column, confirm, ref }: FilterParam) => (
        <FilterDatePicker column={column} confirm={confirm} ref={ref} />
      ),
    },
    {
      title: t("pages:products.table.expriedDate"),
      dataIndex: "expriedDate",
      key: "products.expriedDate",
      sorter: true,
      filterable: true,
      render: (text: string, record: any) =>
        text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
      renderFilter: ({ column, confirm, ref }: FilterParam) => (
        <FilterDatePicker column={column} confirm={confirm} ref={ref} />
      ),
    },
    {
      title: t("pages:action"),
      key: 'action',
      render: (text, record) => {
        console.log("record",record)
        return (
        <Space size="middle">
          <a
            type="primary"
            className="btn-top"
            onClick={() => redirect("frontend.admin.products.edit", { id: record.id })}
          >
            <EditOutlined />
          </a>
        </Space>
      )}
    }
  ];

  const onChangeSelection = (data: any) => {
    if (data.length > 0) setHiddenDeleteBtn(false);
    else setHiddenDeleteBtn(true);
    setSelectedIds(data);
  };

  const fetchData = async (values: any) => {
    if (!values.sorting.length) {
      values.sorting = [{ field: "users.id", direction: "desc" }];
    }
    let [error, users]: [any, User[]] = await to(
      userService().withAuth().index(values)
    );
    if (error) {
      const { code, message } = error;
      notify(t(`errors:${code}`), t(message), "error");
      return {};
    }
    return users;
  };

  const onDelete = async () => {
    let [error, result]: any[] = await to(
      userService().withAuth().delete({ ids: selectedIds })
    );
    if (error) return notify(t(`errors:${error.code}`), "", "error");
    notify(t("messages:message.recordUserDeleted"));
    if (tableRef.current !== null) {
      tableRef.current.reload();
    }
    setSelectedIds([]);
    setHiddenDeleteBtn(true);
    return result;
  };

  const rowSelection = {
    getCheckboxProps: (record) => ({
      disabled: record.id == auth().user.id,
      id: record.id,
    }),
  };

  return (
    <>
      <div className="content">
        <Button
          hidden={!createPer}
          onClick={() => redirect("frontend.admin.products.create")}
          type="primary"
          className="btn-top"
        >
          <PlusCircleOutlined />
          {t("buttons:create")}
        </Button>
        <Button
          danger
          className="btn-top"
          hidden={hiddenDeleteBtn || !deletePer}
          onClick={() => {
            confirmDialog({
              title: t("buttons:deleteItem"),
              content: t("messages:message.deleteConfirm"),
              onOk: () => onDelete(),
            });
          }}
        >
          <DeleteOutlined />
          {t("buttons:delete")}
        </Button>

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
        />
      </div>
    </>
  );
};

Index.Layout = (props) => {
  const { t } = useBaseHook();
  return (
    <Layout
    title={t("pages:products.index.title")}
    description={t("pages:products.index.description")}
      {...props}
    />
  );
};

Index.permissions = {
  products: "R",
};

export default Index;
