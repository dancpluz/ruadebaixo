import Accordion from './Accordion';
import { Container } from './styles/Accordion.styled';
import { deliveryLocations,pickupLocations,questions } from '@/sanity/schemas/options';
import { formatFloat,sortLocations } from '@/lib/format';

export default function ProductInfo({ measures }) {
  return (
    <Container>
      <Accordion title={'Medidas'}>
        {measures ?
          <>
            <h4>Largura</h4>
            <p>{formatFloat(measures.length)} cm</p>
            <br/>
            <h4>Altura</h4>
            <p>{formatFloat(measures.height)} cm</p>
          </> :
          <p>Infelizmente não há medidas para essa peça...</p>}
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
          <>
            <h4>{question.title}</h4>
            <p>{question.text}</p>
            <br/>
          </>
          )
        )}
      </Accordion>
    </Container>
  )
}
