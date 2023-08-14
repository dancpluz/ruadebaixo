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
  @media ${({theme}) => theme.sizes.small} {
    padding: 20px 32px;
    height: 160vh;
  }
`;

export const Caption = styled.div`
  position: absolute;
  left: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark};
  h4 {
    margin-left: 120px;
    text-align: right;
  }
  @media ${({theme}) => theme.sizes.small} {
    h4 {
      margin-left: 0;
      margin-right: 32px;
    }
  }
`;

export const Logo = styled(Image)`
  height: 250px;
  width: auto;

  @media ${({theme}) => theme.sizes.small} {
    height: 200px;
  }
`;

export const TopImage = styled(Image)`
  z-index: -1;
  position: absolute;
  top: 0;
  right: 280px;
  height: 500px;
  width: auto;
  @media ${({theme}) => theme.sizes.medium} {
    right: 100px;
    height: 450px;
  }
  @media ${({theme}) => theme.sizes.small} {
    top: 300px;
    height: 400px;
  }
`;

export const LeftImage = styled(Image)`
  z-index: -1;
  position: absolute;
  bottom: 180px;
  left: 200px;
  height: 400px;
  width: auto;
  @media ${({theme}) => theme.sizes.medium} {
    left: 120px;
    bottom: 120px;
  }
  @media ${({theme}) => theme.sizes.small} {
    bottom: 380px;
    left: 100;
    height: 250px;
  }
`;

export const RightImage = styled(Image)`
  z-index: -1;
  position: absolute;
  bottom: 0px;
  right: 240px;
  height: 400px;
  width: auto;
  @media ${({theme}) => theme.sizes.medium} {
    right: 130px;
    height: 350px;
  }
  @media ${({theme}) => theme.sizes.small} {
    bottom: 50px;
  }
`;