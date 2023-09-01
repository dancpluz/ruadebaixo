'use client'

import styled from 'styled-components';
import Image from 'next/image'

export const MainContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 65px;
  padding-bottom: 200px;
  
  //height: 100vh;
  /* @media ${({theme}) => theme.sizes.medium} {
    padding: 100px 100px;
  }
  @media ${({theme}) => theme.sizes.small} {
    padding: 100px 32px;
    height: 160vh;
  } */
`;

export const HeroBanner = styled.div`

`;

export const LogoDiv = styled.div`
  position: absolute;
  top: 80px;
  
`;

export const Logo = styled(Image)`
  margin-left: 200px;
  height: 13vw;
  width: auto;

  @media ${({theme}) => theme.sizes.small} {
    height: 200px;
  }
`;

export const Caption = styled.div`
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


export const TopImage = styled(Image)`
  width: 100vw;
  height: auto;
  
`;

export const LeftImage = styled(Image)`
 
`;

export const RightImage = styled(Image)`

`;