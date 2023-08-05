'use client'

import styled from 'styled-components';
import Chip from '@mui/material/Chip';

export const TagDiv = styled.div`
  position: absolute;
  display: flex;
  flex-flow: row wrap;
  max-height: ${props => props.type == 'top' ? '60px' : ''};; 
  gap: 5px;
  top: ${props => props.type == 'top' ? '12px' : ''};
  left: ${props => props.type ? '12px' : '0'};
  bottom: ${props => props.type == 'bottom' ? '12px' : '0'};
`;
export const StyledChip = styled(Chip)`
  z-index: 2;
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
  