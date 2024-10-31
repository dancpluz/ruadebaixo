import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import StoreProvider from '@/app/Context'
import Footer from "@/components/Footer";
import { fetchFromStrapi } from "./actions/strapi";
import { Home } from "@/types/api/home";

const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.ttf",
  variable: '--font-clash',
});

const archivo = localFont({
  src: "./fonts/Archivo-Variable.ttf",
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  title: "Rua de Baixo",
  description: "Os donos da Rua",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetchFromStrapi<Home>('home', true);
  const marqueeStrings = data.data?.attributes?.anuncios || [];
  const finalDate = data.data?.attributes?.data_lancamento || '';

  return (
    <html lang="pt-BR">
      <body
        className={`${clashDisplay.variable} ${archivo.variable} dark antialiased min-h-screen flex flex-col pt-16 relative`}
      >
        <StoreProvider finalDate={finalDate}>
          <Header marqueeStrings={marqueeStrings} />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
