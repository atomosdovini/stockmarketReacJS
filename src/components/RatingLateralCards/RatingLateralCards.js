import { useState, useEffect } from 'react'
import { useRecommendationsFilters } from '../../context/useRecommendationsFilters'

import { Card, Space, Spin} from 'antd';
import { Container, RatingType, RatingValue, Title } from './styles';

export function RatingLateralCards() {
  const { recommendationsTableData, isError, isLoading } = useRecommendationsFilters()
  const [cardValue, setCardValue] = useState([])
  let cardList;

  useEffect(() => {
    if (recommendationsTableData) {   
      const updatedCardValue = recommendationsTableData.reduce((acc, val) => {
        cardList = {
          stockticket: val.stockTicket,
          compra: 0,
          venda: 0,
          neutro: 0,
          revisao: 0,
        }
        val.research.map((research) => {
          switch (research.rating.toUpperCase()) {
            case "COMPRA":
              cardList.compra++
              break;          
            case "VENDA":
              cardList.venda++          
              break;
            case "NEUTRO":
              cardList.neutro++        
              break;
            case "REVISAO":
              cardList.revisao++        
              break;
            default:
              break;
          } 
        })        
        acc.push(cardList)
        return acc
      }, [])
      updatedCardValue.sort((a,b) => {
        return b.compra - a.compra
      })
      
      setCardValue(updatedCardValue)
    } 
  }, [recommendationsTableData])
  
  return (
    <Container>
      <Title>Contagem de Rating</Title>
      {isLoading && !isError ?
        <Space size="large" style={{width: "100%"}} direction="vertical" align="center">
            <Spin style={{width: "100%", marginTop: "24px", marginBottom: "16px", color: "var(--light-primary-color)"}}/>
        </Space>
      : !isLoading && !isError ? cardValue.map(card => {
        return (
        <Card key={card.stockticket}
        headStyle={{
          fontSize: 24,
          fontWeight: 'bold',
          color: "var(--light-primary-color)",
          marginBottom: -4
        }}
        bodyStyle={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: "0 12px"
        }}
        size="small"
        title={card.stockticket}
        extra={          
          <Space size={0} direction="vertical" align="center">
            <RatingType>Compra</RatingType>
            <RatingValue>{card.compra}</RatingValue>
          </Space>
        }
        style={{
          background: "#f3f3f3",
          width: 156,
          marginTop: 8,

        }}
      >
        <Space align="center" size={15}>
          <Space size={0} direction="vertical" align="center">
            <RatingType>Neutro</RatingType>
            <RatingValue>{card.neutro}</RatingValue>
          </Space>
          <Space size={0} direction="vertical" align="center">
            <RatingType>Venda</RatingType>
            <RatingValue>{card.venda}</RatingValue>
          </Space>
          <Space size={0} direction="vertical" align="center">
            <RatingType>Revisao</RatingType>
            <RatingValue>{card.revisao}</RatingValue>
          </Space>
        </Space>

      </Card> ) 
      }) :
      <></>     
      }
    </Container>
  )

}
