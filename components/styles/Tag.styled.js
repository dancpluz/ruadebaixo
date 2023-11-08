'use client'

import styled from 'styled-components';

export const TagDiv = styled.div`
  position: ${props => props.position ? 'absolute' : ''};
  display: flex;
  flex-flow: row wrap;
  max-height: ${props => props.position == 'top' ? '60px' : ''};; 
  gap: 5px;
  top: ${props => props.position == 'top' ? '12px' : ''};
  left: ${props => props.position ? '12px' : '0'};
  bottom: ${props => props.position == 'bottom' ? '12px' : '0'};

  .MuiChip-root {
    font-family: 'Clash Display', sans-serif;
    z-index: 2;
    background-color: ${({ theme }) => theme.colors.light};
    border: 1px solid ${({ theme }) => theme.colors.dark};
    cursor: pointer;
    transition: all .20s ease;
    width: ${props => props.isSize ? '40px' : ''};
    height: ${props => props.isSize ? '40px' : ''};
    border-radius: ${props => props.isSize ? '50%' : ''};
    &:hover{
      background-color: ${({ theme }) => theme.colors.dark};
      color: ${({ theme }) => theme.colors.light};
    }
  }
  .MuiChip-label {
    overflow: visible;
    text-overflow: '';
  }
`;

  