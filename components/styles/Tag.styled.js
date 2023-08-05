'use client'

import styled from 'styled-components';
import Chip from '@mui/material/Chip';

export const TagDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 5px;
`;
export const StyledChip = styled(Chip)`
  z-index: 2;
  text-transform: capitalize;
  font-family: 'Clash Display', sans-serif;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.dark};
  cursor: pointer;
  transition: all .20s ease;
  
  &:hover{
    background-color: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.light};
  }
`;
  