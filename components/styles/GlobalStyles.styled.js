'use client'

import { ThemeProvider,createGlobalStyle } from 'styled-components';

const theme = {
  colors: {
    light: '#FFF',
    dark: '#000',
    grey: '#F6F6F6;',
  },
  sizes: {
    small: '(max-width: 700px)',
    medium: '(max-width: 1344px)',
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
  input, select {
    appearance: none;
    height: 40px;
    padding: 0px 16px;
    border: 1px solid ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.dark};
    font-family: 'Clash Display', sans-serif;
    font-size: 1rem;
  }

  input[type=radio] {
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.dark};
    height: 32px;
    width: 32px;
    flex-grow: 0;
    padding: 0;
    display: grid;
    place-content: center;
    cursor: pointer;

    &:before {
      content: "";
      width: 16px;
      height: 16px;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1rem 1rem ${({ theme }) => theme.colors.dark};
    }
    :checked::before {
    transform: scale(1);
  }
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
  ul {
    list-style-position: inside;
  }
  vl {
    border-left: 1px solid ${({ theme }) => theme.colors.dark};
  }
`

export default function GlobalStyles({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}
