import { useState, useEffect } from 'react'
import { Space, Row, Col } from "antd";
import { SectorSelectForStock } from "../Filters/SectorSelectForStock/SectorSelectForStock";
import { StockSearch, StockSelect } from "../Filters/StockSearch/StockSearch";
import { StocksTable } from "../Tables/StocksTable/StocksTable";
import { useStocks } from '../../hooks/stocks/useStocks';
import { useTickets } from '../../hooks/ticket/useTickets';
import { queryClient } from '../../services/queryClient';


export function StocksTablePageContent() {
  const [sector, setSector] = useState([]);
  const [page, setPage] = useState(1)
  const [ticket, setTicket] = useState([])
  const [isRefeching, setIsRefeching] = useState(false)
  const [params, setParams] = useState({})
  const [ticketSearch, setTicketSearch] = useState('')
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  const [searchValue, setSearchValue] = useState('')


  const {data: useStocksData, isLoading, isError } = useStocks(params)
  console.log(useStocksData)
  const listOfStocks = useStocksData?.ticketList
  const totalOfStocks = useStocksData?.totalOfStocks
  const stocksTableData = useStocksData?.stocksData
  useEffect(() => {
    if(ticket !== listOfStocks) {
      setTicket(listOfStocks)
    }
    const arrayOfSectorsId = sector.map(sector => sector.id )
    const paramsData = {
      page: page,
      sectors: arrayOfSectorsId,
      ticket: ticketSearch
    }
    setParams(paramsData)
  }, [listOfStocks, sector, page, ticketSearch])

  function handleChangePage(pageNumber) {
    setPage(pageNumber)
  }

  async function handleStockSearch(ticket) {
    if(ticket === '') {
      setIsButtonVisible(false)
      setSearchValue('')
      setPage(1)
      setSector([])
      setTicketSearch('')
      return
    }
    setIsButtonVisible(true)
    setPage(1)
    setSector([])
    setTicketSearch(ticket.toUpperCase())
  }

  const ticketData = useTickets(ticket || [])
  console.log(ticketData)

  async function handleRefetchStockTableData() {
    await queryClient.refetchQueries({active: true})
    setIsRefeching(false);
  }

  return (
    <Space 
    style={{ 
      margin: "32px"
    }}
    size="large"
    direction="vertical" 
    >
      <Row gutter={20}>
        <Col span={11}>
          <SectorSelectForStock 
            setSector={setSector}
            sector={sector}
            setPage={setPage}
          />
        </Col>
        <Col span={8}>
          <StockSearch  
            handleStockSearch={handleStockSearch}
            searchValue={searchValue}
            isButtonVisible={isButtonVisible}
            setSearchValue={setSearchValue}
          />
        </Col>
      </Row>       
      
      <StocksTable
        ticketData={ticketData}
        stocksTableData={stocksTableData}
        isError={isError}
        isLoading={isLoading}
        isRefeching={isRefeching}
        onRefeching={setIsRefeching}
        currentPage={page}
        onChangePage={handleChangePage}
        totalStocks={totalOfStocks}
        handleRefetchStockTableData={handleRefetchStockTableData}
      />
    </Space>

  )
}