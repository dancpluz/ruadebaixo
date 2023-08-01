import logoIcon from '../public/assets/logonew.svg';
import photo1 from '../public/assets/photo1.png';
import photo2 from '../public/assets/photo2.png';
import photo3 from '../public/assets/photo3.png';
import { MainContainer, Logo, TopImage, Caption, Text, LeftImage, RightImage } from './styles/LandingBanner.styled'

export default function LandingBanner() {
  return (
    <MainContainer>
      <Logo src={logoIcon} alt='logo' />
      <TopImage src={photo1} alt='photoTop'/>
      <Caption>
        <Text>O estilo de rua nunca sai de moda. Encontre o seu na Rua de Baixo.</Text>
      </Caption>
      <LeftImage src={photo3} alt='photoBottomLeft' />
      <RightImage src={photo2} alt='photoBottomRight' />
    </MainContainer>
  )
}
