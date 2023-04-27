import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  color: white;
  background-color: black;
  text-align: center;
  margin-top: 10px;
  padding: 30px 10px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  justify-content: center;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Icon = styled(Link)`
  color: white;
`;


export default function Footer() {
  return (
    <FooterContainer>
      <p>Todos os direitos reservados Rua de Baixo © 2023</p>
      <IconContainer>
        <Icon href='https://www.instagram.com/ruadebaixoloja/'>
          <InstagramIcon />
        </Icon>
        <Icon href='https://www.instagram.com/ruadebaixoloja/'>
          <TwitterIcon />
        </Icon>
      </IconContainer>
    </FooterContainer>
  );
}