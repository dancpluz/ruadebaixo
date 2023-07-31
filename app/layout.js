import localFont from 'next/font/local';
import { StateContext } from '../context/StateContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StyledComponentsRegistry from '../lib/registry';

const clash = localFont({ src: '../public/assets/fonts/ClashDisplay-Variable.ttf' })

export const metadata = {
  title: 'Rua de Baixo',
  description: 'Streetwear, brechó, estilo',
}

export default function RootLayout({ children }) {
  return (
    <StyledComponentsRegistry>
      <StateContext>
        <html lang="pt-BR">
          <body className={clash.className}>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </StateContext>
    </StyledComponentsRegistry>
  )
}
