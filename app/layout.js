'use client'

import localFont from 'next/font/local';
import { StateContext } from '../context/StateContext';
import { ThemeProvider,createGlobalStyle } from 'styled-components'
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const clash = localFont({ src: '../public/assets/fonts/ClashDisplay-Variable.ttf' })

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
  }
  body {
    font-family: 'Clash Display', sans-serif;
    color: ${({ theme }) => theme.colors.dark};
  }
  button {
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    height: 60px;
    width: 100%;
    font-family: 'Clash Display', sans-serif;
  }
  h1, h2, h3, h4 {
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
    <StateContext>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <html lang="pt-BR">
          <body className={clash.className}>
            <Header />
            {children}
            <Footer />
          </body>
          
        </html>
      </ThemeProvider>
    </StateContext>
  )
}
