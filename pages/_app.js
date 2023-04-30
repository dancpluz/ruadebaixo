import { createGlobalStyle } from "styled-components";
import { StateContext } from '../context/StateContext';
import Layout from "../components/Layout";

const GlobalStyles = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;
    font-family: 'Clash Display', sans-serif;
  }
  h1 {
    color: #fff;
    margin: 0;
    font-size: 15px;
    font-weight: 500;
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
