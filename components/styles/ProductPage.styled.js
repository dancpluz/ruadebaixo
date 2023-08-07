'use client'

import styled from 'styled-components';

export const Container = styled.div`
  padding: 100px 200px;
  @media ${({ theme }) => theme.sizes.medium} {
    padding: 100px 100px;
  }
  @media ${({ theme }) => theme.sizes.small} {
    padding: 100px 32px;
  }
`;

export const TopDiv = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`;

export const MiddleDiv = styled.div`
  grid-column: 2 / 3;
  align-self: start;
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;
`;

export const BottomDiv = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  flex-flow: column nowrap;
  //max-height: 300px;
  align-self: stretch;
  gap: 12px;
  height: 100%;
`;

export const DetailsDiv = styled.div`
  
`;

export const ProductDiv = styled.div`
  position: relative;
  display: grid;
  height: 400px;
  column-gap: 50px;
  
  grid-template-columns: 500px 1fr;
  grid-template-rows: 1fr 1fr;
  /* grid-template-rows: 1fr 1fr; */
  /* @media ${({ theme }) => theme.sizes.medium} {
    flex-direction: column;
  } */
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
  @media ${({ theme }) => theme.sizes.small} {
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

  @media ${({ theme }) => theme.sizes.small} {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const BulletDiv = styled.div`
  //max-height: 200px;
  overflow: auto;
`;

export const BulletPoints = styled.ul`
  margin: 0;
  padding: 0;
`;

export const Point = styled.li`
  margin-bottom: 10px;
  font-size: 1.25rem;
  &:last-child{
    margin-bottom: 0;
  }
`;