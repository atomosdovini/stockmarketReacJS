import { api } from '../../services/api'

export async function getRecommendationsByTickets(ticket) {
  const {data} = await api.get(`/recommendation/?ticket=${ticket}`, { timeout: 200000 })
 let recommendationData;
  const recommendationsListData = data.results.reduce((acc, val) => {
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
  }, [])
  return recommendationsListData
}