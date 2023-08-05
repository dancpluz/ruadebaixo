'use client'

import Navbar from './Navbar';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import CartButton from './CartButton';
import Cart from './Cart';
import logoRDB from "@/public/assets/icons/logordb.svg";
import { useStateContext } from '../context/StateContext';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  padding: 0 10vw;
`;

const Logo = styled(Image)`
  height: auto;
  width: 80px;
  filter: invert(100%);
`;

const LogoContainer = styled(Link)`
  display: flex;
  justify-content: center;
`;

export default function Header() {
  const { showCart, setShowCart } = useStateContext();
  return (
    <Wrapper>
      <LogoContainer href='/'>
        <Logo src={logoRDB} alt='RDB Logo' />
      </LogoContainer>
      <Navbar />
      <CartButton onClick={() => setShowCart(true)} />
      {showCart && < Cart />}
    </Wrapper>
  )
}
