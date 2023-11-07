'use client'

import { CenterScreen } from '@/components/styles/OtherStyles.styled';
import Link from 'next/link';

export const metadata = {
  title: 'Erro',
  description: 'Infelizmente ocorreu algum erro inesperado',
}

export default function ErroPage() {
  return (
    <CenterScreen>
      <div>
        <h1>Infelizmente ocorreu algum erro inesperado</h1>
        <p>Volte à <Link href='/'><u>página inicial</u></Link> e tente novamente</p>
      </div>
    </CenterScreen>
  )
}
