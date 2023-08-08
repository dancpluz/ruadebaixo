import styled from 'styled-components';
import Image from 'next/image';
import hamburgerIcon from '@/public/assets/icons/hamburger.svg';
import { useState } from 'react';
import Navbar from './Navbar';

const Container = styled.div`
  display: none;
  
`;

const Icon = styled(Image)`

  cursor: pointer;
`;

export default function Hamburger() {
  return (
    <Container>
      <Navbar />
    </Container>
  )
}
