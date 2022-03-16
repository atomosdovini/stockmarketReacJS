import { Header } from '../../components/Header/Header.js'
import { TicketTable } from '../../components/Tables/TicketTable/TicketTable.js';
import { Sidebar } from '../../components/Sidebar/Sidebar.js';
import { Button, Layout, Space, Spin} from 'antd';
import './styles.css'
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom'
import {useState,useEffect } from 'react';
import { useCharts1 } from '../../hooks/charts/useCharts1.js';
import { useCharts2 } from '../../hooks/charts/useCharts2.js';
import { queryClient } from '../../services/queryClient.js';


export function StockDetails() {
  const {ticket} = useParams()
  const [dataChart1, setDataChart1] = useState({})
  const [dataChart2, setDataChart2] = useState({})

  const {data: chart1, isSuccess: isChart1Success, isLoading: isChart1Loading} = useCharts1(ticket)
  const {data: chart2, isSuccess: isChart2Success, isLoading: isChart2Loading} = useCharts2(ticket)

  async function refetchChart(chart) {
    queryClient.invalidateQueries([chart, ticket])
  }
  
  useEffect(() => {
    if(chart1) {
      const setDate = chart1.map(stocks => stocks.Date);
      const setClose = chart1.map(stocks => stocks.Close);
      const setResearchBradesco = chart1.map(stocks => stocks['1']);
      const setResearchBTG = chart1.map(stocks => stocks['2']);
      const setResearchEleven = chart1.map(stocks => stocks['3']);
      const setResearchGenial = chart1.map(stocks => stocks['4']);
      const setResearchItau = chart1.map(stocks => stocks['5']);
      const setResearchXP = chart1.map(stocks => stocks['6']);
      const data = {
          labels: setDate,
          datasets: [
            {
              label: ticket,
              data: setClose,
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
              yAxisID: 'y-axis-1',
            },
            {
              label: '1',
              data: setResearchBradesco,
              fill: false,
              backgroundColor: 'rgb(194, 37, 220)',
              borderColor: 'rgba(194, 37, 220, 0.2)',
              yAxisID: 'y-axis-2',
            },
            {
              label: '2',
              data: setResearchBTG,
              fill: false,
              backgroundColor: 'rgb(37, 220, 77)',
              borderColor: 'rgba(37, 220, 77, 0.2)',
              yAxisID: 'y-axis-2',
            },
            {
              label: '3',
              data: setResearchEleven,
              fill: false,
              backgroundColor: 'rgb(165, 208, 95)',
              borderColor: 'rgba(165, 208, 95, 0.2)',
              yAxisID: 'y-axis-2',
            },
            {
              label: '4',
              data: setResearchGenial,
              fill: false,
              backgroundColor: '#6D3B9E',
              borderColor: 'rgba(73, 138, 202, 0.2)',
              yAxisID: 'y-axis-2',
            },
            {
              label: '5',
              data: setResearchItau,
              fill: false,
              backgroundColor: 'rgb(204, 0, 159)',
              borderColor: 'rgba(204, 0, 159, 0.2)',
              yAxisID: 'y-axis-2',
            },
            {
              label: '6',
              data: setResearchXP,
              fill: false,
              backgroundColor: 'rgb(54, 162, 235)',
              borderColor: 'rgba(54, 162, 235, 0.2)',
              yAxisID: 'y-axis-2',
            },
          ],
      };
      setDataChart1(data)
    }
  }, [chart1])  

  useEffect(() => {
    if(chart2) {
      const setDate2 = chart2.map(stocks2 => stocks2.Date);
      const setClose2 = chart2.map(stocks2 => stocks2.Close);
      const media = chart2.map(stocks2 => stocks2.Media);
      const data2 = {
        labels: setDate2,
        datasets: [
          {
            label: ticket,
            data: setClose2,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            yAxisID: 'y-axis-1',
          },
          {
            label: 'Media recomendações',
            data: media,
            fill: false,
            backgroundColor: 'rgb(194, 37, 220)',
            borderColor: 'rgba(194, 37, 220, 0.2)',
            yAxisID: 'y-axis-2',
          },
      
      
              ],
      };
      setDataChart2(data2)
    }
  }, [chart2])

  const options = {
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
    },
  };
  

  return (
    <div className="container">
    <Header />
    <Layout 
      style={{
        width: "100%",
        maxWidth: "100%"
      }}>
     <Sidebar selectedKey={'2'} />
      <Layout style={{ background: "#ffffff"}}>
        <Space 
          style={{ 
            margin: "32px"
          }}
          size={64}
          direction="vertical" 
          >    
          <TicketTable/>

          {dataChart1.labels ? <Line data={dataChart1} options={options} /> : 
          !isChart1Loading && !isChart1Success ? <p style={{marginLeft: 300}}>Falha ao carregar os gráficos!<Button type="link" onClick={() => refetchChart('chart1')}>Tentar novamente</Button></p> :
          <Space align="center" size="small"  style={{marginLeft: 384}}><p style={{marginBottom: 0}}>Carregando gráfico...</p> <Spin/> </Space>}
          
          {dataChart2.labels ? <Line data={dataChart2} options={options} /> :
          !isChart2Loading && !isChart2Success ? <p style={{marginLeft: 300}}>Falha ao carregar os gráficos! <Button type="link" onClick={() => refetchChart('chart2')}>Tentar novamente</Button></p> :
          <Space align="center" size="small"  style={{marginLeft: 384}}><p style={{marginBottom: 0}}>Carregando gráfico...</p> <Spin/> </Space>}
        </Space>    
      </Layout>
    </Layout>
    </div>
  )
}





