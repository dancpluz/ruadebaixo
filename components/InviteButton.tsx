'use client'

import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import Image from 'next/image';
import { FORM_LINK, INSTAGRAM_LINK } from '@/lib/const';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function InviteButton() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const router = useRouter();

  return (
    <>
      <div onClick={() => setOpen(o => !o)} className='fixed z-30 cursor-pointer left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 simple-float'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <span className='font-pixelated bg-background px-2 rounded z-10 text-center'>Parabéns você foi selecionado!</span>
          <Image className='z-10' alt='Envelope aberto' src='/invite.webp' width={120} height={120} />
          <Image className='absolute opacity-60' alt='Fundo brilhante' src='/spinning-background.gif' width={200} height={200} unoptimized />
          <span className='font-pixelated bg-background px-2 rounded z-10'>Clique aqui</span>
        </div>
      </div>
      <Popup open={open} closeOnDocumentClick={false} onClose={closeModal} modal>
        <div className='px-4'>
          <div className='window relative max-w-[460px]'>
            <div className="title-bar max-h-0 min-h-7">
              <h1 className="title-bar-text text-sx">Participe do projeto!</h1>
              <div className="title-bar-controls">
                <Link href={INSTAGRAM_LINK} target='_blank'>
                  <button aria-label="Help" />
                </Link>
                <button aria-label="Close" onClick={closeModal} />
              </div>
            </div>
            <div className="window-body">
              <div className='flex flex-col gap-2 px-4 py-2'>
                <div className='flex items-center gap-2'>
                  <Image
                    src='/bucket.webp'
                    alt='Envelope aberto'
                    width={80}
                    height={80}
                    className='w-20 h-20'
                  />
                  <p className='text-[16px] text-justify'>Você é um artista que vemos muito <u>valor</u> e gostaríamos de eternizar sua <u>arte</u> no projeto.</p>
                </div>
                <p className='text-[16px] text-justify'>Se você também é <u>contra</u> falar que imagens gerada por IA é <u>arte</u>, preencha o formulário:</p>
                <Link className='flex justify-center items-center' href={FORM_LINK} target='_blank'>
                  <button className='text-xl w-full p-3 text-foreground' onClick={() => router.push('/')}>
                    INSCREVA-SE
                  </button>
                </Link>
              </div>
            </div>
            <div className='status-bar'>
              <p className="status-bar-field">Se tiver dúvidas mande em <Link className='hover:underline' href={INSTAGRAM_LINK} target='_blank'>@ruadebaixoloja</Link></p>
              <p className="status-bar-field">Rua de Baixo ®</p>
            </div>
          </div>
        </div>
      </Popup>
    </>
  )
}
