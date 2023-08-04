import localFont from 'next/font/local';
import { StateContext } from '../context/StateContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StyledComponentsRegistry from '../lib/registry';
<<<<<<< HEAD
=======
import Head from 'next/head';
>>>>>>> 64c7613 (Lookbone done)

const clash = localFont({ src: '../public/assets/fonts/ClashDisplay-Variable.ttf' })

export const metadata = {
  title: 'Rua de Baixo',
<<<<<<< HEAD
  description: 'Streetwear, brechó, estilo',
=======
  description: 'Onde o estilo encontra o asfalto, a Rua de Baixo acontece',
  image: '../public/assets/og.png'
>>>>>>> 64c7613 (Lookbone done)
}

export default function RootLayout({ children }) {
  return (
    <StateContext>
      <html lang="pt-BR">
        <StyledComponentsRegistry>
          <body className={clash.className}>
            <Header />
            {children}
            <Footer />
          </body>
        </StyledComponentsRegistry>
      </html>
    </StateContext>
  )
}
