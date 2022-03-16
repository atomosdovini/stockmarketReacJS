import logoImg from '../../assets/logo.png'
import { UserLogin } from '../UserLogin/UserLogin';
import { Container, Content } from './styles';

export function Header() {
  return (
    <Container>
      <Content>
        {/* <img src={logoImg} alt="Consenso" /> */}
        <UserLogin />
      </Content>
    </Container>
  )
}
