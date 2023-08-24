import { Icon,IconDiv,StyledLink,Logo,Wrapper,Container } from '@/components/styles/LinksPage.styled';
import logo from '@/public/assets/logonew.svg';
import rdb from '@/public/assets/logoreduzida.svg';
import instagram from '@/public/assets/icons/instagram.svg';
import whatsapp from '@/public/assets/icons/whatsapp.svg';
import tiktok from '@/public/assets/icons/tiktok.svg';
import youtube from '@/public/assets/icons/youtube.svg';
import EmbedInsta from '@/components/EmbedInsta';

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
          Site
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
        <LinkButton href={'https://www.youtube.com/channel/UCwWDhzN4M-vi-CVd8oaak_A'} image={youtube}>
          Youtube
        </LinkButton>
        <h2>Último Post</h2>
        <EmbedInsta />
      </Wrapper>
    </Container>
  )
}

function LinkButton({ image,href,children,sameTab }) {
  return (
    <StyledLink target={sameTab ? '' : '_blank'} href={href}>
      <IconDiv>
        <Icon src={image} alt={'Logo RDB'} />
      </IconDiv>
      {children}
    </StyledLink>
  );
}
