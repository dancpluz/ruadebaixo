import { Container, Accordion, AccordionSummary, AccordionDetails } from './styles/ProductInfo.styled';
import Image from 'next/image'

export default function ProductInfo() {
  const deliveryLocations = ['Plano (Asa Norte, Asa Sul, Cruzeiro, Sudoeste)','Guará I','Guará II','Taguatinga','Núcleo Bandeirante','Vicente Pires','Candangolândia','Park Way','Arniqueiras','Lago Sul (Talvez)','Paranoá','Itapoã','Lago Norte','Riacho Fundo 1']
  const pickupLocations = ['UnB','Rodoviária','Guará II','Asa Norte','Paranoá']

  return (
    <Container>
      <Accordion>
        <AccordionSummary expandIcon={<Image alt='X' src={'/assets/icons/plus.svg'} height={20} width={20} />}>Entrega e Retirada</AccordionSummary>
        <AccordionDetails>
          <p>Fazemos entregas em várias regiões do DF, mas se liga que o valor do frete muda dependendo da distância! Se não tiver a fim de pagar o frete, é só marcar de pegar o pedido em um dos pontos de retirada. O agendamento e outros detalhes são acertados no final da compra, mas relaxa que você vai ser redirecionado pra falar com a gente logo depois de fazer o pedido, tudo pelo zap!</p>
          <br/>
          <h4>Regiões de Entrega:</h4>
          <ul>
            {deliveryLocations.map((location) => {
              return <li key={location}>{location}</li>
            })}
          </ul>
          <h4>Regiões de Retirada:</h4>
          <ul>
            {pickupLocations.map((location) => {
              return <li key={location}>{location}</li>
            })}
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<Image alt='X' src={'/assets/icons/plus.svg'} height={20} width={20} />}>Medidas</AccordionSummary>
        <AccordionDetails>{'As entregas são realizadas às sextas nas estações "Águas Claras" e "Central". Para agendar sua entrega, nos envie uma mensagem via WhatsApp ( 61 9 93091467) ou via DM - Instagram (@nastybrecho).'}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<Image alt='X' src={'/assets/icons/plus.svg'} height={20} width={20} />}>Dúvidas</AccordionSummary>
        <AccordionDetails>{'As entregas são realizadas às sextas nas estações "Águas Claras" e "Central". Para agendar sua entrega, nos envie uma mensagem via WhatsApp ( 61 9 93091467) ou via DM - Instagram (@nastybrecho).'}</AccordionDetails>
      </Accordion>
    </Container>
  )
}
