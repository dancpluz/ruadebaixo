'use client'

import Image from 'next/image';
import BoxIcon from '../public/assets/boxclosed.svg';
import styled from 'styled-components';
import Badge from '@mui/material/Badge';
import { useStateContext } from '../context/StateContext';

const StyledBadge = styled(Badge)`
  cursor: pointer;
  .MuiBadge-badge {
    font-family: 'Clash Display', sans-serif;
    font-weight: 700;
    right: 5px;
    top: 14px;
    background-color: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.light};
    border: 2px solid ${({ theme }) => theme.colors.light};
    }
`;

const Box = styled(Image)`
  height: 40px;
  width: 40px;
  filter: invert(100%);
`;

export default function CartButton({}) {
  const { setShowCart, cartItems } = useStateContext();

  return (
    <StyledBadge onClick={() => setShowCart(true)} badgeContent={cartItems.length} showZero>
      <Box src={BoxIcon} alt={'box'} />
    </StyledBadge>
    );
}
  
  