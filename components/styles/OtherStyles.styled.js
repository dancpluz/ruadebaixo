'use client'

import styled from 'styled-components';
import Image from 'next/image';

export const LogoCMS = styled(Image)`
  height: auto;
  width: 60px;
  filter: invert(100%);
  position: absolute;
  z-index: 120;
  top: 15px;
  left: 20px;
`;

export const CenterScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 189px);
  padding-top: 65px;
  margin: 0 200px;
  div {
    text-align: center;
  }
  a {
    color: ${({ theme }) => theme.colors.dark};
    text-decoration: none;
  }
  @media ${({ theme }) => theme.sizes.medium} {
    margin: 0 100px;
  }
  @media ${({ theme }) => theme.sizes.small} {
    margin: 0 32px;
  }
`;

