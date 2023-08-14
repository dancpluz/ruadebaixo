'use client'

import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

export const Container = styled.div`
  padding: 42px 200px;
  h1 {
    text-align: center;
    margin-bottom: 48px;
  }
  @media ${({ theme }) => theme.sizes.medium} {
    padding: 42px 100px;
  }
  @media ${({ theme }) => theme.sizes.small} {
    padding: 42px 32px;
  }
`;
export const Flexbox = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 64px;
`;
export const ButtonLink = styled(Link)`
  margin-left: auto;
  margin-top: 50px;
  height: 60px;
  width: 250px;
  display: flex;
  background-color: ${({theme}) => theme.colors.light};
  color: ${({theme}) => theme.colors.dark};
  border: 1px solid ${({theme}) => theme.colors.dark};
  justify-content: center;
  align-items: center;
  gap: 50px;
  cursor: pointer;
  text-decoration: none;
  transition: all .10s ease;
  position: relative;

  img, p{
    position: relative;
    z-index: 2;
    transition: all .10s;
  }

  &:after{
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: ${({theme}) => theme.colors.dark};
    transition: all .20s;
  }

  &:hover{
    color: ${({theme}) => theme.colors.light};
    img{
      filter: invert(1);
    }
  }

  &:hover:after{
    width: 100%;
  }

`;
export const Text = styled.p`
  font-weight: 600;
  font-size: 20px;
`;
export const Arrow = styled(Image)`
  
`;
  