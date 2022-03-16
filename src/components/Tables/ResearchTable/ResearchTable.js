import { useRecommendationsFilters } from '../../../context/useRecommendationsFilters'
import { formatPrice } from '../../../util/formatPrice';
import { useState } from 'react';
import { Input, InputNumber, Popconfirm, Form, Typography, message } from 'antd';
import { Table, Space, Spin } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import './styles.css'
import { useEffect } from 'react';
import { api } from '../../../services/api';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query'
import { queryClient } from '../../../services/queryClient';
import { DetailsBtn, Rating } from './styles';
import { ReloadButton } from '../../ReloadButton/ReloadButton';
Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />)

export function ResearchTable() {
  const {
    ticketData,
    handlePrefetchRecommendations,
    handleRefetchRecommendations,
    recommendationsTableData,  
    currentPage,
    handleChangePage,
    totalResearchTablePages,
    totalRecomendations, 
    params,
    isLoading,
    isError,
    isRefeching, 
    setIsRefeching
  } = useRecommendationsFilters()
  const [listOfRecomendations, setListOfRecomendations] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const pageSize = (totalRecomendations/totalResearchTablePages)

  const spin = <Spin style={{color: "var(--light-primary-color)"}}/>
  const putNewRecommendation = useMutation(async (data) => {
    const response = await api.put(`recommendation/${data.recom.key}/`, data.updatedRecommendation)
    // console.log(response)
    return data
  }, {
    onSuccess: (data) => {
      // console.log(data)
      return queryClient.invalidateQueries(['recommendationsList', currentPage, params])
    }
  } )

  const handleEditRecommendation = async (recom, data) => {
    const rating = recom.rating.toUpperCase()
    if(rating === 'COMPRA' || rating === 'VENDA' || rating === 'NEUTRO') {
      setListOfRecomendations(data);
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
  // console.log(recommendationsTableData)
  // console.log(ticketData)
  const tableData = recommendationsTableData === undefined ? null :      
    recommendationsTableData.map( stock => {
      if(ticketData.every(data => data.isSuccess)) {
        return ticketData.reduce((acc, val) => {
          if(val.data?.stockTicket === stock.stockTicket) {
            acc = {
              key: stock.key,
              stockTicket: val.data.stockTicket,
              stockName: val.data.stockName,
              actualPrice: val.data.actualPrice,
              averageTargetPrice: Number((stock.averageTargetPrice/stock.research.length).toFixed(2)),
              averagePotential: (stock.averagePotential/stock.research.length).toFixed(2),
              research: stock.research,
            }
            return acc
          } 
          return acc
        }, {})    
      } else {
        return  ({
          key: stock.key,
          stockTicket: stock.stockTicket,
          stockName: stock.stockName,
          actualPrice: stock.actualPrice,
          averageTargetPrice: Number((stock.averageTargetPrice/stock.research.length).toFixed(2)),
          averagePotential: (stock.averagePotential/stock.research.length).toFixed(2),
          research: stock.research,
        })
      }
    })
  useEffect(() => {
    const createRecommendationsList = recommendationsTableData === undefined ? null : 
    recommendationsTableData.map( stock => {      
      const research = stock.research.map( research => {
        return (
          {
            key: research.key,
            stockTicket: research.stockTicket,
            dateFinal: research.dateFinal,
            researchName: research.researchName,
            researchId: research.researchId,
            rating: research.rating,
            initialPrice: research.initialPrice,
            targetPrice: research.targetPrice,
            potential: research.potential,
          }
        )
      })
      return research      
    })

    let updatedListOfRecomendations = []

    function isArray(el) {
      return Array.isArray(el)
    }

    if (createRecommendationsList?.every(isArray)) {   
      for (let i = 0; i < createRecommendationsList.length; i++) {
        for (let j = 0; j < createRecommendationsList[i].length; j++) {
          const data = createRecommendationsList[i][j];
          updatedListOfRecomendations.push(data)
        }
      }
    }
    setListOfRecomendations(updatedListOfRecomendations)
  }, [recommendationsTableData])



  const columns = [
    { 
      title:     
      <Space 
        size="middle" 
        align="center" 
        style={{
          display: 'flex',
          justifyContent: 'flex-end',

          width: 200
        }}
      >        
        <ReloadOutlined 
          style={{fontSize: 16}} 
          spin={isRefeching} 
          onClick={() => {
            setIsRefeching(true);
            handleRefetchRecommendations()
          }}
        />
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
      title: 'Cotação', 
      dataIndex: 'actualPrice', 
      align: 'center',
      render: (text, record) => {
        return (
          record.actualPrice === undefined ? spin 
          : typeof record.actualPrice == 'string' ? record.actualPrice 
          : formatPrice(record.actualPrice)
        )
      }
    },
    { 
      title:     
      <Space size={0} direction="vertical" align="center"> 
        <p style={{ marginBottom: 0 }}>Média</p>
        <b>Preço Alvo</b>
      </Space>, 
      dataIndex: 'averageTargetPrice', 
      align: 'center',
      render: (text, record) => {
        return record.averageTargetPrice ? formatPrice(record.averageTargetPrice) : '' 
      }
    },
    { 
      title: 
      <Space size={0} direction="vertical" align="center"> 
        <p style={{ marginBottom: 0 }}>Média</p>
        <b>Potencial</b>
      </Space>,
      dataIndex: 'averagePotential', 
      align: 'center',
      render: (text, record) => {
        return record.averagePotential === undefined ?  '' : record.averagePotential + "%"
      }
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      align: 'center',
      render: (text, record) => {
        const isDisabled = record.actualPrice ? false : true;
        return (
          <Link 
            to={record.actualPrice ? `/stocks/${record.stockTicket}`: '#'} 
            onMouseEnter={() => handlePrefetchRecommendations(record.stockTicket)}
          > 
              <DetailsBtn disabled={isDisabled}>Ver detalhes</DetailsBtn>
          </Link>
        )
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

  const expandedRows = (ticket) => {
  const expandedRowData = listOfRecomendations.reduce((acc, val)=> {
    if (val.stockTicket === ticket.stockTicket) {
      acc.push(val)
      return acc
    }
    return acc
  }, [])
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
      const newData = [...listOfRecomendations];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        handleEditRecommendation({ ...item, ...row }, newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setListOfRecomendations(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      // console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
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
      width: '6%',
      align: 'center',
      editable: false,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      width: '10%',
      align: 'center',
      editable: true,
      render: (text, record) => <Rating>{record.rating}</Rating>
    },
    {
      title: 'Cotação',
      dataIndex: 'initialPrice',
      width: '10%',
      align: 'center',
      editable: false,
      render: (text, record) => {
        return record.initialPrice === undefined ?  '': record.initialPrice === "sem dados" ? "sem dados" : formatPrice(record.initialPrice)
      }
    },
    {
      title: 'Preço Alvo',
      dataIndex: 'targetPrice',
      width: '10%',
      align: 'center',
      editable: true,
      render: (text, record) => {
        return record.targetPrice === undefined ?  '': record.targetPrice === "sem dados" ? "sem dados" : formatPrice(record.targetPrice)
      }      
    },
    {
      title: 'Potencial',
      dataIndex: 'potential',
      width: '10%',
      align: 'center',
      editable: false,
      render: (text, record) => {
        return record.potential === undefined ?  '': record.potential === "sem dados" ? "sem dados" : record.potential+ "%"
      }       
    },
    {
      title: '',
      dataIndex: 'operation',
      align: 'center',
      width: '12%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
              <button
                onClick={() => save(record.key)}
                style={{
                  cursor: 'pointer',
                  background: '#1890ff',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: 2,
                  marginBottom: 5
                }}
              >
                Salvar
              </button>
                <button
                  onClick={() =>cancel()}
                  style={{
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
  const mergedColumns = columns.map((col) => {
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
        dataSource={expandedRowData}
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
    !isError ? 
    <Table
      loading={isLoading}
      style={{marginLeft: 32}}
      columns={columns}
      expandable={{
        expandedRowRender: expandedRows
      }}
      dataSource={tableData}
      pagination={{
        current: currentPage,
        onChange: handleChangePage,
        showSizeChanger: false,
        pageSize: pageSize,
        total: totalRecomendations

      }}
    /> : 
    <Space direction="vertical" style={{marginTop: 60,marginLeft: 380}}> 
      <p>Falha ao carregar os dados</p>
      <ReloadButton />
    </Space>
  )
} 