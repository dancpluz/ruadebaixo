import Link from 'next/link';
import styled from 'styled-components';

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  text-align: center;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 4vw;
`;

export default function Navbar() {
  return (
      <StyledNav>
        <NavLink href=''>
          <h1>Sobre</h1>
        </NavLink>
        <NavLink href=''>
          <h1>Produtos</h1>
        </NavLink>
        <NavLink href=''>
          <h1>LookBook</h1>
        </NavLink>
        <NavLink href=''>
          <h1>Contato</h1>
        </NavLink>
      </StyledNav>
  )
}
  