import { Container, Logo, StyledLink } from './Home.styled';
import logo from '../public/assets/logonew.svg';

export default function Home() {
  return (
    <Container>
      <StyledLink href={'/links'}>
        <Logo priority src={logo} alt="RDB Logo" />
        <h1>Em breve...</h1>
      </StyledLink>
    </Container>
  )
}
