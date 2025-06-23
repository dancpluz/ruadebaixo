// components/ScrollLogo.tsx
'use client'

import { useEffect, useState } from 'react'
import AnimatedImage from './AnimatedImage'

export default function ScrollLogo() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = () => {
    const sectionStart = document.getElementById('gerador')
    const sectionEnd = document.getElementById('manifesto')
    if (sectionEnd && !isScrolled) {
      sectionEnd.scrollIntoView({ behavior: 'smooth' })
    } else if (sectionStart && isScrolled) {
      sectionStart.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      onClick={scrollToSection}
      className={`
        ${isScrolled ?
          'fixed h-16 top-3 right-4 cursor-pointer' :
          'absolute h-42 top-2 left-1/2 -translate-x-1/2'}
        transition duration-300 hover:scale-110 z-100 aspect-[57/33]
      `}
    >
      <AnimatedImage
        src='/fck-ia-logo.webp'
        alt='FCK AI'
        className='size-full'
        width={570}
        height={330}
      />
    </div>
  )
}