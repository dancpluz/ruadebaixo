import logoIcon from '@/public/assets/logonew.svg';
import { MainContainer, LogoDiv, Logo, LetterDiv, Letter, TopImage, TopDiv, LeftImage, RightImage, MiddleImage, HeroBanner } from './styles/LandingBanner.styled';
import Image from 'next/image';
import P from '@/public/assets/P.webp';
import R from '@/public/assets/R.webp';
import O1 from '@/public/assets/O1.webp';
import L from '@/public/assets/L.webp';
import O2 from '@/public/assets/O2.webp';
import G from '@/public/assets/G.webp';
import O3 from '@/public/assets/O3.webp';
import ruadebaixosketch from '@/public/assets/ruadebaixosketch.webp';


export default async function LandingBanner({ images }) {
  
  const getRandomTransformValues = () => {
    const getRandomValue = () => Math.floor(Math.random() * 11) - 5;
    const getRandomFloat = () => (Math.random() * 1.5 + 3.5).toFixed(1);
    return {
      x: getRandomValue(),
      y: getRandomValue(),
      r: getRandomValue(),
      t: getRandomFloat()
    };
  };


  return (
    <MainContainer>
      <TopDiv>
        <LogoDiv>
          <Logo
            src={ruadebaixosketch}
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
            priority
          />
        </TopImage>
      </TopDiv>
      <LetterDiv>
        <Letter
          src={P}
          alt='Letra P de Revista'
          random={getRandomTransformValues()}
        />
        <Letter
          src={R}
          alt='Letra R de Revista'
          random={getRandomTransformValues()}
        />
        <Letter
          src={O1}
          alt='Letra O de Revista'
          random={getRandomTransformValues()}
        />
        <Letter
          src={L}
          alt='Letra L de Revista'
          random={getRandomTransformValues()}
        />
        <Letter
          src={O2}
          alt='Letra O de Revista'
          random={getRandomTransformValues()}
        />
        <Letter
          src={G}
          alt='Letra G de Revista'
          random={getRandomTransformValues()}
        />
        <Letter
          src={O3}
          alt='Letra O de Revista'
          random={getRandomTransformValues()}
        />
      </LetterDiv>
      {/* <h2>Uma Birosca na Rua de Baixo</h2> */}
      <HeroBanner>
        <LeftImage>
          <Image
            src={images[1].url}
            alt='homen negro estiloso vestindo camisa polo rosa e um colar prata. O homen segura um celular numa mao e mostra a corrente com a outra. Ele esta encostado num corrimão' 
            fill
            sizes={'(max-width: 400px) 200px, 640px'}
            placeholder={'blur'}
            blurDataURL={images[1].blur}
            priority 
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
            priority 
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
            priority 
            /> 
        </RightImage>
      </HeroBanner>
    </MainContainer>
  )
}
