import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import styled from 'styled-components';
import Navbar from './Navbar';

const FooterDiv = styled.footer`
  background-color: black;
  color: white;
  display: flex;
  height: 90px;
  justify-content: space-between;
  padding: 0 180px;
`;

const EmailDiv = styled.div`
  margin: auto 0;
  width: 202px;
`;

const NavDiv = styled.div`
  margin: auto 0;
`;

const SocialsDiv = styled.div`
  margin: auto 0;
  width: 202px;
`;

const Title = styled.h1`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 7px;
`;

const Text = styled.p`
  font-size: 16px;
`;

const Rights = styled.div`
  display: flex;
  height: 30px;
  justify-content: center;
  align-items: center;
  p {
    font-size: 12px;
  }
`;

const IconDiv = styled.div`
  display: flex;
  gap: 8px;
`;

const Icon = styled(Link)`
  color: white;
`;

export default function Footer() {
  return (
    <>
      <FooterDiv>
        <EmailDiv>
          <Title>Email</Title>
          <Text>ruadebaixoloja@gmail.com</Text>
        </EmailDiv>
        <NavDiv>
          <Title>Explore</Title>
          <Navbar />
        </NavDiv>
        <SocialsDiv>
          <Title>Siga-nos</Title>
          <IconDiv>
            <Icon href=''>
              <InstagramIcon />
            </Icon>
            <Icon href=''>
              <TwitterIcon />
            </Icon>
          </IconDiv>
        </SocialsDiv>
      </FooterDiv>
      <Rights>
        <p>Todos os direitos reservados RUA DE BAIXO © 2023</p>
      </Rights>
    </>
  );
}