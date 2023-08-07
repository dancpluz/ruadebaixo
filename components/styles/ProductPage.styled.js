'use client'

import styled from 'styled-components';

export const Container = styled.div`
  padding: 100px 200px;
  @media ${({ theme }) => theme.sizes.medium} {
    padding: 60px 100px;
  }
  @media ${({ theme }) => theme.sizes.small} {
    padding: 40px 32px;
  }
`;

export const TopDiv = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  @media ${({ theme }) => theme.sizes.medium} {
    grid-column: 1;
    grid-row: 2;
  }
`;

export const MiddleDiv = styled.div`
  grid-column: 2 / 3;
  align-self: start;
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;
  @media ${({ theme }) => theme.sizes.medium} {
    grid-column: 1;
    grid-row: 1;
  }
`;

export const BottomDiv = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-self: stretch;
  gap: 12px;
  @media ${({ theme }) => theme.sizes.medium} {
    grid-column: 1;
    grid-row: 3;
  }
`;

export const DetailsDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;
`;

export const ProductDiv = styled.div`
  position: relative;
  display: grid;
  height: 400px;
  width: 100%;
  column-gap: 50px;
  row-gap: 12px;
  
  grid-template-columns: 500px 1fr;
  grid-template-rows: 0.2fr 1fr;
  grid-template-areas: "rightdiv1" "leftdiv" "rightdiv2";
  @media ${({ theme }) => theme.sizes.medium} {
    //grid-template-areas:"rightdiv1" "leftdiv" "rightdiv2";
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    height: auto;
  }
`;

// const StyledAlert = styled(Alert)`
//   color: black;
//   background-color: white;
//   border: black solid 1px;
//   font-family: 'Clash Display', sans-serif;
//   font-weight: 500;
//   font-size: 14px;
//   margin-bottom: 20px;
//   text-transform: uppercase;
// `;

export const TitleDiv = styled.div`
  width: 100%;
  padding-bottom: 10px; 
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: end;
  border-bottom: black solid 1px;
  gap: 12px;
  @media ${({ theme }) => `${theme.sizes.medium},${theme.sizes.small}`} {
    h1 {
      font-size: 2rem;
    }
  }

  h1:last-child{
    font-weight: 400; 
  }
`;

export const SizeDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 12px;
  h2 {
    margin-bottom: -4px;
  }

  

  @media ${({ theme }) => `${theme.sizes.medium},${theme.sizes.small}`} {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const BulletDiv = styled.div`
  max-height: 110px;
  overflow: auto;
`;

export const Point = styled.li`
  margin-bottom: 6px;
  font-size: 1.25rem;
  &:last-child{
    margin-bottom: 0;
  }
`;