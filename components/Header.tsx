'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from "motion/react"
import NavBar from './NavBar';
import ImageWithSkeleton from './ImageWithSkeleton';
import { useClickOutside } from '@/hooks/useClickOutside';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useClickOutside(headerRef, () => setIsOpen(false));

  return (
    <>
      <AnimatePresence>
        {isOpen && 
          <motion.div
            className='fixed inset-0 bg-black/50 z-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />}
      </AnimatePresence>
      <header className='pt-16'>
        <motion.div
          ref={headerRef}
          className='h-16 top-0 left-0 w-screen fixed bg-background border-b-2 border-foreground grid grid-cols-3 place-content-center place-items-center px-5 md:px-12 z-20 gap-2'
          onHoverStart={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1 }}
        >
          <div></div>
          <motion.div
            className='relative z-20 self-center size-[48px]'
            whileHover={{ scale: 1.1 }}
          >
            <Link href='/'>
              <ImageWithSkeleton
                alt='Logo Rua de Baixo'
                className='object-cover'
                src='/logo.png'
                fill
              />
            </Link>
          </motion.div>
          <AnimatePresence>
            {isOpen && (
                <motion.div
                  className='fixed top-16 left-0 w-full bg-background border-b-2 border-foreground z-20 px-5 py-6'
                  style={{ originY: 0, scaleY: 0, opacity: 0 }}
                  //initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <NavBar/>
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
    </>
  )
}