import { createGlobalStyle } from "styled-components"
import { StateContext } from '../context/StateContext';

const GlobalStyles = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }
  h1 {
  font-size: 23px;
  font-weight: 800;
  -webkit-text-stroke-width: 0.8px;
  -webkit-text-stroke-color: black;
  letter-spacing: -0.7px;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <StateContext>
        <GlobalStyles/>
          <Component {...pageProps} />
      </StateContext>
    </>
  )
}
