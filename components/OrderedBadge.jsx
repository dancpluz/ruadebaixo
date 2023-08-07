'use client'

import styled from 'styled-components'
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    font-family: 'Clash Display', sans-serif;
    top: 0;
    right: 0;
    transform: translateY(35%);
    font-size: 1.25rem;
    padding: 16px 8px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.light};
  }
`;

export default function OrderedBadge({ ordered }) {
  return (
    <StyledBadge badgeContent={`${ordered} ${ordered == 1 ? 'Pedido' : 'Pedidos'}`} />
  )
}


