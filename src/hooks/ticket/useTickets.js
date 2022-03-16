import { useQueries } from 'react-query'
import { api } from '../../services/api'


async function getTickets(ticket) {   
  const {data} = await api.get(`/stocks/?ticket=${ticket}`, { timeout: 200000 })  
  const ticketdata = {
    stockName: data.name,
    stockTicket: data.ticket,
    sectorName: data.sectorname,
    actualPrice: data.actual_price === 0 ? 'sem dados' : data.actual_price,
    oneYear: Number(data.growth1y) == 0 ? 'sem dados' : data.growth1y,
    sixMouths: Number(data.growth6m) == 0 ? 'sem dados' : data.growth6m,
    oneMouth: Number(data.growth30d) == 0 ? 'sem dados' : data.growth30d,
  }
  return ticketdata
}

export function useTickets(listOfStocks ) {
  return useQueries(listOfStocks.map(ticket => { 
    return {
      queryKey: ['ticket', ticket],
      queryFn: () =>  getTickets(ticket),
      enabled: !!listOfStocks,  
      staleTime: 1000 * 60 * 60 * 24,  // 24h
      cacheTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  })
)}

