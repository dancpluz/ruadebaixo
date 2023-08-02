import localFont from 'next/font/local';
import StyledJsxRegistry from '../lib/registry';
import Head from 'next/head';

const clash = localFont({ src: '../public/assets/fonts/ClashDisplay-Variable.ttf' })

export const metadata = {
  title: 'Rua de Baixo',
  description: 'Streetwear, brechó, estilo',
  image: 'assets/og.png'
}

export default function RootLayout({ children }) {
  return (
      <StyledJsxRegistry>
        <html lang="pt-BR">
          <Head>
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:image" content={metadata.image} />
            <meta property="og:image:width" content="800" />
            <meta property="og:image:height" content="800" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="pt_BR" />
          </Head>
          <body className={clash.className}>{children}</body>
        </html>
      </StyledJsxRegistry>
  )
}
