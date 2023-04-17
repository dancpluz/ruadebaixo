import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import Center from '/components/Center';
import CartButton from '/components/CartButton';
import logoIcon from "../assets/logo.svg";
import { keyframes } from 'styled-components';

//import { useStateContext } from '../context/StateContext';

const StyledHeader = styled.header`
  background-color: #eee;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 20px 0;
`;

const rise = keyframes`
 to {
    text-shadow: 0.1px 0.3px 0 var(--border),
                0.3px 0.6px 0 var(--border);
		transform: translateY(2px) translateX(2px);
	}
`;

const NavLink = styled(Link)`
  --border: black; 
  --fill: white;

  color: #fff;
  text-decoration: none;
  font-size: 23px;
  font-weight: 800;
  -webkit-text-stroke-width: 0.8px;
  -webkit-text-stroke-color: var(--border);
  letter-spacing: -0.7px;
  text-shadow:
        0.1px 0.3px 0 var(--border),
        0.3px 0.6px 0 var(--border),
        0.5px 0.9px 0 var(--border),
        0.7px 1.2px 0 var(--border),
        0.9px 1.5px 0 var(--border),
        1.0px 1.8px 0 var(--border),
        1.1px 2.1px 0 var(--border);
  &:hover {
    animation: ${rise} 0.1s ease 0s forwards;
  }


`;

const StyledNav = styled.nav`
  display: flex;
  gap: 8vw;
`;

const Logo = styled(Image)`
  height: 90px;
  width: 150px;
`;

export default function Header() {
  //const { showCart,setShowCart,totalQuantities } = useStateContext();
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Link href='/'>
            <Logo src={logoIcon} alt='logo' />
          </Link>
          <StyledNav>
            <NavLink href=''>Produtos</NavLink>
            <NavLink href=''>LookBook</NavLink>
          </StyledNav>
          <CartButton />
        </Wrapper>
      </Center>
      
      {
      //showCart && <Cart />
      }
    </StyledHeader>
  )
}
