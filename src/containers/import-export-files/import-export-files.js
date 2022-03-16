import { Header } from '../../components/Header/Header.js'
import { ImportExportPageContent } from '../../components/ImportExportPageContent/ImportExportPageContent'
import { Sidebar } from '../../components/Sidebar/Sidebar.js';

import { Layout } from 'antd';
import './styles.css'


export function ImportExportFiles() {
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
        <ImportExportPageContent />     
      </Layout>
    </Layout>
    </div>
  )
}





