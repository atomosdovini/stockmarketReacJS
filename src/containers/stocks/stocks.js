import { Header } from '../../components/Header/Header.js'
import { StocksTablePageContent } from '../../components/StocksTablePageContent/StocksTablePageContent.js';
import { Sidebar } from '../../components/Sidebar/Sidebar.js';

import { Layout} from 'antd';
import './styles.css'

export function Stocks() {
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
        <StocksTablePageContent />       
      </Layout>
    </Layout>
    </div>
  )
}





