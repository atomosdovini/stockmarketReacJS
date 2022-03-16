import { useQuery } from 'react-query'
import { api } from '../../services/api'

export async function getCharts1(ticket) {
  const {data} = await api.get(`chart-1/?ticket=${ticket}`); 
  return data
}

export function useCharts1(ticket) {
  return useQuery(['chart1', ticket], async () => getCharts1(ticket), {
    staleTime: 1000 * 60 * 60 * 24,  // 24h
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
}
