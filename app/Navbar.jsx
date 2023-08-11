'use client'

import Link from 'next/link';
import styled from 'styled-components';

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.dark};
  text-align: center;
  :active {
    text-decoration: none;
  }
`;

export const StyledNav = styled.nav`
  display: flex;
  gap: 64px;
`;

export default function Navbar() {
  return (
      <StyledNav>
        <NavLink href={'/'}>
          <p>LookBook</p>
        </NavLink>
        <NavLink href={'/links'}>
          <p>Links</p>
        </NavLink>
      </StyledNav>
  )
}
  