'use client'
import styled from 'styled-components';
import Image from 'next/image';

export const Container = styled.div`
  padding: 100px 15vw;
`;

export const ProductDiv = styled.div`
  display: flex;
  gap: 50px;
  position: relative;
`;

export const DetailsDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
  width: 100%;
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
  h1:last-child{
    font-weight: 400; 
  }
`;

export const Description = styled.div`
  p {
    font-size: 18px;
  }
`;

export const SizeDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
  h2 {
    margin-bottom: -4px;
  }
`;

export const BulletDiv = styled.div`
  max-height: 200px;
  overflow: auto;
`;

export const BulletPoints = styled.ul`
  margin: 0;
  padding: 0;
  list-style-position: inside;
  
`;

export const Point = styled.li`
  margin-bottom: 10px;
  font-size: 1.25rem;
  &:last-child{
    margin-bottom: 0;
  }
`;