'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import useProgressLoader from '@/hooks/useProgressLoader'

export default function LoadingScreen() {
  const { progress, isLoading, resetLoading } = useProgressLoader({
    steps: [25, 50, 75, 100],
    interval: 750
  })

  return (
    <>
      <button onClick={() => resetLoading()}>RESET</button>
      <div style={{ display: isLoading ? 'flex' : 'none'}} className="fixed w-screen z-100 h-screen flex items-center justify-center flex-col">
        <div style={{
          clipPath: `inset(${progress}% 0 0 0)`,
          transition: 'clip-path 0.2s linear'
        }} className='absolute bg-background size-full'></div>
        <div className='relative size-64'>
          <Image
            style={{
              clipPath: `inset(0 ${100 - progress}% 0 0)`,
              //transition: 'clip-path 0.5s ease-out'
            }}
            src='/logo.webp'
            alt='Logo'
            fill
            className="size-full object-contain"
          />
        </div>
        <div className="w-64 flex flex-col gap-4 p-4">
          <progress className="w-full" />
        </div>
      </div>
    </>
  )
}