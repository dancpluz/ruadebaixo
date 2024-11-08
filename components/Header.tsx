'use client'

import { create } from 'zustand'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Marquee from "react-fast-marquee";
import Cart from './Cart';
import HamburgerIcon from '@/public/icons/hamburger.svg';
import XIcon from '@/public/icons/x.svg'
import Image from 'next/image';
import Nav from './Nav';
import Link from 'next/link';
import { useWindowScroll } from "@uidotdev/usehooks";
import { useEffect } from 'react';
import { useMediaQuery } from "@uidotdev/usehooks";

interface ScrollStore {
  y: number;
  lastY: number;
  direction: 'up' | 'down';
  setY: (y: number) => void;
}

export const useScrollStore = create<ScrollStore>((set, get) => ({
  y: 0,
  lastY: 0,
  direction: 'up',
  setY: (newY) => {
    const lastY = get().y;
    const direction = newY > lastY ? 'down' : 'up';
    set({ y: newY, lastY, direction });
  },
}));

const useHamburger = create<{ open: boolean, toggleOpen: () => void }>((set) => ({
  open: false,
  toggleOpen: () => set((state) => ({ open: !state.open })),
}))


export default function Header({ marqueeStrings = [] } : { marqueeStrings: string[] }) {
  const [{ y }, scrollTo] = useWindowScroll();
  const { setY, direction } = useScrollStore();


  // Update scroll store on scroll
  useEffect(() => {
    if (y !== null) {
      setY(y);
    }
  }, [y, setY]);

  // Determine if the header should be hidden
  const shouldHide = direction === 'down' && (y ?? 0) > 100;

  function Hamburger() {
    const { open, toggleOpen } = useHamburger()

    return (
      <Sheet open={open} onOpenChange={toggleOpen}>
        <SheetTrigger className='md:hidden flex place-self-start self-center items-center'>
          <HamburgerIcon className='hover:opacity-70 transition-opacity text-foreground size-6' />
        </SheetTrigger>
        <SheetContent close={<XIcon className='text-foreground size-7' />} side='left' className="md:hidden w-screen">
          <SheetHeader className='flex p-5 flex-row items-center justify-between'>
            <HamburgerIcon onClick={toggleOpen} className='hover:opacity-70 transition-opacity cursor-pointer transform -scale-y-100 text-foreground size-6' />
            <SheetTitle>RUAS</SheetTitle>
            <span aria-hidden='true' className='size-10' />
          </SheetHeader>
          <Nav onSwitchTab={toggleOpen} />
        </SheetContent>
      </Sheet>
    )
  }
  
  return (
    <header className='pt-16'>
      <div className={`h-16 top-0 left-0 w-screen fixed bg-background ${marqueeStrings.length > 0 ? '' : 'border-b'} ${y === 0 ? '' : 'border-b'} border-foreground grid grid-cols-3 place-content-center place-items-center px-5 md:px-12 z-20 gap-2 transition-transform duration-500 ${shouldHide ? '-translate-y-full' : 'translate-y-0'}`}>
        <Hamburger />
        <div className='hidden md:flex'>
          <Nav />
        </div>
        <div onClick={() => scrollTo({ left: 0, top: 0, behavior: "smooth" })} className='relative self-center size-[48px]'>
          <Link href='/'>
            <Image alt='Logo Rua de Baixo' className='object-cover' src='/logo.png' fill />
          </Link>
        </div>
        <Cart />
      </div>
      {marqueeStrings.length > 0 && <Marquee className='h-9 border-t border-b border-foreground' autoFill pauseOnClick speed={40}>
        {marqueeStrings.map((string,i) => (
          <div key={i + '-' + string} className='text-sm uppercase tracking-wider flex'>
            <span className=''>{string}</span>
            <span className='mx-6'>-</span>
          </div>
        ))}
      </Marquee>}
    </header>
  )
}
