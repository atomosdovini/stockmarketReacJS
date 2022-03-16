import { Link } from 'react-router-dom';
import { useRecommendationsFilters } from '../../../context/useRecommendationsFilters';
import { formatPrice } from '../../../util/formatPrice';
import { setColour } from '../../../util/setColour';

import { Table, Space, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, ReloadOutlined } from '@ant-design/icons';
import './styles.css'
import { DetailsBtn, P } from './styles';
import { ReloadButton } from '../../ReloadButton/ReloadButton';

export function StocksTable({  
  ticketData,
  stocksTableData, 
  isLoading,
  isError,
  isRefeching,
  onRefeching,
  currentPage, 
  onChangePage, 
  totalStocks,
  handleRefetchStockTableData}) {
  const { handlePrefetchRecommendations } = useRecommendationsFilters()
  const spin = <Spin style={{color: "var(--light-primary-color)"}}/>
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
         <ReloadOutlined 
            style={{fontSize: 16}} 
            spin={isRefeching} 
            onClick={() => {
              onRefeching(true);
              handleRefetchStockTableData()
            }}
          />
        <Space size={0} direction="vertical" align="center" style={{ marginRight: 74}}> 
          <p style={{ marginBottom: 0 }}>Empresa</p>
          <b>Ticket</b>
        </Space>
      </Space>,
   
      dataIndex: 'stockTicket', 
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
      render: (text, record) => {return record.sectorName === undefined ? '' : record.sectorName}

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
  console.log(stocksTableData?.length)
  const tableData = stocksTableData === undefined ? null :
    stocksTableData.length !== undefined ? 
       stocksTableData.map( stock => {
        if(ticketData.every(stock => stock.isSuccess)) {
          return ticketData.reduce((acc, val) => {
            if(val.data?.stockTicket === stock.stockTicket) {
              acc = {
                key: stock.stockTicket,
                stockTicket: stock.stockTicket,
                stockName: stock.stockName,
                sectorName: stock.sectorName,
                actualPrice: val.data.actualPrice,
                oneMouth: val.data.oneMouth,
                sixMouths: val.data.sixMouths,
                oneYear: val.data.oneYear
              }
              return acc
            }
            return acc
          }, {})  
        } else {
          return {
            key: stock.stockTicket,
            stockTicket: stock.stockTicket,
            stockName: stock.stockName,
            sectorName: stock.sectorName,
          }
        }
        
      }) :
      [{
        key: stocksTableData.stockTicket,
        stockTicket: stocksTableData.stockTicket,
        stockName: stocksTableData.stockName,
        sectorName: stocksTableData.sectorName,
        actualPrice: stocksTableData.actualPrice,
        oneMouth: stocksTableData.oneMouth,
        sixMouths: stocksTableData.sixMouths,
        oneYear: stocksTableData.oneYear
      }]


   

  return (
    !isError ? 
    <Table
      columns={columns}
      dataSource={tableData}
      loading={isLoading}
      pagination={{
        current: currentPage,
        onChange: onChangePage,
        showSizeChanger: false,
        pageSize: 5, //quantas stocks/pagina
        total: totalStocks

      }}
    /> : 
    <Space direction="vertical" style={{marginTop: 60,marginLeft: 460}}> 
      <p>Falha ao carregar os dados</p>
      <ReloadButton />
    </Space>
  )
} 
