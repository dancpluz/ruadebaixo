import { Icon,IconDiv,StyledLink,Logo,Wrapper,Container } from './Links.styled';
import logo from '@/public/assets/logonew.svg';
import rdb from '@/public/assets/logordb.svg';
import instagram from '@/public/assets/instagram.svg';
import whatsapp from '@/public/assets/whatsapp.svg';
import tiktok from '@/public/assets/tiktok.svg';
import EmbedVideo from './EmbedVideo';

export const metadata = {
  title: 'Links',
  description: 'Links para as redes sociais da Rua de Baixo',
  openGraph: {
    description: 'Fique por dentro de tudo que acontece na Rua de Baixo',
  },
}

export default function Links() {
  return (
    <Container>
      <Wrapper>
        <Logo priority src={logo} alt={'Logo'} />
        <h1>Ruas</h1>
        <LinkButton href={'/'} image={rdb} sameTab>
          LookBook
        </LinkButton>
        <LinkButton href={'https://www.instagram.com/ruadebaixoloja/'} image={instagram} >
          Instagram
        </LinkButton>
        <LinkButton href={'https://www.tiktok.com/@ruadebaixoloja'} image={tiktok} >
          TikTok
        </LinkButton>
        <LinkButton href={'https://wa.me/message/GMJP6IY5DXZOM1'} image={whatsapp}>
          Whatsapp
        </LinkButton>
        <h2>Último Post</h2>
        <EmbedVideo />
        </Wrapper>
    </Container>
  )
}

  function LinkButton({ image, href, children, sameTab }) {
    return (
      <StyledLink target={sameTab ? '' : '_blank'} href={href}>
        <IconDiv>
          <Icon src={image} alt={'Logo RDB'} />
        </IconDiv>
        {children}
      </StyledLink>
    );
  }
  