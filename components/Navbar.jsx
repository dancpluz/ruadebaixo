import Link from 'next/link';
import styled from 'styled-components';

const NavLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  p {
    color: ${({ theme }) => theme.colors.light};
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 4vw;
`;

export default function Navbar() {
  return (
      <StyledNav>
        <NavLink href=''>
          <p>Sobre</p>
        </NavLink>
        <NavLink href={'/produtos'}>
          <p>Produtos</p>
        </NavLink>
        <NavLink href={'/lookbook'}>
          <p>LookBook</p>
        </NavLink>
        <NavLink href=''>
          <p>Contato</p>
        </NavLink>
      </StyledNav>
  )
}
  