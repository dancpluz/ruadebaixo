'use client'

import styled from 'styled-components';
import Image from 'next/image'

export const MainContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding: 80px 200px;
  height: 100vh;
  @media ${({theme}) => theme.sizes.medium} {
    padding: 20px 100px;
  }
  @media ${({theme}) => theme.sizes.medium} {
    padding: 20px 32px;
  }
`;

export const Caption = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark};
  h4 {
    margin-left: 120px;
    text-align: right;
  }
`;

export const Logo = styled(Image)`
  
`;

export const TopImage = styled(Image)`
  position: absolute;
  top: 0;
  right: 500px;
  height: 650px;
  width: auto;
`;

export const LeftImage = styled(Image)`
  position: absolute;
  height: 300px;
  width: auto;
`;

export const RightImage = styled(Image)`
  position: absolute;
  height: 300px;
  width: auto;
`;