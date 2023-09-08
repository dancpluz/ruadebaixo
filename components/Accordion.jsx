import { StyledAccordion, AccordionSummary,AccordionDetails } from './styles/Accordion.styled';
import Image from 'next/image';

export default function Accordion({title, measure, setExpandMeasures, expandMeasures, children}) {
  const handleClick = () => {
    setExpandMeasures(!expandMeasures)
  }

  if (measure) {
    return (
      <StyledAccordion expanded={expandMeasures}
      onClick={handleClick}>
        <AccordionSummary id={'medidas'} expandIcon={<Image alt='X' src={'/assets/icons/plus.svg'} height={20} width={20} />}>{title}</AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </StyledAccordion>
    )
  }

  return (
    <StyledAccordion>
      <AccordionSummary id={'medidas'} expandIcon={<Image alt='X' src={'/assets/icons/plus.svg'} height={20} width={20} />}>{title}</AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </StyledAccordion>
  )
}
