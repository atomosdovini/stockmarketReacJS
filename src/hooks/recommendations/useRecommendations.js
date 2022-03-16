import { isAuthenticated } from "../../actions/auth";

import { useQuery } from 'react-query'
import { api } from '../../services/api'

let recommendationsListData;

async function getRecommendations(page, params) {
  
  const {data} = await api.get('/recommendation/', {
    params: {
      page: page,
      research: params.research,
      rating: params.rating, 
      sector: params.sector,
      date_i: params.date_i,
      date_f: params.date_f           
    }
  })   
  const totalPages = data.total_pages
  const totalOfRecomendations = data.count

  let recommendationData;    

  recommendationsListData = data.results.reduce((acc, val) => {
    let index = acc.map((o) => o.stockTicket).indexOf(val.stockticket); 
    if (index === -1) {
      recommendationData = {
        key: val.id,
        stockName: val.stockname,
        stockTicket: val.stockticket,
        sectorName: val.sectorname, 
        averageTargetPrice: val.target,
        averagePotential: Number((val.target/val.initial_price - 1) * 100),
        research: [{
          key: val.id,
          stockTicket: val.stockticket,
          researchName: val.researchname,
          researchId: val.research,
          rating: val.rating,
          initialPrice: val.initial_price,
          dateFinal: val.datefinal.split('-').reverse().join('/'),
          targetPrice: val.target,
          potential: Number(((val.target/val.initial_price - 1) * 100).toFixed(2))
        }]
      } 
      acc.push(recommendationData); 
      
    } else {
      const researchData = {
        key: val.id,
        stockTicket: val.stockticket,
        researchName: val.researchname,
        researchId: val.research,
        rating: val.rating,
        initialPrice: val.initial_price,
        dateFinal: val.datefinal.split('-').reverse().join('/'),
        targetPrice: val.target, 
        potential: Number(((val.target/val.initial_price - 1) * 100).toFixed(2))
      }
      acc[index].research.push(researchData); 
      acc[index].averageTargetPrice += val.target
      acc[index].averagePotential = Number((acc[index].averagePotential + researchData.potential).toFixed(2))

    }
  
    return acc
  }, []); 
  const ticketList = [];
  for (let stk of data.results){ 
    if (!ticketList.includes(stk.stockticket)){
      ticketList.push(stk.stockticket);
    }
  }  
  return {totalPages, totalOfRecomendations, ticketList, recommendationsListData}
}

function enable(){
    if (isAuthenticated()){
      return true
    }else{
      return false
    }
  }

export function useRecommendations(page, params) {

  return useQuery(['recommendationsList', page, params], async () =>  getRecommendations(page, params), {
    enabled: enable(),
    staleTime: 1000 * 60 * 60 * 24,  // 24h
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
}
