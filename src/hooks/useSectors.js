import { useQuery } from 'react-query'
import { api } from '../services/api'

async function getSectors() {
  const {data} = await api.get('/sectors/')
  const sectorList = data.map( sector => {
    return {
      title: sector.name, 
      value: sector.name, 
      id: sector.id
    }
  })  
  return sectorList
}

export function useSectors() {
  return useQuery(['list of sectors'], async () => getSectors(), {
    staleTime: 1000 * 60 * 60 * 24,  // 24h
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
}


