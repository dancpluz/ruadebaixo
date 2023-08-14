'use client'

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 64px 200px;
  h1 {
    text-align: center;
  }
  gap: 32px;
  @media ${({ theme }) => theme.sizes.medium} {
    padding: 42px 100px;
  }
  @media ${({ theme }) => theme.sizes.small} {
    padding: 42px 32px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 32px;
`;

export const ProductsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  flex-grow: 1;
`
