'use client'

import Link from 'next/link';
//import InstagramIcon from '@mui/icons-material/Instagram';
//import TwitterIcon from '@mui/icons-material/Twitter';
import styled from 'styled-components';
import Navbar from './Navbar';

const FooterDiv = styled.footer`
  background-color: ${({ theme }) => theme.colors.dark};
  display: flex;
  height: 90px;
  justify-content: space-between;
  padding: 0 10vw;
  h4, p {
    margin-bottom: .4rem;
    color: ${({ theme }) => theme.colors.light};
  }
`;

const EmailDiv = styled.div`
  width: 202px;
  margin-top: 20px;
`;

const NavDiv = styled.div`
  margin-top: 20px;
`;

const SocialsDiv = styled.div`
  margin-top: 20px;
`;

const Rights = styled.div`
  display: flex;
  height: 30px;
  justify-content: center;
  align-items: center;
  p {
    font-size: 0.8rem;
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
          <h4>Email</h4>
          <p>ruadebaixoloja@gmail.com</p>
        </EmailDiv>
        <NavDiv>
          <h4>Explore</h4>
          <Navbar />
        </NavDiv>
        <SocialsDiv>
          <h4>Siga-nos</h4>
          <IconDiv>
            <Icon href=''>
              insta
            </Icon>
            <Icon href=''>
              twitter
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