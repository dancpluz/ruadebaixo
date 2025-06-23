import { FORM_LINK } from '@/lib/const'
import Link from 'next/link'
import React from 'react'

export default function Manifesto() {
  return (
    <div className='flex text-foreground flex-col max-w-2xl gap-5'>
      <h1 className='text-4xl font-pixelated font-bold text-center'>FAQ</h1>
      <h2 className='text-2xl font-pixelated font-bold w-full text-start'>O que é?</h2>
      <p className='text-lg w-full text-justify'>
        <u>Para o visitante:</u> é um site onde você pode gerar/visualizar artes reais de pessoas que quiseram participar do projeto, funcionando como uma galeria virtual. Esses quadros curiosamente têm o tema “fck ia” (dane-se a inteligência artificial).
      </p>
      <p className='text-lg w-full text-justify'>
        <u>Para o artista:</u> o espaço é seu microfone, você expressa com sua arte o seu descontentamento. Um local onde você, junto a outros, pode se manifestar e apoiar o movimento.
      </p>
      <h2 className='text-2xl font-pixelated font-bold w-full text-start'>Como usa?</h2>
      <p className='text-lg w-full text-justify'>
        Entra no site, espera carregar (Windows XP), leia o pop-up do clips de papel, <u>CLIQUE EM GERAR ARTE</u>. Cada artista colocou uma mensagem especial. agora você gerou uma <u>arte instantaneamente do zero, sem intervenção de IA!</u> Agora role pra baixo pra ver o pop-up do instagram de todos os artistas.
      </p>
      <h2 className='text-2xl font-pixelated font-bold w-full text-start'>O que o artista ganha com isso?</h2>
      <p className='text-lg w-full text-justify'>
        O artista se posiciona como resistencia diante sua circunstância. Conscientiza e a valoriza da arte. Mesmo que pareça pifio, é muito importante demonstrar seu descontentamento, afinal, ninguem vai fazer isso pelos artistas. <u>FAÇA ALGO A RESPEITO</u>
      </p>
      <h2 className='text-2xl font-pixelated font-bold w-full text-start'>Sou artista, como participo?</h2>
      <p className='text-lg w-full text-justify'>
        Basta preencher o nosso formulário clicando no botão abaixo:
      </p>
      <Link href={FORM_LINK} className='w-full justify-center flex'>
        <button className='px-2 py-3 text-lg text-foreground'>
          Quero participar!
        </button>
      </Link>
      <span className='text-lg font-pixelated w-full font-bold'>
        ESSE TEXTO FOI FEITO COM AJUDA DE UMA IA
      </span>
    </div>
  )
}
