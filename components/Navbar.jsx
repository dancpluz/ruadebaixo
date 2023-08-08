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

export const StyledNav = styled.nav`
  display: flex;
  gap: 36px;
  @media ${({ theme }) => theme.sizes.small} {
    width: 100%;
    margin: 0 32px;
    justify-content: space-between;
    p {
      font-size: .85rem;
    }
  }
`;

export default function Navbar() {
  return (
      <StyledNav>
        <NavLink href={'/'}>
          <p>Home</p>
        </NavLink>
        <NavLink href={'/produtos'}>
          <p>Produtos</p>
        </NavLink>
        <NavLink href={'/lookbook'}>
          <p>LookBook</p>
        </NavLink>
        <NavLink href={'/links'}>
          <p>Links</p>
        </NavLink>
      </StyledNav>
  )
}
  