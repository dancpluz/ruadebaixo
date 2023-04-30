import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import Center from './Center';
import CartButton from './CartButton';
import Cart from '../components/Cart';
import logoIcon from "../assets/logo.svg";
import { keyframes } from 'styled-components';
import { useStateContext } from '../context/StateContext';

const Wrapper = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  padding: 0 8vw;
`;

const rise = keyframes`
 to {
    text-shadow: 0.1px 0.3px 0 var(--border),
                0.3px 0.6px 0 var(--border);
		transform: translateY(2px) translateX(2px);
	}
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  width: 100px;
  text-align: center;
`;

const StyledNav = styled.nav`
  display: flex;
`;

const Logo = styled(Image)`
  height: 50px;
  width: 80px;
  filter: invert(100%);
`;

const LogoContainer = styled(Link)`
  display: flex;
  justify-content: center;
`;

export default function Header() {
  const { showCart } = useStateContext();

  return (
    <Wrapper>
      <LogoContainer href='/'>
        <Logo src={logoIcon} alt='logo' />
      </LogoContainer>
      <StyledNav>
        <NavLink href=''><h1>Sobre</h1></NavLink>
        <NavLink href=''><h1>Produtos</h1></NavLink>
        <NavLink href=''><h1>FAQ</h1></NavLink>
      </StyledNav>
      <CartButton />
    {showCart && < Cart />}
    </Wrapper>
  )
}
