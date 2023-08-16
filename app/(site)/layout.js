import localFont from 'next/font/local';
import { StateContext } from '@/context/StateContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/components/styles/GlobalStyles.styled';

const clash = localFont({ src: '../../public/assets/fonts/ClashDisplay-Variable.ttf' })

export const metadata = {
  title: {
    template: '%s | RDB',
  },
  description: 'Conheça o primeiro drop "Valendo uma Coca"!',
  keywords: ['roupas','streetwear','drop','vendas','brechó','skate','moda','moda urbana','streetstyle'],
  colorScheme: 'light',
  metadataBase: new URL('https://www.ruadebaixo.com.br'),
  openGraph: {
    title: 'Rua de Baixo',
    description: 'Conheça o primeiro drop "Valendo uma Coca"!',
    siteName: 'Rua de Baixo',
    url: 'https://www.ruadebaixo.com.br/',
    type: 'website',
    locale: 'pt_BR',
    images: '/assets/og.png'
  },
  icons: {
    icon: '/favicon.ico',
  },
  themeColor: 'black',
}

export default function RootLayout({ children }) {
  return (
    <StateContext>
      <html lang="pt-BR">
        <StyledComponentsRegistry>
          <GlobalStyles>
          <body className={clash.className}>
            <Header />
            {children}
            <Footer />
          </body>
          </GlobalStyles>
        </StyledComponentsRegistry>
      </html>
    </StateContext>
  )
}
