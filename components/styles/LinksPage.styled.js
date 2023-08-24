'use client'

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 500px;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 32px;
  
  h1, h2 {
    margin: 12px 0;
  }
`;

export const Logo = styled(Image)`
  width: 100%;
  height: auto;
  max-width: 420px;
  max-height: 100%;
`;

export const Icon = styled(Image)`
  height: 36px;
  width: auto;
`;

export const StyledLink = styled(Link)`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: 2px solid ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.dark};
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  height: 60px;
  width: 100%;
  transition: all 0.2s ease-in-out;
  ${Icon} {
    filter: invert(1);
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.light};
    ${Icon} {
      filter: invert(0);
    }
  }
  &:active {
    opacity: 0.8;
  }
`;

export const IconDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
  width: 60px;
`;