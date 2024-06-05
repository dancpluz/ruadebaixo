'use client'

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 130px 200px;
  min-height: calc(100vh - 385px);
  h1 {
    text-align: center;
  }
  gap: 32px;
  @media ${({ theme }) => theme.sizes.medium} {
    padding: 100px 100px;
  }
  @media ${({ theme }) => theme.sizes.small} {
    padding: 100px 32px;
  }
`;
