import logoIcon from '@/public/assets/logonew.svg';
import { MainContainer, LogoDiv, Logo, TopImage, Caption, LeftImage, RightImage, HeroBanner } from './styles/LandingBanner.styled';
import { fetchLandingImages } from '@/lib/api';

export default async function LandingBanner() {
  const {top_image, right_image, left_image} = await fetchLandingImages();

  return (
    <MainContainer>
      <HeroBanner>
        <TopImage
          src={left_image.url}
          alt='photoTop'
          height={left_image.height}
          width={left_image.width}
          placeholder={'blur'}
          blurDataURL={left_image.blur}
        />
        <LogoDiv>
          <Logo
          src={logoIcon}
          alt='Rua de Baixo Logo'
          priority />
          <Caption>
            <h4>MiniDrop &quot;Galo&quot; </h4>
          </Caption>
        </LogoDiv>
      </HeroBanner>
      {/* <LeftImage
        src={left_image.url}
        alt='photoTop'
        height={left_image.height}
        width={left_image.width}
        placeholder={'blur'}
        blurDataURL={left_image.blur}
      />
      <RightImage
        src={right_image.url}
        alt='photoTop'
        height={right_image.height}
        width={right_image.width}
        placeholder={'blur'}
        blurDataURL={right_image.blur}
      /> */}
    </MainContainer>
  )
}
