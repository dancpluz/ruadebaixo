import { GameCoverEntity } from "@/types/strapi";
import Image from 'next/image';

export default function GameCard({ gameCover }: { gameCover: GameCoverEntity }) {
  const { cover } = gameCover

  return (
    <div className="bg-black aspect-[88/125] min-h-[400px]">
      <div className='bg-black border-b border-white h-[55px] flex items-center justify-between px-3 py-2'>
        <div className='relative aspect-[514/121] h-full'>
          <Image
            src={'/RuaStationText.svg'}
            fill
            alt='RuaStation 2 Text'
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
      <div className='relative h-full w-full'>
        <Image
          src={cover}
          alt='RuaStation 2 Text'
          className='object-cover'
          fill
        />
      </div>
    </div>
  )
}
