import logoIcon from '@/public/assets/logonew.svg';
import { MainContainer, LogoDiv, Logo, TopImage, Caption, LeftImage, RightImage, HeroBanner } from './styles/LandingBanner.styled';
import { fetchLandingImages } from '@/lib/api';

export default async function LandingBanner() {
  const {text, images} = await fetchLandingImages();

  return (
    <MainContainer>
      <HeroBanner>
        <LogoDiv>
          <Logo
          src={logoIcon}
          alt='Rua de Baixo Logo'
          priority />
          <Caption>
            <h4>{text}</h4>
          </Caption>
        </LogoDiv>
        <TopImage
          src={images[0].url}
          alt='Homem Caindo - Novas camisetas do Galo'
          height={images[0].height}
          width={images[0].width}
          placeholder={'blur'}
          blurDataURL={images[0].blur}
        />
        <LeftImage
          src={images[2].url}
          alt='Homem Caindo - Novas camisetas do Galo'
          height={images[2].height}
          width={images[2].width}
          placeholder={'blur'}
          blurDataURL={images[2].blur}
        />
        <RightImage
          src={images[1].url}
          alt='Homem Caindo - Novas camisetas do Galo'
          height={images[1].height}
          width={images[1].width}
          placeholder={'blur'}
          blurDataURL={images[1].blur}
        />
      </HeroBanner>
    </MainContainer>
  )
}
