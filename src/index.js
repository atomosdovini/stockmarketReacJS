import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import ptBr from 'antd/lib/locale/pt_BR';
import { RecommendationsFiltersProvider } from './context/useRecommendationsFilters';
import { queryClient } from './services/queryClient'


ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ptBr}> 
        <RecommendationsFiltersProvider>
          <App />
        </RecommendationsFiltersProvider>
      </ConfigProvider>  
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,

  document.getElementById('root')
);
