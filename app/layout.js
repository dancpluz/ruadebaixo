import localFont from 'next/font/local';
import { StateContext } from '@/context/StateContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StyledComponentsRegistry from '../lib/registry';

const clash = localFont({ src: '../public/assets/fonts/ClashDisplay-Variable.ttf' })

export const metadata = {
  title: {
    template: '%s | RDB',
  },
  description: 'Onde o estilo encontra o asfalto, a Rua de Baixo acontece',
  keywords: ['roupas','streetwear','brecho','skate','moda','moda urbana','streetstyle'],
  colorScheme: 'light',
  metadataBase: new URL('https://www.ruadebaixo.com.br'),
  openGraph: {
    title: 'Rua de Baixo',
    description: 'Onde o estilo encontra o asfalto, a Rua de Baixo aconteceTESTE',
    siteName: 'Rua de Baixo',
    url: 'https://www.ruadebaixo.com.br/',
    type: 'website',
    locale: 'pt_BR',
    images: 'assets/og.png'
  },
  icons: {
    icon: 'assets/favicon.ico',
  },
  themeColor: 'black',
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
