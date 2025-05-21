'use client'

import { submitEmail } from '@/app/actions/strapi'
import { FORM_LINK } from '@/lib/const'
import Link from 'next/link'
import React from 'react'
import { useActionState } from 'react'

const initialState = {
  success: '',
  error: ''
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitEmail, initialState)

  return (
    <div className='window relative simple-float max-w-[400px]'>
      <div className="title-bar max-h-0 min-h-7">
        <h1 className="title-bar-text text-sx">Faça parte da Rua de Baixo!</h1>
        <div className="title-bar-controls">
          <Link href={FORM_LINK} target='_blank'>
            <button aria-label="Help" />
          </Link>
          <button aria-label="Close" />
        </div>
      </div>
      <div className="window-body">
        <form action={formAction} className='flex flex-col gap-2 px-4 py-2'>
          <p className='text-[17px]'>Fique sabendo com <u>antecedência</u> quando lançarmos novos projetos.</p>
          <p className='text-[15px]'>Acesso a <u>descontos</u> e informações <u>exclusivas!</u></p>

          <div className="field-row flex gap-1">
            <label className='text-[12px]' htmlFor="email">seu email</label>
            <input
              className='flex grow'
              id="email"
              name="email"
              type="email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              required
            />
            <button
              className='p-1'
              type="submit"
              disabled={pending}
            >
              {pending ? 'Enviando...' : 'Inscrever-se'}
            </button>
          </div>

          {state?.success && (
            <p className="font-pixelated text-green-600 text-sm">{state.success}</p>
          )}
          {state?.error && (
            <p className="font-pixelated text-red-600 text-sm">{state.error}</p>
          )}
        </form>
        <div className="status-bar">
          <Link href={FORM_LINK} target='_blank' className='status-bar-field text-blue-500 hover:underline'>
            Ainda estamos aceitando inscrições de artistas! <u>Clique Aqui</u>
          </Link>
        </div>
      </div>
    </div>
  )
}
