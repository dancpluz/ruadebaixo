'use client'

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import chevron from '@/public/assets/icons/chevron.svg';

const Container = styled.div`
  padding-top: 24px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  
`;

const Wrapper = styled.div`
  position: relative;
  width: auto;
  aspect-ratio: 2/3;
  height: 400px;
  cursor: pointer;
  ${props  => props.selected ? 
  'transform: scale(1.3); z-index: 2;' 
    : 
  ''};
  transition-property: all;
  transition-duration: 300ms;
`;

const Shadow = styled.div`
  display: flex;
  z-index: 3;
  height: 100%;
  width: 100%;
  position: absolute;
  align-items: end;
  justify-content: center;
  text-decoration: none;
  ${props => (props.selected ? '' : 'pointer-events: none;')}
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(255, 255, 255, 0) 75%);
    transition: opacity 400ms;
    opacity: ${props => (props.selected ? 1 : 0)};
  }

  div {
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: space-between;
    padding: 24px;
  }
  
  h2 {
    opacity: ${props => props.selected ?
    '1'
      :
    '0'};
    font-size: 24px;
    z-index: 4;
    color: white;
    display: flex;
    line-height: 95%;
    transition: opacity 400ms;
  }
`;

const Chevron = styled(Image)`
  height: 32px;
  width: auto;
  bottom: 16px;
  right: 8px;
  filter: invert(100%);
  rotate: 180deg;
  transform: ${props  => props.selected ? 'translateX(0px)' : 'translateX(-60px)'};
  transition: transform 400ms;
`;

export default function Magazine({ lookbooks }) {
  const [selectedMagazine,setSelectedMagazine] = useState(null);

  return (
    <Container>{lookbooks.map((lookbook) =>
      <Wrapper key={lookbook.name} selected={selectedMagazine === lookbook.slug.current}>
        <Link href={'/lookbook/' + lookbook.slug.current}>
          <Shadow selected={selectedMagazine === lookbook.slug.current}>
            <div>
              <h2>{lookbook.name}</h2>
              <Chevron
                alt={`Acessar ${lookbook.name}`}
                src={chevron}
                selected={selectedMagazine === lookbook.slug.current}
              />
            </div>
          </Shadow>
        </Link>
        <Image
          alt={`Capa - ${lookbook.name}`}
          src={lookbook.cover.url}
          sizes={'(max-width: 400px) 400px, 900px'}
          placeholder={'blur'}
          blurDataURL={lookbook.cover.blur}
          onClick={() => setSelectedMagazine(lookbook.slug.current)}
          fill
        />
      </Wrapper>
    )}</Container>
  )
}
