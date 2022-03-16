import { useQuery } from 'react-query'
import { api } from '../services/api'

async function getResearchs() {
  const {data} = await api.get('/research/')
  const researchList = data.results.map( research => {
    return {
      title: research.name, 
      value: research.name, 
      active: research.active
    }
  })            
  return researchList
}

export function useResearchs() {
  return useQuery(['list of researchs'], async () => getResearchs(), {
    staleTime: 1000 * 60 * 60 * 24,  // 24h
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
}


