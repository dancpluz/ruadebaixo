'use client'

import styled, { keyframes } from 'styled-components';
import Image from 'next/image'

const floating = keyframes`
	0% {
    //-webkit-filter: drop-shadow(0 5px 15px rgba(0,0,0,0.6));
    //filter: drop-shadow(0 10px 0px rgba(0,0,0,1));
		//box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
	50% {
    //-webkit-filter: drop-shadow(0 25px 15px rgba(0,0,0,0.2));
    //filter: drop-shadow(0 30px 0px rgba(0,0,0,1));
		//box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(-15px);
	}
	100% {
    //-webkit-filter: drop-shadow(0 5px 15px rgba(0,0,0,0.6));
    //filter: drop-shadow(0 10px 0px rgba(0,0,0,1));
		//box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
`;

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
  position: relative;
  height: 700px;
  @media ${({ theme }) => theme.sizes.medium} {
    height: 600px;
  }

  @media ${({theme}) => theme.sizes.small} {
    height: 1000px;
  }
`;

export const LogoDiv = styled.div`
  position: absolute;
  top: 80px;
  z-index: 1;
  @media ${({ theme }) => theme.sizes.small} {
    top: 40px;
  }
`;

export const Logo = styled(Image)`
  margin-left: 200px;
  height: 300px;
  width: auto;
  @media ${({ theme }) => theme.sizes.medium} {
    height: 200px;
    margin-left: 100px;
  }

  @media ${({theme}) => theme.sizes.small} {
    height: 200px;
    margin-left: 32px;
  }
`;

export const Caption = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark};
  h4 {
    margin-left: 200px;
    text-align: right;
  }
  @media ${({theme}) => theme.sizes.medium} {
    h4 {
      margin-left: 100px;
    }
  }

  @media ${({theme}) => theme.sizes.small} {
    h4 {
      margin-left: 0;
      margin-right: 32px;
    }
  }
`;


export const TopImage = styled(Image)`
  position: absolute;
  right: 10vw;
  top: 50px;
  width: 400px;
  height: auto;
  animation: 4s ease-in-out infinite ${floating};
  @media ${({ theme }) => theme.sizes.medium} {
    width: 300px;
  }
  @media ${({ theme }) => theme.sizes.small} {
    top: 350px;
  }
`;

export const LeftImage = styled(Image)`
  position: absolute;
  left: 10vw;
  top: 450px;
  width: 400px;
  height: auto;
  animation: 4.5s ease-in-out infinite ${floating};

  @media ${({ theme }) => theme.sizes.medium} {
    width: 300px;
  }

  @media ${({ theme }) => theme.sizes.small} {
    top: 600px;
  }
`;

export const RightImage = styled(Image)`
  position: absolute;
  right: 18vw;
  top: 500px;
  width: 450px;
  height: auto;
  animation: 4.2s ease-in-out infinite ${floating};

  @media ${({ theme }) => theme.sizes.medium} {
    width: 350px;
  }

  @media ${({ theme }) => theme.sizes.small} {
    top: 900px;
    right: 10vw;
  }
`;