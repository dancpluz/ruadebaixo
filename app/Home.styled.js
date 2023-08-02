'use client'

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;
export const Logo = styled(Image)`
  width: 100%;
  max-width: 400px;
`;
export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({theme}) => theme.colors.dark};
  padding: 0 20px;
`;
  