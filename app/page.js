'use client'

import Image from 'next/image';
import logo from '../public/assets/logonew.svg';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Logo = styled(Image)`
  width: 100%;
  height: auto;
  max-width: 400px;
`;

export default function Home() {
  return (
    <Container>
      <Logo src={logo} alt="RDB Logo" />
      <h1>Em breve...</h1>
    </Container>
  )
}
