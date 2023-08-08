'use client'

import Navbar, { StyledNav } from './Navbar';
import hamburgerIcon from '@/public/assets/icons/hamburger.svg';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import CartButton from './CartButton';
import Cart from './Cart';
import logoRDB from "@/public/assets/icons/logordb.svg";
import { useStateContext } from '../context/StateContext';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  padding: 0 200px;

  @media ${({ theme }) => theme.sizes.medium} {
    padding: 0 100px;
  }

  @media ${({ theme }) => theme.sizes.small} {
    padding: 0 32px;
    ${StyledNav} {
      display: none;
    }
  }
`;

const Logo = styled(Image)`
  height: auto;
  width: 80px;
  filter: invert(100%);
`;

const LogoContainer = styled(Link)`
  display: flex;
  justify-content: start;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 80px;
  margin-right: 8px;
`;

const HamburgerContainer = styled.div`
  display: none;
  @media ${({ theme }) => theme.sizes.small} {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 80px;
    height: 40px;
  }
`;

const HamburgerIcon = styled(Image)`

  cursor: pointer;
`;

const MobileNavbar = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  height: 60px;
  @media ${({ theme }) => theme.sizes.small} {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  }
`;

export default function Header() {
  const { showCart, setShowCart } = useStateContext();
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <Container>
      <Wrapper>
        <HamburgerContainer>
          <HamburgerIcon onClick={() => setShowNavbar(!showNavbar)} src={hamburgerIcon} alt='Mostrar links' />
        </HamburgerContainer>
        <LogoContainer href='/'>
          <Logo src={logoRDB} alt='RDB Logo' />
        </LogoContainer>
        <Navbar />
        <ButtonContainer>
          <CartButton onClick={() => setShowCart(true)} />
          {showCart && < Cart />}
        </ButtonContainer>
        
      </Wrapper>
      {showNavbar && 
        <MobileNavbar>
        <Navbar />
      </MobileNavbar>}
    </Container>
  )
}
