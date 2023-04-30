import Image from 'next/image';
import BoxIcon from '../assets/boxclosed.svg';
import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)`
  cursor: pointer;
  .MuiBadge-badge {
    font-family: 'Clash Display', sans-serif;
    font-weight: 700;
    right: 7px;
    top: 12px;
    background-color: white;
    color: black;
    }
`;

const Box = styled(Image)`
  height: 40px;
  width: 40px;
  filter: invert(100%);
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
      <Box src={BoxIcon} alt={'box'} />
    </StyledBadge>
    );
}
  
  