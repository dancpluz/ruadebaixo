import logoIcon from '@/public/assets/logonew.svg';
import { MainContainer, Logo, TopImage, Caption, LeftImage, RightImage } from './styles/LandingBanner.styled';
import { fetchLandingImages } from '@/lib/api';

export default async function LandingBanner() {
  const {top_image, right_image, left_image} = await fetchLandingImages();

  return (
    <MainContainer>
      <Logo
        src={logoIcon}
        alt='Rua de Baixo Logo'
        priority />
      <TopImage
        src={top_image.url}
        alt='photoTop'
        height={top_image.height}
        width={top_image.width}
        placeholder={'blur'}
        blurDataURL={top_image.blur}
      />
      <Caption>
        <h4>Confira o Primeiro Drop da Rua de Baixo "Valendo uma Coca"</h4>
      </Caption>
      <LeftImage
        src={left_image.url}
        alt='photoTop'
        height={left_image.height}
        width={left_image.width}
        placeholder={'blur'}
        blurDataURL={left_image.blur}
      />
      <LeftImage
        src={right_image.url}
        alt='photoTop'
        height={right_image.height}
        width={right_image.width}
        placeholder={'blur'}
        blurDataURL={right_image.blur}
      />
    </MainContainer>
  )
}
