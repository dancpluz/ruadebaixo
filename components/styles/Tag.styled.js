'use client'

import styled from 'styled-components';

export const TagDiv = styled.div`
  position: ${props => props.type ? 'absolute' : ''};
  display: flex;
  flex-flow: row wrap;
  max-height: ${props => props.type == 'top' ? '60px' : ''};; 
  gap: 5px;
  top: ${props => props.type == 'top' ? '12px' : ''};
  left: ${props => props.type ? '12px' : '0'};
  bottom: ${props => props.type == 'bottom' ? '12px' : '0'};

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
    span {
      font-size: ${props => props.isSize ? '1.25rem' : ''};
    }
    
    &:hover{
      background-color: ${({ theme }) => theme.colors.dark};
      color: ${({ theme }) => theme.colors.light};
    }
  }
`;

  