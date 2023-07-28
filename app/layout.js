'use client'

import localFont from 'next/font/local'
import { ThemeProvider,createGlobalStyle } from 'styled-components';

const clash = localFont({ src: '../assets/fonts/ClashDisplay-Variable.ttf' })

export const metadata = {
  title: 'Rua de Baixo',
  description: 'Streetwear, brechó, estilo',
}

const theme = {
  colors: {
    light: '#FFF',
    dark: '#000',
    grey: '#F6F6F6;',
  }
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.colors.dark};
    font-weight: 600;
  }

  button {
    font-weight: 600;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  span {
    font-size: 1rem;
    font-weight: 400;
  }

  p {
    font-size: 1.125rem;
    font-weight: 400;
  }

  hr {
    border: 1px solid ${({ theme }) => theme.colors.dark};
  }
`

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <html lang="pt-BR">
          <body className={clash.className}>{children}</body>
        </html>
    </ThemeProvider>
  )
}
