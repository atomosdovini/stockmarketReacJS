import { useQuery } from 'react-query'
import { api } from '../../services/api'

let stocksData

export async function getStocks(params) {
  const { data } = await api.get('stocks/', { 
    params: { 
      page: params.page,
      sector: params.sectors,
      ticket: params.ticket
     }
  })
  if(typeof data.results === 'object') {
    console.log('entrei no if')
    stocksData = data.results.map(stock => {
      return {
        stockName: stock.name,
        stockTicket: stock.ticket,
        sectorName: stock.sectorname,
        sectorId: stock.sectorid
      }
    })  
    const totalOfStocks = data.count 

    const ticketList = [];                   
    for (let stk of data.results){ 
      if (!ticketList.includes(stk.ticket)){
        ticketList.push(stk.ticket);
      }
    }
    
    return {totalOfStocks, ticketList, stocksData }

  } else {
    console.log('entrei no else')
      stocksData = {
        stockName: data.name,
        stockTicket: data.ticket,
        sectorName: data.sectorname,
        actualPrice: data.actual_price === 0 ? 'sem dados' : data.actual_price,
        oneYear: Number(data.growth1y) == 0 ? 'sem dados' : data.growth1y,
        sixMouths: Number(data.growth6m) == 0 ? 'sem dados' : data.growth6m,
        oneMouth: Number(data.growth30d) == 0 ? 'sem dados' : data.growth30d,
      }
    const totalOfStocks = 1
    const ticketList = [data.ticket]
    return {totalOfStocks, ticketList, stocksData }
  }
}
export function useStocks(params) {
  return useQuery(['stocks', params], async () =>  getStocks(params), {
    staleTime: 1000 * 60 * 60 * 24,  // 24h
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
}



