import { Video,Icon,IconDiv,StyledLink,Logo,Wrapper,Container } from '@/components/styles/LinksPage.styled';
import logo from '@/public/assets/logonew.svg';
import rdb from '@/public/assets/icons/logordb.svg';
import instagram from '@/public/assets/icons/instagram.svg';
import whatsapp from '@/public/assets/icons/whatsapp.svg';
import tiktok from '@/public/assets/icons/tiktok.svg';
import { extractNameFromUrl } from '@/lib/format';

export const metadata = {
  title: 'Links',
  description: 'Links para as redes sociais da Rua de Baixo',
  openGraph: {
    description: 'Fique por dentro de tudo que acontece na Rua de Baixo',
  },
}

export default function LinksPage() {
  return (
    <Container>
      <Wrapper>
        <Logo priority src={logo} alt={'Logo'} />
        <h1>Ruas</h1>
        <LinkButton href={'/'} image={rdb} sameTab>
          Site
        </LinkButton>
        <LinkButton href={'https://www.instagram.com/invites/contact/?i=1qfflkcpzs25j&utm_content=qysp11r'} image={instagram} >
          Instagram
        </LinkButton>
        <LinkButton href={'https://www.tiktok.com/@ruadebaixoloja'} image={tiktok} >
          TikTok
        </LinkButton>
        <LinkButton href={'https://wa.me/message/GMJP6IY5DXZOM1'} image={whatsapp}>
          Whatsapp
        </LinkButton>
        <h2>Último Vídeo</h2>
        <Video poster='/assets/play.png' preload='auto' alt='Último vídeo' disablePictureInPicture controls controlsList="nodownload noremoteplayback noplaybackrate">
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
          <Icon src={image} alt={extractNameFromUrl(image.src)} />
        </IconDiv>
        {children}
      </StyledLink>
    );
  }
  