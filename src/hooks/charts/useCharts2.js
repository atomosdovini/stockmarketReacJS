import { useQuery } from 'react-query'
import { api } from '../../services/api'

export async function getCharts2(ticket) {
  const {data} = await api.get(`chart-2/?ticket=${ticket}`);
  return data
}

export function useCharts2(ticket) {
  return useQuery(['chart2', ticket], async () => getCharts2(ticket), {
    staleTime: 1000 * 60 * 60 * 24,  // 24h
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
}
