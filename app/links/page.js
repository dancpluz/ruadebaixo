import { Video,Icon,IconDiv,StyledLink,Logo,Wrapper,Container } from './Links.styled';
import logo from '@/public/assets/logonew.svg';
import rdb from '@/public/assets/icons/logordb.svg';
import instagram from '@/public/assets/icons/instagram.svg';
import whatsapp from '@/public/assets/icons/whatsapp.svg';
import tiktok from '@/public/assets/icons/tiktok.svg';

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
        <LinkButton href={'https://api.whatsapp.com/send?phone=5561996492791&text=Eu%20quero%20falar%20com%20meus%20manos%20da%20Rua%20de%20Baixo%20%E2%A4%B5%EF%B8%8F'} image={whatsapp}>
          Whatsapp
        </LinkButton>
        <h2>Último Vídeo</h2>
        <Video poster='/assets/play.png' preload='auto' disablePictureInPicture controls controlsList="nodownload noremoteplayback noplaybackrate">
          <source src={'/assets/RdbVideo.mp4'} type='video/mp4'/>
          Seu navegador não suporta o elemento de vídeo.
        </Video>
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
  