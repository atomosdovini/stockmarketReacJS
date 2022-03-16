import { Link } from 'react-router-dom';
import './styles.css'
import { Layout, Menu} from 'antd';
import iconResearcher from '../../assets/rendavariavel-icon.svg'
import iconStock from '../../assets/acoes-icon.svg'
import iconSettings from '../../assets/settings-icon.svg'
import iconQuit from '../../assets/quit-icon.svg'
const { Sider } = Layout;
export function Sidebar({selectedKey}) {
  return (
    <Sider
    className='sidebar-menu'
    breakpoint="lg"
    collapsedWidth="0"
    >
      <Menu style={{ background: 'var(--light-primary-color)'}} theme="dark" mode="inline" defaultSelectedKeys={[selectedKey]}>
        <Menu.Item key='1'>
          <Link to="/recommendations">
            <img src={iconResearcher} style={{marginRight: 8}}/>Rec. Renda Variável
          </Link>
        </Menu.Item>        
        <Menu.Item key="2">
            <Link to="/stocks">
            <img src={iconStock} style={{marginRight: 8}}/> Ações
          </Link>
        </Menu.Item>
        <Menu.Item key='3'>
            <Link to="/import-export-files">
            <img src={iconSettings} style={{marginRight: 8}}/> Importar/exportar 
          </Link>
        </Menu.Item>
        {/* <Menu.Item key='4'>
            <Link to="/signup">
            <img src={iconQuit} style={{marginRight: 8}}/> Cadastrar usuário 
          </Link>
        </Menu.Item> */}
      </Menu>
    </Sider>
  )
}