import styled from 'styled-components';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Transition } from 'react-transition-group';
import plusIcon from '../assets/plus.svg'
import Image from 'next/image'

const Container = styled.div`
  margin: 50px 0;
`;

const Accordion = styled(MuiAccordion)`
  box-shadow: none;
  margin-bottom: 30px;
  &::before {
    opacity: 0;
  }
`;

const AccordionSummary = styled(MuiAccordionSummary)`
  border-bottom: black solid 1px;
  color: black;
  font-weight: 600;
  font-size: 20px;
  padding: 0;
  .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    transform: rotate(45deg);
  }
`;

const AccordionDetails = styled(MuiAccordionDetails)`
  background-color: #F7F7FF;
  font-size: 18px;
  padding: 20px; 
`;

const Plus = styled(Image)`
  height: 20px;
  width: 20px;
`;

export default function Info() {

  return (
    <Container>
      <Accordion>
          <AccordionSummary expandIcon={<Plus alt='plus' src={plusIcon} />}>Entrega e Retirada</AccordionSummary>
        <AccordionDetails>{'As entregas são realizadas às sextas nas estações "Águas Claras" e "Central". Para agendar sua entrega, nos envie uma mensagem via WhatsApp ( 61 9 93091467) ou via DM - Instagram (@nastybrecho).'}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<Plus alt='plus' src={plusIcon} />}>Medidas</AccordionSummary>
        <AccordionDetails>{'As entregas são realizadas às sextas nas estações "Águas Claras" e "Central". Para agendar sua entrega, nos envie uma mensagem via WhatsApp ( 61 9 93091467) ou via DM - Instagram (@nastybrecho).'}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<Plus alt='plus' src={plusIcon} />}>Dúvidas</AccordionSummary>
        <AccordionDetails>{'As entregas são realizadas às sextas nas estações "Águas Claras" e "Central". Para agendar sua entrega, nos envie uma mensagem via WhatsApp ( 61 9 93091467) ou via DM - Instagram (@nastybrecho).'}</AccordionDetails>
      </Accordion>
    </Container>
  )
}
