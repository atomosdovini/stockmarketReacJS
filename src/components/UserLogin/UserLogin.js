import { useSelector } from 'react-redux'

import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { Avatar, Container, UserInformations } from "./styles";
import Navbar from '../Navbar';
const date = new Date();
const time = date.getHours();
const saudacao = (5 < time && time <= 12) ? "Bom dia" : (12 < time && time <= 18) ? "Boa tarde" : "Boa noite"




export function UserLogin() {
  const login = useSelector(state => state.auth.user)

  return (
    <Container>

      <UserInformations>
        <div style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: "white",
          marginLeft:-20,
        }}>
          {saudacao}
        </div>
              <Navbar/>
      </UserInformations>
    </Container>
  )
}


