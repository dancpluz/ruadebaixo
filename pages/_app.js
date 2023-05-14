import { createGlobalStyle } from "styled-components";
import { StateContext } from '../context/StateContext';
import Layout from "../components/Layout";

const GlobalStyles = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;
    font-family: 'Clash Display', sans-serif;
  }
  button {
    font-family: 'Clash Display', sans-serif;
    font-weight: 600;
  }
  h1 {
    margin: 0;
    font-size: 15px;
    font-weight: 500;
  }
  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
  p {
    margin: 0;
  }
  hr {
    border: 1px solid black;
    margin: 0;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <StateContext>
        <GlobalStyles/>
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </StateContext>
    </>
  )
}
