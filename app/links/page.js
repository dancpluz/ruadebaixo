import { Icon,IconDiv,StyledLink,Logo,Wrapper,Container } from '@/components/styles/LinksPage.styled';
import logo from '@/public/assets/logonew.svg';
import rdb from '@/public/assets/logoreduzida.svg';
import instagram from '@/public/assets/icons/instagram.svg';
import whatsapp from '@/public/assets/icons/whatsapp.svg';
import tiktok from '@/public/assets/icons/tiktok.svg';
import youtube from '@/public/assets/icons/youtube.svg';
import EmbedInsta from '@/components/EmbedInsta';
import { fetchLinks } from '@/lib/api'

export const metadata = {
  title: 'Links',
  description: 'Links para as redes sociais da Rua de Baixo',
  openGraph: {
    description: 'Fique por dentro de tudo que acontece na Rua de Baixo',
  },
  alternates: {
      canonical: '/links',
  },
}

export const revalidate = 60;

export const dynamic = 'force-dynamic';

export default async function Links() {
  const links = await fetchLinks()

  return (
    <Container>
      <Wrapper>
        <Logo priority src={logo} alt={'Logo'} />
        <h1>Ruas</h1>
        <LinkButton href={'/'} image={rdb} sameTab>
          Site
        </LinkButton>
        <LinkButton href={links.instagram} image={instagram} >
          Instagram
        </LinkButton>
        <LinkButton href={links.tiktok} image={tiktok} >
          TikTok
        </LinkButton>
        <LinkButton href={links.whatsapp} image={whatsapp}>
          Whatsapp
        </LinkButton>
        <LinkButton href={links.youtube} image={youtube}>
          Youtube
        </LinkButton>
        { links.last_post &&
          <>
            <h2>Último Post</h2>
            <EmbedInsta link={links.last_post} />
          </>
        }
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
