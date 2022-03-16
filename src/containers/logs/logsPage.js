
import { LogsPageContent } from '../../components/LogsPageContent/LogsPageContent.js';
import { Sidebar } from '../../components/Sidebar/Sidebar.js';
import { Header } from '../../components/Header/Header.js'

import { Layout} from 'antd';
import './styles.css'


export function LogsPage() {
  return (
    <div className="container">
    <Header />
    <Layout 
      style={{
        width: "100%",
        maxWidth: "100%"
      }}>
      <Sidebar selectedKey={'3'} />
      <Layout style={{ background: "#ffffff"}}>
        <LogsPageContent />  
      </Layout>
    </Layout>
    </div>
  )
}





