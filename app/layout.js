import localFont from 'next/font/local';
import StyledJsxRegistry from '@/lib/registry';

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
    description: 'Onde o estilo encontra o asfalto, a Rua de Baixo acontece',
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
    <html lang="pt-BR">
      <StyledJsxRegistry>
          <body className={clash.className}>
            {children}
          </body>
      </StyledJsxRegistry>
    </html>
  )
}
