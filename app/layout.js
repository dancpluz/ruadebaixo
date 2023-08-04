import localFont from 'next/font/local';
import StyledJsxRegistry from '@/lib/registry';
import Head from 'next/head';

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
      <StyledJsxRegistry>
          <body className={clash.className}>
            {children}
          </body>
      </StyledJsxRegistry>
    </html>
  )
}
