'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useGeneratorContext } from '@/hooks/useGeneratorContext'
import { GIF_DURATIONS } from '@/lib/const'
import Link from 'next/link'

export default function Clippy() {
  const { currentArtist } = useGeneratorContext()
  const gifsArray = Object.keys(GIF_DURATIONS)
  
  const [currentGif, setCurrentGif] = useState(gifsArray[0])
  const [lastIndex, setLastIndex] = useState(0)
  const [gifVersion, setGifVersion] = useState(0)
  const [randomMessage, setRandomMessage] = useState('')

  const MESSAGES = [
    `Isso aqui é arte de verdade, aprecie a obra de @${currentArtist?.insta}! Aqui a mensagem dele/dela:`,
    `Olha que coisa mais linda, mais cheia de graça, é ela/ele @${currentArtist?.insta}! Ele/ela mandou essa mensagem:`,
    `Arte detectada! Trazendo pacote direto de @${currentArtist?.insta}! No pacote está escrito:`,
    `Chora GPT, isso aqui é @${currentArtist?.insta}! Ele/ela disse:`,
    `Gerei algo REAL! @${currentArtist?.insta} falou:`,
    `Nosso sistema ultra complexo e moderno, vulgo @${currentArtist?.insta}, gerou essa maravilha! Sua mensagem é:`,
    `Simplesmente @${currentArtist?.insta}! Ele/ela ainda deixou essa mensagem:`,
    `Não é IA, @${currentArtist?.insta} se esforçou pra fazer isso! Olha o que ele/ela disse:`,
  ]

  const formatMessage = (message: string) => {
    return message.split(/(@[\w.]+)/g).map((part, index) => {
      if (part.startsWith('@')) {
        const username = part.replace('@', '')
        return (
          <Link
            key={index}
            href={`https://www.instagram.com/${username}`}
            target="_blank"
            className="text-accent hover:underline"
          >
            {part}
          </Link>
        )
      }
      return part
    })
  }

  useEffect(() => {
    if (currentArtist) {
      // Generate random GIF between 1-6
      let randomIndex = Math.floor(Math.random() * (gifsArray.length - 1)) + 1
      while (randomIndex === lastIndex) {
        randomIndex = Math.floor(Math.random() * (gifsArray.length - 1)) + 1
      }
      const messageIndex = Math.floor(Math.random() * MESSAGES.length)
      const newMessage = MESSAGES[messageIndex]
      const newGif = gifsArray[randomIndex]

      setRandomMessage(newMessage)
      setCurrentGif(`${newGif}?v=${Date.now()}`)
      setGifVersion(prev => prev + 1)
      setLastIndex(randomIndex)

      // Set timeout to return to idle after animation
      const timeout = setTimeout(() => {
        setCurrentGif(gifsArray[0])
      }, GIF_DURATIONS[newGif]) // Adjust timeout based on your GIF duration

      return () => clearTimeout(timeout)
    }
  }, [currentArtist])

  const displayMessage = currentArtist?.message
    ? `${randomMessage}\n${currentArtist.message}`
    : "Ta pronto pra gerar uma arte foda, sem esforço, totalmente grátis e instantânea?\nClica no botão 'Gerar Arte' e bora!"

  return (
    <div className='absolute bottom-10 lg:right-32 right-4 z-10'>
      <div className='relative'>
        <div className='absolute -translate-y-[100%] z-12 origin-bottom'>
          <div className='relative font-pixelated bg-textbox border-black border-1 rounded-md p-2'>
            <h1 key={currentArtist?.id} className="clippy-text lg:max-w-[250px] max-w-[150px] animate-typewriter whitespace-pre-line">
              {formatMessage(displayMessage)}
            </h1>
            <Image
              alt='Seta da caixa de texto'
              src='/text-arrow.webp'
              width={10}
              height={17}
              className='absolute bottom-0 translate-y-4 left-8'
            />
          </div>
        </div>
        <div className='clippy-float size-[150px]'>
          <Image
            key={`clippy-${gifVersion}`}
            className='size-[150px]'
            alt='Animação Clippy'
            src={currentGif}
            width={100}
            height={100}
            unoptimized
          />
        </div>
      </div>
    </div>
  )
}