import styled from 'styled-components';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import plusIcon from '@/assets/icons/plus.svg'
import Image from 'next/image'

const Container = styled.div`
  margin: 50px 0;
`;

export const Accordion = styled(MuiAccordion)`
  box-shadow: none;
  margin-bottom: 30px;
  &::before {
    opacity: 0;
  }
`;

export const AccordionSummary = styled(MuiAccordionSummary)`
  border-bottom: black solid 1px;
  color: black;
  font-weight: 600;
  font-size: 22px;
  padding: 0;
  .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    transform: rotate(45deg);
  }
`;

export const AccordionDetails = styled(MuiAccordionDetails)`
  background-color: #F7F7FF;
  font-size: 18px;
  padding: 20px;
  h2 {
    font-weight: 600;
  }
`;

export const Plus = styled(Image)`
  height: 20px;
  width: 20px;
`;

export default function ProductInfo() {
  const deliveryLocations = ['Plano (Asa Norte, Asa Sul, Cruzeiro, Sudoeste)','Guará I','Guará II','Taguatinga','Núcleo Bandeirante','Vicente Pires','Candangolândia','Park Way','Arniqueiras','Lago Sul (Talvez)','Paranoá','Itapoã','Lago Norte',
'Riacho Fundo 1']
  const pickupLocations = ['UnB','Rodoviária','Guará II','Asa Norte','Paranoá']

  return (
    <Container>
      <Accordion>
          <AccordionSummary expandIcon={<Plus alt='plus' src={plusIcon} />}>Entrega e Retirada</AccordionSummary>
        <AccordionDetails>
          <p>Fazemos entregas em várias regiões do DF, mas se liga que o valor do frete muda dependendo da distância! Se não tiver a fim de pagar o frete, é só marcar de pegar o pedido em um dos pontos de retirada. O agendamento e outros detalhes são acertados no final da compra, mas relaxa que você vai ser redirecionado pra falar com a gente logo depois de fazer o pedido, tudo pelo zap!</p>
          <br/>
          <h2>Regiões de Entrega:</h2>
          <ul>
            {deliveryLocations.map((location) => {
              return <li key={location}>{location}</li>
            })}
          </ul>
          <h2>Regiões de Retirada:</h2>
          <ul>
            {pickupLocations.map((location) => {
              return <li key={location}>{location}</li>
            })}
          </ul>
        </AccordionDetails>
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
