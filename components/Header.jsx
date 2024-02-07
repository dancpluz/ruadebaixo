'use client'

import Navbar from './Navbar';
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
  z-index: 6;
  position: fixed;
  width: 100vw;
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
  }
`;

const Logo = styled(Image)`
  height: auto;
  width: 80px;
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

export const HamburgerContainer = styled.div`
  display: none;
  @media ${({ theme }) => theme.sizes.small} {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 80px;
    height: 40px;
  }
`;

export const HamburgerIcon = styled(Image)`
  cursor: pointer;
`;

const NavBarDiv = styled.div`
  @media ${({ theme }) => theme.sizes.small} {
    display: none;
  }
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
          <HamburgerIcon onClick={() => setShowNavbar((current) => !current)} src={hamburgerIcon} alt='Mostrar links' />
        </HamburgerContainer>
        <LogoContainer href='/'>
          <Logo src={logoRDB} alt='RDB Logo' priority />
        </LogoContainer>
        <NavBarDiv>
          <Navbar />
        </NavBarDiv>
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
