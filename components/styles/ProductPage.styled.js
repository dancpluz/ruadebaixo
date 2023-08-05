'use client'
import styled from 'styled-components';
import Image from 'next/image';

export const Container = styled.div`
  padding: 100px 15vw;
`;

export const ProductDiv = styled.div`
  display: flex;
  gap: 50px;
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

export const Title = styled.div`
  width: 100%;
  padding-bottom: 10px; 
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: end;
  border-bottom: black solid 1px;
  h1 {
    font-weight: 600;
    font-size: 32px;
  }
  p {
    font-size: 32px;
  }
`;

export const Description = styled.div`
  p {
    font-size: 18px;
  }
`;

export const Size = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
  p {
    padding: 10px;
    border: black solid 1px;
    border-radius: 50%;
  }
`;

export const BuyDiv = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
`;

export const BuyButton = styled.button`
  height: 60px;
  width: 100%;
  background-color: black;
  color: white;
  font-size: 18px;
  border: 1px solid black;
  cursor: pointer;
  text-decoration: none;

  &:hover{
    color: black;
    background-color: white;
  }
`;

export const AddButton = styled.button`
  aspect-ratio: 1;
  height: 60px;
  background-color: white;
  color: black;
  font-size: 18px;
  border: 1px solid black;
  cursor: pointer;
  text-decoration: none;
  align-items: center;
  transition: all .10s;

  &:hover{
    img{
      filter: invert(1);
    }
    background-color: black;
    color: white;
  }
`;

export const Box = styled(Image)`
  width: 80%;
  height: 80%;
`;

export const BulletDiv = styled.div`
  max-height: 130px;
  overflow: auto;
`;

export const BulletPoints = styled.ul`
  margin: 0;
  padding: 0;
  list-style-position: inside;
  
`;

export const Point = styled.li`
  margin-bottom: 10px;
  font-size: 18px;
`;