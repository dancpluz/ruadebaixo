import styled from 'styled-components';
import Image from 'next/image';
import logoIcon from '../assets/logonew.svg';
import photo1 from '../assets/photo1.png';
import photo2 from '../assets/photo2.png';
import photo3 from '../assets/photo3.png';

const MainContainer = styled.div`
  display: inline-block;
  padding-bottom: 70px
`;

const Logo = styled(Image)`
  vertical-align: top;
  margin: 120px 0 0 120px;
`;

const TopImage = styled(Image)`
  margin-left: 180px;
`;

const Caption = styled.div`
  width: 760px;
  border-bottom: 1px solid black;
  margin-top: 60px;
  padding-bottom: 10px;
`;

const Text = styled.h1`
  margin-left: 120px;
  text-align: right;
  font-size: 20px;
`;

const LeftImage = styled(Image)`
  vertical-align: top;
  margin-left: 150px;
  margin-top: 100px;
`;

const RightImage = styled(Image)`
  margin-top: -400px;
  margin-left: 1100px;
`;

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
