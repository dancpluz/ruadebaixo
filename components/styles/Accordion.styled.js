'use client'

import styled from 'styled-components';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

export const Container = styled.div`
  margin: 50px 0;
`;
export const StyledAccordion = styled(MuiAccordion)`
  box-shadow: none;
  margin-bottom: 30px;
  &::before {
    opacity: 0;
  }
`;
export const AccordionSummary = styled(MuiAccordionSummary)`
  border-bottom: ${({theme}) => theme.colors.dark} solid 1px;
  color: ${({theme}) => theme.colors.dark};
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0;
  @media ${({ theme }) => theme.sizes.small} {
    font-size: 1.25rem;
  }
  .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    transform: rotate(45deg);
  }
  
`;
export const AccordionDetails = styled(MuiAccordionDetails)`
  background-color: ${({theme}) => theme.colors.grey};
  padding: 20px;
  h4, ul {
    margin-bottom: 8px;
  }
`;