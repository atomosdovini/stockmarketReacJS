import { useQuery } from 'react-query'
import { api } from '../../services/api'

async function getLogs(page) {
  const {data} = await api.get('/log/', {
    params: {
      page: page
    }
  })
  const totalOfLogs = data.count
  const totalPages = data.total_pages
  const logList = data.results.map( log => {
    return {
      status: log.status,
      userName: log.username, 
      text: log.text, 
      createdAt: new Intl.DateTimeFormat('pt-BR').format(new Date(log.createdat))
    }
  })            
  return {logList, totalPages, totalOfLogs}
}

export function useLogs(page) {
  return useQuery(['list of Logs', "page", page], async () => getLogs(page), {
    staleTime: 1000 * 60 * 60 * 24,  // 24h
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
}