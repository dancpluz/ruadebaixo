import logoIcon from '@/public/assets/logonew.svg';
import { MainContainer, LogoDiv, Logo, TopImage, TopDiv, Caption, LeftImage, RightImage, MiddleImage, HeroBanner } from './styles/LandingBanner.styled';
import Image from 'next/image'

export default async function LandingBanner({ images }) {

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
            alt='Três homens estilosos vestindo roupas e acessorios da moda streetwear. O homem do meio está apoiado num corrimão olhando para seu relógio'
            fill
            sizes={'(max-width: 400px) 400px, 900px'}
            placeholder={'blur'}
            blurDataURL={images[0].blur}
          />
        </TopImage>
      </TopDiv>
      <h2>Birosca na Rua de Baixo</h2>
      <HeroBanner>
        <LeftImage>
          <Image
            src={images[1].url}
            alt='homen negro estiloso vestindo camisa polo rosa e um colar prata. O homen segura um celular numa mao e mostra a corrente com a outra. Ele esta encostado num corrimão' 
            fill
            sizes={'(max-width: 400px) 200px, 640px'}
            placeholder={'blur'}
            blurDataURL={images[1].blur}
          />
        </LeftImage>
        <MiddleImage>
          <Image
            src={images[2].url}
            alt='Homem se pendura numa estrutura semelhante a um poste de luz. Ele veste uma camisa azul e um short preto e está de costas para a camera. '
            fill
            sizes={'(max-width: 400px) 200px, 640px'}
            placeholder={'blur'}
            blurDataURL={images[2].blur}
          /> 
        </MiddleImage>
        <RightImage>
          <Image
            src={images[3].url}
            alt='Homem Caindo - Novas camisetas do Galo'
            fill
            sizes={'(max-width: 400px) 200px, 640px'}
            placeholder={'blur'}
            blurDataURL={images[3].blur}
            /> 
        </RightImage>
      </HeroBanner>
    </MainContainer>
  )
}
