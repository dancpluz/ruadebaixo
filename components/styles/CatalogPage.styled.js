'use client'

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 130px 100px;
  h1 {
    text-align: center;
  }
  gap: 32px;
  @media ${({ theme }) => theme.sizes.medium} {
    //padding: 100px 100px;
  }
  @media ${({ theme }) => theme.sizes.small} {
    //padding: 100px 32px;
  }
`;
