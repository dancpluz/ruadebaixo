'use client'

import { useGameContext } from "@/hooks/useGameContext";
import GameCard from "./GameCard";
import { cn } from "@/lib/utils";

export default function GameSelect({ gameCovers }: { gameCovers: any[] }) {
  const { selectedGame, setSelectedGame } = useGameContext()
  const selected = selectedGame !== null;

  const text = 'Selecione seu jogo';

  const textStyle = 'absolute text-center md:text-5xl text-4xl md:top-12 top-36 left-1/2 -translate-x-1/2 w-full'

  return (
    <div className='flex h-full justify-center items-center gap-[1vw] px-4'>
      <h1 className={cn(textStyle, 'transition-opacity duration-800', selected ? 'opacity-0' : 'opacity-100')}>{text}</h1>
      <h1 className={cn(textStyle, 'blur-md animate-pulse', selected ? 'opacity-0' : 'opacity-80')}>{text}</h1>
      {/* <pre style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(mockGameCovers, null, 2)}
        </pre> */}
      {/* <pre className="whitespace-pre-wrap absolute top-0 left-0 text-amber-50">
        {JSON.stringify(selectedGame)}
      </pre> */}
      {gameCovers.map((gameCover, i) => (
        <GameCard key={gameCover.id} active={selectedGame === i} gameCover={gameCover} handleSelect={(e) => { e.stopPropagation(); setSelectedGame(i); }} />
      ))}
    </div>
  )
}
