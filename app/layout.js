import localFont from 'next/font/local';
import { StateContext } from '../context/StateContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StyledComponentsRegistry from '../lib/registry';
import Head from 'next/head';

const clash = localFont({ src: '../public/assets/fonts/ClashDisplay-Variable.ttf' })

export const metadata = {
  title: 'Rua de Baixo',
  description: 'Onde o estilo encontra o asfalto, a Rua de Baixo acontece',
  image: 'assets/og.png'
}

export default function RootLayout({ children }) {
  return (
    <StateContext>
      <html lang="pt-BR">
        <Head>
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:image" content={metadata.image} />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="800" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:url" content="https://ruadebaixo.com.br" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metadata.title} />
          <meta name="twitter:description" content={metadata.description} />
          <meta name="twitter:image" content={metadata.image} />
        </Head>
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
