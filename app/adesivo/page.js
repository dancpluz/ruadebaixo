import Image from 'next/image'
import Niver1 from '@/public/assets/Niver1.webp';
import Niver2 from '@/public/assets/Niver2.webp';
import Niver3 from '@/public/assets/Niver3.webp';
import Niver4 from '@/public/assets/Niver4.webp';
import Niver5 from '@/public/assets/Niver5.webp';
import { Container, Wrapper, ImageDiv } from '@/components/styles/AdesivoPage.styled';
import AdesivoForm from '@/components/AdesivoForm';

export const metadata = {
  title: 'Aniversário Rua de Baixo',
  description: 'Comemorando 1 ano de Rua de Baixo, trazemos uma competição de adesivos com prêmio para os 3 primeiros colocados. São 300 reais em prêmios, participe!',
  openGraph: {
    description: '1 Ano de Rua de Baixo',
  },
  alternates: {
      canonical: '/adesivo',
  },
}

export default function Adesivo() {

  return (
    <Container>
      <Wrapper>
        <ImageDiv>
          <Image alt='Campeonato de Adesivo Capa' src={Niver1} fill />
        </ImageDiv>
        <ul style={{ fontWeight: '400',fontSize: '20px',listStyle: '',lineHeight: '140%' }}>
          <li><u>Agradecemos</u> todos que apoiaram a gente até aqui, de coração</li>
          <li>Como agradecimento vamos estar dando R$300 em <u>prêmios</u> pra VOCÊS!</li>
        </ul>
        <ImageDiv>
          <Image alt='Campeonato de Adesivo Passo 1' src={Niver2} fill />
        </ImageDiv>
        <ul style={{ fontWeight: '400',fontSize: '20px',listStyle: '', lineHeight: '140%' }}>
          <li>Faremos entregas de adesivos quando rolar <u>eventos</u></li>
          <li>Avisaremos tudo no <u>insta</u> quando acontecer</li>
          <li>Manda uma mensagem pra gente que dependendo do local podemos até te <u>entregar</u> o adesivo</li>
        </ul>
        <ImageDiv>
          <Image alt='Campeonato de Adesivo Passo 2' src={Niver3} fill />
        </ImageDiv>
        <ul style={{ fontWeight: '400',fontSize: '20px',listStyle: '', lineHeight: '140%' }}>
          <li>Vamos dar notas em <u>criatividade, dificuldade e visibilidade</u> para os locais de 0 a 10</li>
          <li>Calcularemos a <u>média ponderada</u> entre as 3 notas e essa será a nota final</li>
        </ul>
        <ImageDiv>
          <Image alt='Campeonato de Adesivo Passo 3' src={Niver4} fill />
        </ImageDiv>
        <ul style={{ fontWeight: '400',fontSize: '20px',listStyle: '', lineHeight: '140%' }}>
          <li>Capricha nas fotos, vamos aceitar 3, busque fotografar <u>diferentes ângulos</u></li>
          <li>O vídeo é importante para verificar a <u>validade</u> da sua inscrição</li>
          <li><u>Sua inscrição só vai ser validada</u> se postar um stories e marcar @ruadebaixoloja</li>
        </ul>
        <ImageDiv>
          <Image alt='Campeonato de Adesivo Premiação' src={Niver5} fill />
        </ImageDiv>
        <ul style={{ fontWeight: '400',fontSize: '20px',listStyle: '',lineHeight: '140%' }}>
          <li>Vamos fazer uma <u>live</u> no instagram para divulgar os <u>vencedores</u></li>
          <li>Os descontos em compras serão entregues em <u>cupons</u> no site</li>
          <li>O valor em dinheiro da premiação será enviado por <u>PIX</u></li>
        </ul>
        <AdesivoForm />
        <ul style={{ fontWeight: '400',fontSize: '20px',listStyle: '',lineHeight: '140%' }}>
          <li>É permitido mandar <u>mais de uma inscrição</u>, só pedimos que envie com o mesmo instagram</li>
          <li>Até o momento receberemos inscrições por 2 meses, acabando dia <u>14/10/2024</u>, mas pode alterar</li>
          <li>Muito obrigada pela atenção e caso tenha alguma <u>dúvida</u> pode mandar mensagem pra gente nas redes</li>
        </ul>
        <span>A Rua de Baixo não se responsabiliza por crimes ou delitos cometidos por participantes da competição</span>
      </Wrapper>
    </Container>
  )
}
