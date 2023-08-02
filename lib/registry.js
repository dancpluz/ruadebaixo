'use client'

import React,{ useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet,StyleSheetManager, ThemeProvider, createGlobalStyle } from 'styled-components'

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

export default function StyledComponentsRegistry({ children }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  )
}