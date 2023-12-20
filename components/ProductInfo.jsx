'use client'

import Accordion from './Accordion';
import { Container } from './styles/Accordion.styled';
import { deliveryLocations,pickupLocations,questions } from '@/sanity/options';
import { formatFloat,sortLocations } from '@/lib/format';
import { useStateContext } from '@/context/StateContext';

export default function ProductInfo({ measures }) {
  const { setExpandMeasures, expandMeasures } = useStateContext();
  
  return (
    <Container>
      
      <Accordion measure expandMeasures={expandMeasures} setExpandMeasures={setExpandMeasures} title={'Medidas'}>
        {measures ? 
        <>
          <h4 >Largura</h4>
          <p>{formatFloat(measures.length)} cm</p>
          <br/>
          <h4>Altura</h4>
          <p>{formatFloat(measures.height)} cm</p>
        </> :
        <p>Infelizmente não tiramos medidas para essa peça ainda, mas pode entrar em contato no insta ou whatsapp que tiramos pra você.</p>
        }
      </Accordion>
      <Accordion title={'Entrega e Retirada'}>
        <p>Fazemos entregas em várias regiões do DF, mas se liga que o valor do frete muda dependendo da distância! Se não tiver a fim de pagar o frete, é só marcar de pegar o pedido em um dos pontos de retirada. O agendamento e outros detalhes são acertados no final da compra, mas relaxa que você vai ser redirecionado pra falar com a gente logo depois de fazer o pedido, tudo pelo zap!</p>
        <br/>
        <h4>Regiões de Entrega:</h4>
        <ul>
          {sortLocations(deliveryLocations).map((location) => {
            return <li key={location.local}>{`${location.local} (R$ ${formatFloat(location.tax)})`}</li>
          })}
        </ul>
        <h4>Regiões de Retirada:</h4>
        <ul>
          {pickupLocations.sort().map((location) => {
            return <li key={location}>{location}</li>
          })}
        </ul>
      </Accordion>
      <Accordion title={'Dúvidas'}>
        {questions.map((question) => (
          <div key={question.title}>
            <h4>{question.title}</h4>
            <p>{question.text}</p>
            <br/>
          </div>
          )
        )}
      </Accordion>
    </Container>
  )
}

export function MeasureLink() {
  const { setExpandMeasures } = useStateContext();
  
  const handleClickScroll = () => {
    setExpandMeasures(true);
    const element = document.getElementById('medidas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth',inline: "start" });
    }
  };

  return (
    <p onClick={handleClickScroll}>Veja medidas</p>
  )
}