import localFont from 'next/font/local';
import StyledJsxRegistry from '../lib/registry';

const clash = localFont({ src: '../public/assets/fonts/ClashDisplay-Variable.ttf' })

export const metadata = {
  title: 'Rua de Baixo',
  description: 'Streetwear, brechó, estilo',
}


export default function RootLayout({ children }) {
  return (
      <StyledJsxRegistry>
        <html lang="pt-BR">
          <body className={clash.className}>{children}</body>
        </html>
      </StyledJsxRegistry>
  )
}
