import logoIcon from '@/public/assets/logonew.svg';
import { MainContainer, LogoDiv, Logo, TopImage, TopDiv, Caption, LeftImage, RightImage, MiddleImage, HeroBanner } from './styles/LandingBanner.styled';
import { fetchLandingImages } from '@/lib/api';
import Image from 'next/image'

export default async function LandingBanner() {
  const {text, images} = await fetchLandingImages();

  return (
    <MainContainer>
      <TopDiv>
        <LogoDiv>
          <Logo
            src={logoIcon}
            alt='Rua de Baixo Logo'
            priority />
          {/* <Caption>
            <h4>{text}</h4>
          </Caption> */}
        </LogoDiv>
        <TopImage>
          <Image
            src={images[0].url}
            alt='três homens vestindo roupas estilosas e coloridas'
            fill
            sizes={'900px'}
            placeholder={'blur'}
            blurDataURL={images[0].blur}
          />
        </TopImage>
      </TopDiv>
      <h2>+ de 90 Peças Exclusivas</h2>
      <HeroBanner>
        <LeftImage>
          <Image
            src={images[1].url}
            alt='Homem Caindo - Novas camisetas do Galo'
            fill
            sizes={'640px'}
            placeholder={'blur'}
            blurDataURL={images[1].blur}
          />
        </LeftImage>
        <MiddleImage>
          <Image
            src={images[2].url}
            alt='Homem Caindo - Novas camisetas do Galo'
            fill
            sizes={'640px'}
            placeholder={'blur'}
            blurDataURL={images[2].blur}
          /> 
        </MiddleImage>
        <RightImage>
          <Image
            src={images[3].url}
            alt='Homem Caindo - Novas camisetas do Galo'
            fill
            sizes={'640px'}
            placeholder={'blur'}
            blurDataURL={images[3].blur}
            /> 
        </RightImage>
      </HeroBanner>
    </MainContainer>
  )
}
