import { useState } from 'react';
import { ReloadButton } from '../../components/ReloadButton/ReloadButton';
import { useLogs } from '../../hooks/logs/useLogs';
import { Table, Space, Spin } from 'antd';

export function LogsPageContent() {
  const [page, setPage] = useState(1)
  const {data, isLoading, isError} = useLogs(page)

  function handleChangePage(pageNumber) {
    setPage(pageNumber)
  }
  const totalPages = data?.totalPages
  const totalOfLogs = data?.totalOfLogs
  const logList = data?.logList

  const pageSize = Math.ceil(totalOfLogs/totalPages)

  const spin = <Spin style={{color: "var(--light-primary-color)"}}/>
  const columns =  [
    { 
      title: 'Data de criação', 
      dataIndex: 'createdAt', 
      align: 'center'
    },
    { 
      title:     
      <Space 
        size="middle" 
        align="center" 
        style={{
          display: 'flex',
          justifyContent: 'flex-end',

          width: 200
          }}>
      
        <Space size={0} direction="vertical" align="center" style={{ marginRight: 74}}> 
          <p style={{ marginBottom: 0 }}>Usuário</p>
        </Space>
      </Space>,
   
      dataIndex: 'userName', 
      align: 'center',
      width: '40%',

      render: (text, record) => { 
        return (
        <Space size={0} direction="vertical" align="center">
          <p style={{ marginBottom: 0 }}>{record.userName}</p>
        </Space>
        )
      }
    },
    { 
      title: 'Ocorrência', 
      dataIndex: 'text', 
      align: 'center',
      width: '40%',
      render: (text, record) => {return record.text === undefined ? '' : record.text}

    }
  ];
  
  return (
    !isError ? 
    <Table
    style={{margin: 48}}
      columns={columns}
      dataSource={logList}
      loading={isLoading}
      pagination={{
        current: page,
        onChange: handleChangePage,
        showSizeChanger: false,
        pageSize: pageSize, //quantas stocks/pagina
        total: totalOfLogs

      }}
    /> : 
    <Space direction="vertical" style={{marginTop: 60,marginLeft: 460}}> 
      <p>Falha ao carregar os dados</p>
      <ReloadButton />
    </Space>
  )
}