'use client'

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/logonew.svg';
import rdb from '@/public/assets/logordb.svg';
import instagram from '@/public/assets/instagram.svg';
import whatsapp from '@/public/assets/whatsapp.svg';
import tiktok from '@/public/assets/tiktok.svg';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 500px;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 32px;

  h1, h2 {
    margin: 12px 0;
  }
`;

const Logo = styled(Image)`
  width: 100%;
  height: auto;
  max-width: 420px;
  max-height: 100%;
`;

const StyledLink = styled(Link)`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: 2px solid ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.dark};
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  height: 60px;
  width: 100%;
`;

const Icon = styled(Image)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
  height: 36px;
  width: auto;
`;

const Video = styled.video`
  max-width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.dark};

  &::-webkit-media-controls-panel {
    background: transparent;
  }
  
  &::-webkit-media-controls-timeline {
    padding: 0;
    margin: 0;
    border-radius: 0;
  }

  &::-webkit-media-controls-current-time-display, &::-webkit-media-controls-time-remaining-display, &::-moz-media-controls-time-remaining-display {
    font-size: 1.5rem;
    font-family: 'Clash Display', sans-serif;
  }
`;

export default function Links() {
  return (
    <Container>
      <Wrapper>
        <Logo src={logo} alt={'Logo'} />
        <h1>Links</h1>
        <LinkButton href={'/'} image={rdb} sameTab>
          Site
        </LinkButton>
        <LinkButton href={'https://www.instagram.com/ruadebaixoloja/'} image={instagram} >
          Instagram
        </LinkButton>
        <LinkButton href={'https://www.tiktok.com/@ruadebaixoloja'} image={tiktok} >
          TikTok
        </LinkButton>
        <LinkButton href={'https://api.whatsapp.com/send?phone=5561996492791&text=Eu%20quero%20falar%20com%20meus%20manos%20da%20Rua%20de%20Baixo%20%E2%A4%B5%EF%B8%8F%E2%A4%B5%EF%B8%8F'} image={whatsapp}>
          Whatsapp
        </LinkButton>
        <h2>Último Vídeo</h2>
        
        <Video poster='/assets/play.png' preload='auto' disablePictureInPicture controls controlsList="nodownload noremoteplayback noplaybackrate">
          <source src={'/assets/RdbVideo.mp4'} type='video/mp4'/>
          Seu navegador não suporta o elemento video.
        </Video>
        </Wrapper>
    </Container>
  )
}

  function LinkButton({ image, href, children, sameTab }) {
    return (
      <StyledLink target={sameTab ? '' : '_blank'} href={href}>
        <Icon src={image} alt={'Logo RDB'} />
        {children}
      </StyledLink>
    );
  }
  