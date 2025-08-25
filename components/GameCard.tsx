import React, { Fragment } from 'react';
import Image from 'next/image';

export default function GameCard({ gameCover }: { gameCover: any }) {
  return (
    <div className="perspective-normal w-[352px] h-[500px] group">
      {/* Inner container for 3D transform */} 
      <div className="relative size-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 -z-1 bg-white opacity-20 blur-lg" />
        {/* Front Cover */}
        <div className="absolute size-full [backface-visibility:hidden] overflow-hidden ">
          <FrontCover gameCover={gameCover} />
        </div>
        <div className="absolute size-full [backface-visibility:hidden]
         translate-y-[100%] [transform:scaleY(-1)] pointer-events-none overflow-hidden blur-[2px] opacity-70 [mask-image:linear-gradient(to_bottom,transparent_70%,var(--color-background)_100%)]">
          <FrontCover gameCover={gameCover} />
        </div>

        {/* Back Cover */}
        <div className="absolute size-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <BackCover gameCover={gameCover} />
        </div>
        <div className="absolute size-full [backface-visibility:hidden] translate-y-[100%] [transform:rotateY(180deg)_scaleY(-1)] pointer-events-none overflow-hidden blur-[2px] opacity-70 [mask-image:linear-gradient(to_bottom,transparent_70%,var(--color-background)_100%)]">
          <BackCover gameCover={gameCover} />
        </div>
        {/* <div className="absolute translate-y-[100%] inset-0 bg-gradient-to-b from-transparent via-black to-black"/> */}
      </div>
    </div>
  );
}

export function FrontCover({ gameCover }: { gameCover: any }) {
  const { title, cover, classification, logo_front } = gameCover;

  return (
    <div className="bg-black w-full h-full flex flex-col">
      <div className='bg-black border-b border-white h-[55px] flex items-center justify-between px-3 py-2'>
        <div className='relative aspect-[514/121] h-full'>
          <Image
            src={'/RuaStationText.svg'}
            fill
            alt='RuaStation 2'
          />
        </div>
        <div className='relative aspect-square h-full'>
          <Image
            src={'/RuaStationLogo.svg'}
            fill
            alt='RuaStation 2 Logo'
          />
        </div>
      </div>
      <div className='relative h-[calc(100%-55px)] w-full'>
        <Image
          src={cover}
          alt={cover?.alt || 'Capa'}
          className='object-cover'
          fill
        />
        <Image
          src={'/rdbLabel.png'}
          alt={'RDB'}
          width={100}
          height={16}
          className='h-1.5 w-auto absolute top-3 right-3 object-cover'
        />
        <div className='absolute bottom-0 w-full flex justify-between items-center p-3'>
          <Image
            src={classification.image}
            alt={classification.name || 'Classificação Indicativa'}
            width={100}
            height={200}
            className='h-16 w-auto'
          />
          <Image
            src={logo_front}
            alt={`${title} Logo`}
            width={200}
            height={200}
            className='size-16 object-contain'
          />
        </div>
      </div>
    </div>
  );
}

export function Topic({ topic }: any) {
  const { title, description, image } = topic;
  return (
    <div className='flex flex-col grow gap-1'>
      <div className='flex flex-1 relative'>
        <Image
          src={image}
          alt={title}
          fill
          className='object-cover border border-white'
        />
        <div className='absolute bottom-0 left-0 p-1 border border-white bg-black'>
          <h3 className='text-[10px] leading-none font-bold uppercase'>{title}</h3>
        </div>
      </div>
      <p className='text-[10px] leading-none font-normal text-justify'>{description}</p>
    </div>
  );
}

export function BackCover({ gameCover }: { gameCover: any }) {
  const { title, headline, topics, logo_back, classification, description, tags, game_tags } = gameCover;

  return (
    <div className="bg-black w-full h-full flex flex-col">
      <div className='flex flex-col gap-2 px-2 pt-2 pb-1'>
        <h1 className='text-2xl uppercase leading-none font-extrabold text-white'>{title}</h1>
        <div className='p-1 border border-white'>
          <h2 className='text-[9px] font-bold uppercase leading-none text-white'>{headline}</h2>
        </div>
        <div className="flex h-50 gap-1">
          <div className='flex flex-col basis-2/3 gap-1 grow'>
            <Topic topic={topics[0]} />
            <Topic topic={topics[1]} />
          </div>
          <div className='flex basis-1/3'>
            <Topic topic={topics[2]} />
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <div className="relative size-18">
            <Image
              src={logo_back}
              alt={`${title} Logo`}
              fill
              className='object-contain'
            />
          </div>
          <p className='text-justify text-[10px] leading-tight font-normal text-white'>{description}</p>
        </div>
      </div>
      <div className='bg-red-700 px-3 py-1.5 flex items-center justify-between gap-1 *:font-bold *:uppercase *:leading-none *:text-xs *:text-white'>
        {tags.map((tag: string, i: number) => (
          <Fragment key={i}>
            <span>{tag}</span>
            {i !== tags.length - 1 && <span>|</span>}
          </Fragment>
        ))}
      </div>
      <div className='bg-white text-black flex gap-2 p-2 grow'>
        <div className='flex flex-col gap-1 flex-1 min-w-0'>
          <div className='flex flex-wrap gap-0.5'>
            {game_tags.map((game_tag: string, i: number) => (
              <span key={game_tag + i} className='border-red-700 font-medium border rounded-full text-red-700 px-1 py-0.5 text-[7px] line-clamp-1 uppercase'>
                {game_tag}
              </span>
            ))}
          </div>
          <p className='leading-tight text-[7px] font-bold text-justify line-clamp-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat, leo sit amet pulvinar eleifend, ante sapien placerat liberoturpis.
          </p>
          <p className='leading-tight text-[7px] font-normal text-justify line-clamp-1'>
            Middle text asfasgsgadgdsghsdhdfhdfhdfhdfhdfhdhdfhdfh
          </p>
          <div className='relative border border-black p-0.5 mt-1'>
            <span className='absolute text-[10px] bg-red-700 text-white border border-black font-semibold top-0 left-0 -translate-x-[1px] -translate-y-[1px] px-1'>
              AVISO
            </span>
            <p className='text-[7px] indent-9 text-justify leading-tight line-clamp-3'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat, leo sit amet pulvinar eleifend, ante sapien placerat libero, ut condim
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between max-h-[80px] shrink-0'>
          <div className="relative max-w-[30px] w-full aspect-square">
            <Image
              src='/logordb.svg'
              alt='Logo RDB reduzida'
              fill
              className='object-contain'
            />
          </div>
          <div className="relative max-w-[30px] w-full aspect-square">
            <Image
              src='/logorua.svg'
              alt='Logo Rua de Baixo'
              fill
              className='object-contain'
            />
          </div>
          <div className="relative max-w-[30px] w-full aspect-square">
            <Image
              src='/setinha.png'
              alt='Setinha Rua de Baixo'
              fill
              className='object-contain'
            />
          </div>
        </div>
        <div className='flex flex-col items-end gap-1 max-h-[80px] shrink-0'>
          <div className="relative w-[70%] aspect-[40/80]">
            <Image
              src={classification.image}
              alt={classification.name || 'Classificação Indicativa'}
              fill
              className='object-contain'
            />
          </div>
          <div className="relative min-w-[60px] w-full aspect-[100/80]">
            <Image
              src='/barcode.webp'
              alt='Código de Barras'
              fill
              className='object-contain'
            />
          </div>
        </div>
      </div>
    </div>
  );
}