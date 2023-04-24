import Image from 'next/image';
import BoxIcon from '../assets/box.svg';
import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';
import Badge from '@mui/material/Badge';

const StyledButton = styled.button`
  font-size: 25px;
  color: black;
  cursor: pointer;
  position: relative;
  transition: transform .4s ease;
  border: none;
  background-color: transparent;
`;

const StyledSpan = styled.span`
  position: absolute;
  right: 1px;
  top: 3px;
  font-size: 8px;
  color: #fff;
  background-color: #f02d34;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  font-weight: 600;
`;

const StyledBadge = styled(Badge)`
  cursor: pointer;
  .MuiBadge-badge {
    font-family: 'Montserrat', sans-serif;
    right: 5px;
    top: 10px;
    background-color: red;
    color: white;
    }
`;

export default function CartButton({}) {
  const { setShowCart, totalQuantities } = useStateContext();

{/*
  <StyledButton type='button' onClick={() => setShowCart(true)}>
      <Image src={BoxIcon} alt={'box'} height={40} />
      <StyledSpan>{totalQuantities}</StyledSpan>
    </StyledButton>
*/ }


  return (
    <StyledBadge onClick={() => setShowCart(true)} badgeContent={totalQuantities} showZero>
      <Image src={BoxIcon} alt={'box'} height={40} />
    </StyledBadge>
    );
}
  
  