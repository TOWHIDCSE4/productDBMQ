import dynamic from 'next/dynamic'
import { SearchOutlined, DashOutlined, FileSearchOutlined, MoreOutlined, FilePdfOutlined, FileOutlined, FilterOutlined } from '@ant-design/icons';
import {
  Pagination,
  Spin,
  Form,
  Typography,
  Button,
  Modal,
  Empty,
  Tooltip, Space, Input,
  Badge,
  Popover
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
import React, { useState, useRef, useEffect } from "react";

function checkStatus(status: string){
  let colorObj = {  padding: '4px 8px', borderRadius: '5px', color: '#b22222', backgroundColor: '#fff6f6', width: '75px'};
  if(status === 'Approve'){
      colorObj = {
        ...colorObj,
        color: '#17B169',
        backgroundColor: '#cefad0',
        width: '70px'
      }
  }else if(status === 'To Be Reviewed'){
    colorObj = {
      ...colorObj,
      color: '#DAA520',
      backgroundColor: '#FFF8DC',
      width: '120px'
    }
  }else if(status == 'Rejected'){
    colorObj = {
      ...colorObj,
      color: '#b22222', 	
      backgroundColor: '#fff6f6',
      width: '75px'
    }
  }
  
  return colorObj;
}

const Index = () => {
  const { redirect, t, notify } = useBaseHook();
  const { Title } = Typography;
  const { Search } = Input;
  const ButtonGroup = Button.Group;
  const tableRef = useRef(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [documents, setDocuments] = useState(null);
  const [statusCount, setStatusCount] = useState(null);
  const [hiddenDeleteBtn, setHiddenDeleteBtn] = useState(true);

  const onSearch = (value: string) => console.log(value);

  const fetchData = async (values: any) => {
    if (!values.sorting.length) {
      values.sorting = [{ field: "documents.id", direction: "desc" }];
    }
    let [error, documents]: [any, any] = await to(
      documentService().withAuth().index(values)
    );
    if (error) {
      const { code, message } = error;
      notify(t(`errors:${code}`), t(message), "error");
      return {};
    }

    if(documents){
      const resultObj = JSON.parse(JSON.stringify(documents));
      console.log("documents are ", documents);
      let result = _.countBy(resultObj.data, 'status');
      console.log("result is ", result);
      setStatusCount(result);
      setDocuments(resultObj);
    }
  
    return documents;
  };

  // useEffect(()=>{
  //   const fetchData = async (values: any) => {
  //     if (!values.sorting.length) {
  //       values.sorting = [{ field: "documents.id", direction: "desc" }];
  //     }
  //     let [error, documents]: [any, Document[]] = await to(
  //       documentService().withAuth().index(values)
  //     );
  //     if (error) {
  //       const { code, message } = error;
  //       notify(t(`errors:${code}`), t(message), "error");
  //       return {};
  //     }
  
  //     if(documents){
  //       const resultObj = JSON.parse(JSON.stringify(documents));
  //       console.log("documents are ", documents);
  //       let result = _.countBy(resultObj.data, 'status');
  //       console.log("result is ", result);
  //       setStatusCount(result);
  //       setDocuments(resultObj);
  //     }
    
  //     return documents;
  //   };

  //   let values = {
  //     sorting: ''
  //   }

  //   fetchData(values);
  // }, [])

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("seach val is ", event.target.value);
      
  }

  const downloadConent = (
    <div>
      <p style={{cursor: "pointer"}}><span style={{marginRight: '8px'}}><FilePdfOutlined /></span> PDF </p>
      <p style={{cursor: "pointer"}}><span style={{marginRight: '8px'}}><FileOutlined /></span> CSV </p>
    </div>
  );

    const columns = [
      {
        title: t("pages:documents.table.formName"),
        dataIndex: "formName",
        key: "documents.formName",
        sorter: true,
        filterable: true,
        render: (text, record) => {
          return <strong>{text}</strong>;
        }
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
        render: (text, record) => {
          // console.log("for name text is ", text);
          // console.log("for name record is ",record)

          return (
            <div style={checkStatus(text)}>
                {text}
            </div>
          )
        }
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
          return (
          <Space size="middle" style={{ float: "right", }}>
            <Popover content={downloadConent}  trigger="click">
              <MoreOutlined />
            </Popover> 
          </Space>
        )}
      }
    ];

    return <>
      <div className="content">
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div>
                  <Input size="middle" onChange={handleSearch} style={{width: 130, marginRight: 10}} placeholder="Serach" prefix={<SearchOutlined />} />
                  <Input size="middle" style={{width: 130, marginBottom: 20}} placeholder="More Filters" prefix={<FilterOutlined />} />
                </div>
                {
                  statusCount && (
                    <div>
                      <ButtonGroup>
                        <Button onClick={() => console.log("All button is clicked")}>
                          <Badge count={statusCount['Approve']} style={{color: '#17B169', backgroundColor: '#cefad0'}} /> 
                          <span style={{marginLeft: 5}}> Approve</span> 
                        </Button>
                        <Button onClick={() => console.log("To Be Reviewed button is clicked")}>
                            <Badge count={statusCount['To Be Reviewed']} style={{ color: '#DAA520', backgroundColor: '#FFF8DC'}} /> 
                            <span style={{marginLeft: 5}}> To Be Reviewed</span>  
                        </Button>
                        <Button onClick={() => console.log("Rejected button is clicked")}>
                            <Badge count={statusCount['Rejected']} style={{ color: '#b22222', backgroundColor: '#fff6f6',}}/>
                            <span style={{marginLeft: 5}}> Rejected</span> 
                        </Button>
                      </ButtonGroup>
                    </div>
                  )
                }
            </div>
          
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
          />
      </div>
    </>
    }


Index.Layout = (props) => {
  const { t } = useBaseHook();
  return <>
    <Layout
      title={t('pages:documents.index.title')}
      description={t('pages:documents.index.description')}
      {...props}
    />
  </>
}

Index.permissions = {
  documents: "R",
};

export default Index


