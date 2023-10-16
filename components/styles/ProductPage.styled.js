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
  @media ${({ theme }) => theme.sizes.medium} {
    grid-column: 1;
    grid-row: 2;
  }
`;

export const MiddleDiv = styled.div`
  grid-column: 2 / 3;
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
  margin-top: 24px;
  position: relative;
  display: grid;
  height: 400px;
  width: 100%;
  column-gap: 50px;
  row-gap: 12px;
  
  grid-template-columns: 500px 1fr;
  grid-template-rows: 0.2fr 1fr;
  @media ${({ theme }) => theme.sizes.medium} {
    //grid-template-areas:"rightdiv1" "leftdiv" "rightdiv2";
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    height: auto;
  }
`;

export const TitleDiv = styled.div`
  width: 100%;
  padding-bottom: 10px; 
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: end;
  border-bottom: black solid 1px;
  gap: 12px;

  h1:last-child {
    font-weight: 400;
  }

  h4 {
    text-decoration: line-through;
    font-weight: 400;
    text-align: right;
  }

  @media ${({ theme }) => `${theme.sizes.medium},${theme.sizes.small}`} {
    h1 {
      font-size: 2rem;
    }
  }
`;

export const SizeDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  p {
    text-decoration: underline;
    cursor: pointer;
  }
  @media ${({ theme }) => theme.sizes.small} {
    h2 {
      font-size: 1.75rem;
    }
  }
`;

export const SizeWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  div {
    display: flex;
    flex-flow: column nowrap;
    h2 {
    margin-bottom: -4px;
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

export const OrderedBadgeDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;