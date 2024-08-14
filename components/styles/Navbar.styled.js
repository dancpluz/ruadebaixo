'use client'

import Link from 'next/link';
import styled from 'styled-components';

export const NavLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 8px;
  p {
    color: ${({theme}) => theme.colors.light};
    text-decoration: ${(props) => props.selected ? 'underline' : ''};
    &:hover {
      text-decoration: underline;
    }
  }
`;
export const StyledNav = styled.nav`
  display: flex;
  gap: 48px;
  @media ${({theme}) => theme.sizes.small} {
    margin: 0 32px;
    gap: 36px;
    justify-content: space-between;
    p {
      font-size: .8rem;
    }
  }
`;
  