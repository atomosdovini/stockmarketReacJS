import { useRecommendationsFilters } from '../../../context/useRecommendationsFilters'
import { formatPrice } from '../../../util/formatPrice';
import { useState } from 'react';
import { Input, InputNumber, Popconfirm, Form, Typography, message } from 'antd';
import { Table, Space, Spin } from 'antd';
import { LoadingOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './styles.css'
import { useEffect } from 'react';
import { api } from '../../../services/api';
import { useMutation } from 'react-query'
import { queryClient } from '../../../services/queryClient';
import { P, Rating } from './styles';
import { useParams } from 'react-router-dom'
import { setColour } from '../../../util/setColour'

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />)

export function TicketTable() {
  const { ticketData } = useRecommendationsFilters()
  const [stockTableData, setStockTableData] = useState([])
  const [recomTableData, setRecomTableData] = useState([]) 
  const {ticket} = useParams()
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isFetching = ticketData.some((stock) => stock.isFetching === true )
  let isLoading = ticketData.every(isArray)
  const spin = <Spin style={{color: "var(--light-primary-color)"}}/>

  const recommendations = queryClient.getQueryData(['recommendations for', ticket])
  const stockData = queryClient.getQueryData(['ticket', ticket]) 
  // console.log(stockData)
  const ticketTableData = [stockData] 

  useEffect(() => {
    let updatedData = {}
    const updatedTableData = ticketTableData?.reduce((acc, val) => {
      if (val.stockTicket === ticket) {
        updatedData = {
          key: val.stockTicket,
          stockName: val.stockName,
          stockTicket: val.stockTicket,
          sectorName: val.sectorName,
          actualPrice: val.actualPrice,
          oneYear: val.oneYear,
          sixMouths: val.sixMouths,
          oneMouth: val.oneMouth  
        }
        acc.push(updatedData)
        return acc
      } 
      return acc
    }, [])
    setStockTableData(updatedTableData)

    if (recommendations.length > 0) {
      const updatedRecomTableData = recommendations?.reduce((acc, val) => {
        if (val.stockTicket === ticket) {
          acc.push(...val.research)
          return acc
        }
        return acc
      }, [])
      setRecomTableData(updatedRecomTableData)
    } else {
      setRecomTableData(
        [{
          dateFinal: 'Sem recomendações',
          initialPrice: '-',
          key: '-',
          potential: '-',
          rating: '-',
          researchId: '-',
          stockTicket: '-',
          targetPrice: '-',
        }]
      )
    }
    
  }, [])


  function isArray(el) {
    if (el.data) {
      return !Array.isArray(el.data.research)
    }
    return true
  }

  const putNewRecommendation = useMutation(async (data) => {
    const response = await api.put(`recommendation/${data.recom.key}/`, data.updatedRecommendation)
    // console.log(response)
    return data
  }, {
    onSuccess: () => queryClient.invalidateQueries(['recommendations for', ticket])    
  } )

  const handleEditRecommendation = async (recom, data) => {
    const rating = recom.rating.toUpperCase()
    if(rating === 'COMPRA' || rating === 'VENDA' || rating === 'NEUTRO') {
      setRecomTableData(data);
      const updatedRecommendation = {
        datefinal: recom.dateFinal.split('/').reverse().join('-'),
        rating: rating,
        target: recom.targetPrice
      }
      // console.log(updatedRecommendation)
      await putNewRecommendation.mutateAsync({updatedRecommendation, recom}) 
    } else {
      message.error('Os valores de rating são: Compra, Venda ou Neutro')
    }   
  }

  const columns =  [
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
        {!isLoading && isFetching && <Spin style={{color: "#ffffff"}}/>}
        <Space size={0} direction="vertical" align="center" style={{ marginRight: 74}}> 
          <p style={{ marginBottom: 0 }}>Empresa</p>
          <b>Ticket</b>
        </Space>
      </Space>,
   
      dataIndex: 'ticket', 
      align: 'center',
      width: '20%',

      render: (text, record) => { 
        return (
        <Space size={0} direction="vertical" align="center">
          <p style={{ marginBottom: 0 }}>{record.stockName}</p>
          <b>{record.stockTicket}</b>
        </Space>
        )
      }
    },
    { 
      title: 'Setor', 
      dataIndex: 'sectorName', 
      align: 'center',
      width: '30%',

    },
    { 
      title: 'Cotação', 
      dataIndex: 'actualPrice', 
      align: 'center',
      render: (text, record) => { 
        return record.actualPrice === undefined ? spin : typeof record.actualPrice == 'string' ? record.actualPrice : formatPrice(record.actualPrice)
      }
    },    
    { 
      title: '30 dias', 
      dataIndex: 'oneMouth', 
      align: 'center',
      render: (text, record) => { 
        return record.oneMouth ? 
          <P className={setColour(record.oneMouth)}>
            {record.oneMouth > 0 ? <ArrowUpOutlined/> : <ArrowDownOutlined/> }            
            {' ' + Math.abs(record.oneMouth) + '%'}
          </P> : 
          spin
      }
    },
    { 
      title: '6 meses', 
      dataIndex: 'sixMouths', 
      align: 'center',
      render: (text, record) => { 
        return record.sixMouths ? 
        <P className={setColour(record.sixMouths)}>
          {record.sixMouths > 0 ? <ArrowUpOutlined/> : <ArrowDownOutlined/> }            
          {' ' + Math.abs(record.sixMouths) + '%'}
        </P> : 
        spin
      }
    },
    { 
      title: '1 ano', 
      dataIndex: 'oneYear', 
      align: 'center',
      render: (text, record) => { 
        return record.oneYear ? 
        <P className={setColour(record.oneYear)}>
          {record.oneYear > 0 ? <ArrowUpOutlined/> : <ArrowDownOutlined/> }            
          {' ' + Math.abs(record.oneYear) + '%'}
        </P> : 
        spin
      }
    },
  ]; 
  
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Por favor preencha ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const RecommendationsTable = () => {

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
      form.setFieldsValue({
        dateFinal: '',
        rating: '',
        targetPrice: '',
        ...record,
      });
      setEditingKey(record.key);
    };

    const cancel = () => {
      setEditingKey('');
    };

    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...recomTableData];
        const index = newData.findIndex((item) => key === item.key);

        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          handleEditRecommendation({ ...item, ...row }, newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setRecomTableData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        // console.log('Validate Failed:', errInfo);
      }
    };

    const columnsOfRecommendationsTable = [
      {
        title: 'Data',
        dataIndex: 'dateFinal',
        width: '10%',
        align: 'center',
        editable: true,
      },
      {
        title: 'Research',
        dataIndex: 'researchName',
        width: '4%',
        align: 'center',
        editable: false,
      },
      {
        title: 'Rating',
        dataIndex: 'rating',
        width: '8%',
        align: 'center',
        editable: true,
        render: (text, record) => <Rating>{record.rating}</Rating>
      },
      {
        title: 'Cotação',
        dataIndex: 'initialPrice',
        width: '8%',
        align: 'center',
        editable: false,
        render: (text, record) => {
          return (
            record.initialPrice === undefined ? spin 
            : typeof record.initialPrice == 'string' ? record.initialPrice 
            : formatPrice(record.initialPrice))
        }
      },
      {
        title: 'Preço Alvo',
        dataIndex: 'targetPrice',
        width: '8%',
        align: 'center',
        editable: true,
        render: (text, record) => {
          return (
            record.targetPrice === undefined ? spin 
            : typeof record.targetPrice == 'string' ? record.targetPrice 
            : formatPrice(record.targetPrice))
        }      
      },
      {
        title: 'Potential',
        dataIndex: 'potential',
        width: '8%',
        align: 'center',
        editable: false,
        render: (text, record) => {
          return (
            record.potential === undefined ? spin 
            : typeof record.potential == 'string' ? record.potential 
            : record.potential + '%')
        }       
      },
      {
        title: '',
        dataIndex: 'operation',
        align: 'center',
        width: '10%',
        render: (_, record) => {
          const editable = isEditing(record);         
          return !record.researchName ? '' :
            editable ? (
              <span>
              <button
                onClick={() => save(record.key)}
                style={{
                  width: 66,
                  height: 30,
                  cursor: 'pointer',
                  background: '#1890ff',
                  border: 'none',
                  color: '#ffffff',
                  marginRight: 8,
                  borderRadius: 2
                }}
              >
                Salvar
              </button>
                <button
                  onClick={() =>cancel()}
                  style={{
                    width: 68,
                    height: 30,
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: 2,
                    color: '#ffffff',
                    background: '#F56565'
                  }}
                  >Cancelar
                </button>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Editar
            </Typography.Link>
          );
        },
      },
    ];
    const mergedColumns = columnsOfRecommendationsTable.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'rating' ? 'text' : col.dataIndex === 'dateFinal' ? 'text' : 'number',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    return (
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={recomTableData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            hideOnSinglePage: true,
          }}
        />
      </Form>
    );
  };

  return (
    <>
      <Table
        loading={false}
        columns={columns}
        dataSource={stockTableData}
        pagination={{
          hideOnSinglePage: true
        }}
      />
      <RecommendationsTable />
  </>
  )
} 