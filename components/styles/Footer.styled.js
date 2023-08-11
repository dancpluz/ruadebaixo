'use client'

import styled from 'styled-components';

export const FooterDiv = styled.footer`
  background-color: ${({theme}) => theme.colors.dark};
  display: flex;
  justify-content: space-between;
  padding: 16px 200px;

  h4, p {
    margin-bottom: .4rem;
    color: ${({theme}) => theme.colors.light};
  }
  @media ${({theme}) => theme.sizes.medium} {
    padding: 16px 100px;
  }
  @media ${({theme}) => theme.sizes.small} {
    padding: 16px 32px;
    flex-direction: column;
    gap: 12px;
  }
`;

export const NavDiv = styled.div`
  @media ${({theme}) => theme.sizes.small} {
    nav {
      gap: 16px;
      justify-content: center;
    }
    h4 {
      text-align: center;
    }
  }
`;

export const SocialsDiv = styled.div`
  @media ${({theme}) => theme.sizes.small} {
    h4 {
      display: none;
    }
  }
`;

export const Rights = styled.div`
  display: flex;
  padding: 6px 0;
  justify-content: center;
  align-items: center;
  p {
    font-size: 0.8rem;
  }
`;

export const IconDiv = styled.div`
  display: flex;
  gap: 16px;
  @media ${({theme}) => theme.sizes.small} {
    justify-content: center;
    gap: 32px;
  }
`;
  