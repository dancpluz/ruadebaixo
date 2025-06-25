import { Fragment } from 'React'
import { GameCoverEntity, GameTopics } from "@/types/strapi";
import Image from 'next/image';

export default function GameCard({ gameCover }: { gameCover: GameCoverEntity }) {
  const { cover, classification, logo_front } = gameCover

  return (
    <div className="bg-black aspect-[88/125] w-auto h-[500px] overflow-hidden hover:scale-150 flex flex-col">
      <BackCover gameCover={gameCover} />
    </div>
  )

  
}

export function FrontCover({ gameCover }: { gameCover: GameCoverEntity }) {
  const { title, cover, classification, logo_front } = gameCover

  return (
    <>
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
            alt={classification.name}
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
    </>
  )
}

export function Topic({ topic }: GameTopics) {
  const { title, description, image } = topic
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
  )
}

export function BackCover({ gameCover }: { gameCover: GameCoverEntity }) {
  const { title, headline, topics, logo_back, description, tags, game_tags } = gameCover

  return (
    <>
      <div className='flex flex-col gap-2 px-2 pt-2 pb-1'>
        <h1 className='text-3xl uppercase leading-none font-extrabold'>{title}</h1>
        <div className='p-1 border border-foreground'>
          <h2 className='text-[9px] font-bold uppercase leading-none'>{headline}</h2>
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
          <Image
            src={logo_back}
            alt={`${title} Logo`}
            width={200}
            height={200}
            className='size-18 object-contain'
          />
          <p className='text-justify text-[10px] leading-tight font-normal'>{description}</p>
        </div>
      </div>
      <div className='bg-red-700 px-3 py-1.5 flex items-center justify-between gap-1 *:font-bold *:uppercase *:leading-none *:text-xs'>
        {tags.map((tag: string, i: number) => (
          <Fragment key={i}>
            <span>{tag}</span>
            {i !== tags.length-1 && <span>|</span>}
          </Fragment>
        ))}
      </div>
      <div className='bg-white text-black flex gap-2 p-2'>
      <div className='flex flex-col gap-1'>
          <div className='flex flex-wrap gap-1 flex-0 w-full'>
            {game_tags.map(game_tag => (
              <span className='border-red-700 font-medium border rounded-full text-red-700 px-1.5 py-0.5 text-[9px] line-clamp-1 uppercase'>
                {game_tag}
              </span>
            ))}
          </div>
          <p className='leading-tight text-[7px] font-bold text-justify'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat, leo sit amet pulvinar eleifend, ante sapien placerat liberoturpis. Nulla vitae nisi augue. Pellentesque ornare velit ante, 
          </p>
          <p className='leading-tight text-[7px] font-normal text-justify'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat, leo sit amet pulvinar eleifend, ante sapien placerat libero, ut condimentum est ipsum a arcu. Maecenas tincidunt convallis sem quis pretium. Nam eget mattis nulla. Nam ac risus luctus, eleifend ligula non, gravida libero. Mauris tempor finibus purus in mollis. Morbi eu rutrum velit, ut efficitur turpis. Nulla vitae nisi augue. Pellentesque ornare velit ante, ut o
          </p>
          <div className='relative border border-black p-0.5'>
            <span className='absolute text-[10px] bg-red-700 text-white border border-black font-semibold top-0 left-0 -translate-x-[1px] -translate-y-[1px] px-1'>
              AVISO
            </span>
            <p className='text-[7px] indent-9 text-justify leading-tight'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat, leo sit amet pulvinar eleifend, ante sapien placerat libero, ut condim
            </p>
          </div>
        </div>
        <div className='flex flex-col bg-gray-200'>
          asf
        </div>
        <div className='flex flex-col'>
          <Image
            src='/barcode.webp'
            alt='Código de Barras'
            width={200}
            height={100}
            className='w-[80px] object-cover'
          />
        </div>
      </div>
    </>
  );
}
