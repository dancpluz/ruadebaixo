import Center from '/components/Center';
import Image from 'next/image';
import styled from 'styled-components';
import mainImage from '../assets/main.webp';
import overlayImage from '../assets/overlay.png';
import { useState } from 'react';


const Title = styled.h1`
  --border: black; 
  --fill: white;

  font-size: 23px;
  color: #fff;
  margin: 0;
  font-weight: 800;
  -webkit-text-stroke-width: 0.8px;
  -webkit-text-stroke-color: var(--border);
  letter-spacing: -0.7px;
  text-shadow:
        0.1px 0.3px 0 var(--border),
        0.3px 0.6px 0 var(--border),
        0.5px 0.9px 0 var(--border),
        0.7px 1.2px 0 var(--border),
        0.9px 1.5px 0 var(--border),
        1.0px 1.8px 0 var(--border),
        1.1px 2.1px 0 var(--border);
`;

const Desc = styled.p`
  color: white;
  font-size: 12px;
  font-weight: 500;
  text-shadow:
        1px 1px 1px black;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: absolute;
  z-index: 1;
  gap: 30%;
  top: 0;
  margin: 4vw 4vw;
`;

const Background = styled.div`
  position: relative;
`;

const BannerImage = styled(Image)`
  width: 100%;
  height: auto;
  transition: opacity 0.5s ease;
`;

const OverlayImage = styled(Image)`
  position: absolute;
  z-index: 2;
  top: calc(${props => props.y} / 1000 * 100%);
  left: calc(${props => props.x} / 1500 * 100%);
  width: calc(${props => props.size.split('x')[0]} / 1500 * 100%);
  height: calc(${props => props.size.split('x')[1]-10} / 1000 * 100%);

`;

export default function Banner() {
  const [isHovering, setIsHovering] = useState(false);
  
  function onMouseEnter() {
    console.log('in');
    setIsHovering(true);
  }
  
  function onMouseLeave() {
    console.log('out');
    setIsHovering(false);
  } 

  return (
    <Background>
      <Background>
        <OverlayImage src={overlayImage} alt={'overlay'} x={517} y={268} size={'529x505'} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
        <BannerImage src={mainImage} alt={'banner'} />
      </Background>
      <Wrapper>
        <div>
          <Title>Speed collection</Title>
          <Desc>
            Apresentamos a nova coleção de roupas iShowSpeed! Eleve o seu estilo com nossas peças modernas e confortáveis, perfeitas para qualquer ocasião. Compre agora e experimente a fusão suprema de moda e funcionalidade.
          </Desc>
        </div>
        {isHovering && <div>
          <Title>Camiseta Messi x Ronaldo</Title>
          <Desc>
            Camiseta Poggers do meu mano speed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum lorem commodo enim viverra auctor.
          </Desc>
        </div> }
      </Wrapper>
    </Background>
    
    
  )
}
