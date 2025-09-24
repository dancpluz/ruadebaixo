'use client'

import { useGameContext } from '@/hooks/useGameContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function GameButtons() {
  const { selectedGame, setSelectedGame, backSide, setBackSide } = useGameContext();
  const selected = selectedGame !== null;

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedGame(null);
  };

  return (
    <div className='fixed z-50 bottom-[8vw] w-full grid grid-cols-3 gap-4 px-16 justify-items-center content-center'>
      <div/>
      <div className='flex gap-8'>
        <Button disabled={!selected}>
          <Image
            src={'/ButtonX.svg'}
            alt='Botão X'
            width={32}
            height={32}
          />
          <span className='text-3xl line-clamp-1'>Jogar</span>
        </Button>
        <Button onClick={handleBack} disabled={!selected}>
          <Image
            src={'/ButtonCircle.svg'}
            alt='Botão Círculo'
            width={32}
            height={32}
          />
          <span className='text-3xl line-clamp-1'>Voltar</span>
        </Button>
      </div>
      <Button onClick={() => setBackSide(prev => !prev)} disabled={!selected}>
        <Image
          src={'/ButtonTriangle.svg'}
          alt='Botão Triangulo'
          width={32}
          height={32}
        />
        <span className='text-3xl line-clamp-1'>{backSide ? 'Capa' : 'Verso'}</span>
      </Button>
    </div>
  )
}

function Button({ children, className, disabled, onClick }: { children: React.ReactNode, className?: string, disabled?: boolean, onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <button
      disabled={disabled}
      className={cn(`flex items-center gap-4 cursor-pointer h-12 bg-background/30 backdrop-blur-sm pl-2 pr-4 rounded-full border border-transparent hover:border-white/30 hover:bg-background/80 disabled:pointer-events-none disabled:opacity-50 duration-1000 transition-all`, className)}
      type='button'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
