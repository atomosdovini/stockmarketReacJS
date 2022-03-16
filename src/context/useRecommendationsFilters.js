import { createContext, useEffect, useState, useContext } from 'react';
import { useRecommendations } from '../hooks/recommendations/useRecommendations';
import { getRecommendationsByTickets } from '../hooks/recommendations/useRecommendationsByTicket';
import { useTickets } from '../hooks/ticket/useTickets';
import { queryClient } from '../services/queryClient';

const RecommendationsFiltersContext = createContext();

export function RecommendationsFiltersProvider({children}) {
  const [sector, setSector] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [rating, setRating] = useState([]);
  const [research, setResearch] = useState([]);
  const [date_i, setDate_i] = useState("");
  const [date_f, setDate_f] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const [params, setParams] = useState({})
  const [isRefeching, setIsRefeching] = useState(false)

  useEffect(() => {
    const arrayOfSectorsId = sector.map(sector => sector.id )
    const paramsData = {
      research: research, 
      rating: rating, 
      sector: arrayOfSectorsId,
      date_i: date_i,
      date_f: date_f,
    }
    setParams(paramsData)
    setCurrentPage(1)
  },[research, rating, sector, date_i, date_f])

  const {data: recommendationsList, isLoading, isError} = useRecommendations(currentPage, params)
  const listOfStocks = recommendationsList?.ticketList
  const totalResearchTablePages = recommendationsList?.totalPages
  const totalRecomendations = recommendationsList?.totalOfRecomendations
  const recommendationsTableData = recommendationsList?.recommendationsListData
  const ticketData = useTickets(listOfStocks || [])

  function onDateSelection(value, date) {
    const initialDate = date[0].split('/').reverse().join('-');
    const finalDate = date[1].split('/').reverse().join('-');
    setDate_i(initialDate)
    setDate_f(finalDate)
  }

  function handleChangePage(page) {
    setCurrentPage(page)
  }
  
  async function handlePrefetchRecommendations(ticket) {
    await queryClient.prefetchQuery(['recommendations for', ticket], async () => await getRecommendationsByTickets(ticket), {
      staleTime: 1000 * 60 * 60 * 24,  // 24h
      cacheTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      refetchOnMount: false
    })
  }

  async function handleRefetchRecommendations() {
    await queryClient.refetchQueries({ active: true })
    setIsRefeching(false)
  }

  return (
    <RecommendationsFiltersContext.Provider 
    value={{
      ticketData,
      handlePrefetchRecommendations,
      handleRefetchRecommendations,
      recommendationsTableData,
      rating,
      setRating,
      research,
      setResearch,
      currentPage,
      handleChangePage,
      totalResearchTablePages,
      totalRecomendations,
      onDateSelection,
      sector, 
      setSector,
      stocks,
      setStocks,
      params,
      isLoading,
      isError,
      isRefeching,
      setIsRefeching
    }} > 
      {children}
    </RecommendationsFiltersContext.Provider>
  )
}

export function useRecommendationsFilters() {
  const context = useContext(RecommendationsFiltersContext)

  return context
}