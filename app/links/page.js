import { Video,Icon,IconDiv,StyledLink,Logo,Wrapper,Container } from './Links.styled';
import logo from '@/public/assets/logonew.svg';
import rdb from '@/public/assets/logordb.svg';
import instagram from '@/public/assets/instagram.svg';
import whatsapp from '@/public/assets/whatsapp.svg';
import tiktok from '@/public/assets/tiktok.svg';

export const metadata = {
  title: 'Links',
  description: 'Links para as redes sociais da Rua de Baixo',
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
  