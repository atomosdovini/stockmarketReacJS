import { Header } from '../../components/Header/Header.js'
import { ResearchTablePageContent } from '../../components/ResearchTablePageContent/ResearchTablePageContent.js';
import { Sidebar } from '../../components/Sidebar/Sidebar.js';
import { Layout} from 'antd';
import './styles.css'

export function Recommendations() {
  return (
    <div className="container">
    <Header />
    <Layout 
      style={{
        width: "100%",
        maxWidth: "100%",
      }}>
      <Sidebar selectedKey={'1'} />
      <Layout style={{ background: "#ffffff"}}>
        <ResearchTablePageContent />     
      </Layout>
    </Layout>
    </div>
  )
}





