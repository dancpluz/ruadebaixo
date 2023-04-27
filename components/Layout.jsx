import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
