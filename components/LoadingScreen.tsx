'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const steps = [25, 50, 75, 100]
    let currentStep = 0

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep])
        currentStep++
      } else {
        clearInterval(interval)
        setIsLoading(false)
      }
    }, 750) // 3 seconds total for 4 steps

    return () => clearInterval(interval)
  }, [isLoading])

  //if (!isLoading) return null

  return (
    <>
      <button onClick={() => { setProgress(0); setIsLoading(true) }}>RESET</button>
      <div style={{ display: isLoading ? 'flex' : 'none'}} className="fixed w-screen z-100 h-screen flex items-center justify-center flex-col">
        <div style={{
          clipPath: `inset(${progress}% 0 0 0)`,
          transition: 'clip-path 0.5s ease-out'
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