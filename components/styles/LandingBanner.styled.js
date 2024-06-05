'use client'

import styled, { css, keyframes } from 'styled-components';
import Image from 'next/image';

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
  padding-top: 65px;
  padding-bottom: 150px;

  h2 {
    background: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.light};
    text-align: center;
    padding: 48px 0;
  }
  
  //height: 100vh;
  /* @media ${({theme}) => theme.sizes.medium} {
    padding: 100px 100px;
  }
  @media ${({theme}) => theme.sizes.small} {
    padding: 100px 32px;
    height: 160vh;
  } */
`;

export const TopDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media ${({ theme }) => theme.sizes.small} {
    flex-direction: column;
  }
`;

export const LogoDiv = styled.div`
  margin-right: 120px;
  width: 50vw;
  @media ${({ theme }) => theme.sizes.small} {
    width: 100%;
    margin: auto;
  }
`;

export const Logo = styled(Image)`
  margin-left: 200px;
  //height: 350px;
  height: 400px;
  width: auto;
  @media ${({ theme }) => theme.sizes.medium} {
    //height: 160px;
    height: 200px;
    margin-left: 100px;
  }

  @media ${({theme}) => theme.sizes.small} {
    margin: 16px auto;
    //height: 100px;
    height: 140px;
    display: block;
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


export const TopImage = styled.div`
  position: relative;
  width: 50vw;
  height: auto;
  aspect-ratio: 3/2;

  @media ${({ theme }) => theme.sizes.small} {
    width: 100%;
  }

  /* @media ${({ theme }) => theme.sizes.small} {
  } */
`;

export const HeroBanner = styled.div`
  display: flex;
  //flex-flow: row-wrap;
  //margin-top: 64px;
  width: 100%;
`;


export const LeftImage = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 2/3;
`;

export const MiddleImage = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 2/3;
`;

export const RightImage = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 2/3;

  @media ${({ theme }) => theme.sizes.small} {
    display: none;
  }
`;

const stutteringWiggle = random => keyframes`
  0%, 30%, 60% {
    transform: translateX(${-random.x}px) translateY(${random.y+2}px) rotate(${random.r-3}deg);
  }
  10%, 40%, 70% {
    transform: translateX(${random.x+3}px) translateY(${random.y}px) rotate(${random.r+3}deg);
  }
  20%, 50%, 80% {
    transform: translateX(${random.x-2}px) translateY(${random.y+2}px) rotate(${-random.r}deg);
  }
  90% {
    transform: translateX(${random.x+1}px) translateY(${random.y-4}px) rotate(${random.r+2}deg);
  }
`;

export const Letter = styled(Image)`
  width: auto;
  height: 80px;
  //aspect-ratio: 1/1;
  ${({ random }) => 
    css`
      animation: ${stutteringWiggle(random)} ${random.t}s step-start infinite;
    `
  }
  @media ${({ theme }) => theme.sizes.small} {
    height: 50px;
  }
`;

export const LetterDiv = styled.div`
  background: ${({ theme }) => theme.colors.dark};
  display: flex;
  justify-content: center;
  padding: 40px 0;
`;
