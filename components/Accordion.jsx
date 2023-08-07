import { StyledAccordion, AccordionSummary,AccordionDetails } from './styles/Accordion.styled';
import Image from 'next/image';

export default function Accordion({title, children}) {
  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<Image alt='X' src={'/assets/icons/plus.svg'} height={20} width={20} />}>{title}</AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </StyledAccordion>
  )
}
