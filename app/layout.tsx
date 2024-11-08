import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import StoreProvider from '@/app/Context'
import Footer from "@/components/Footer";
import { fetchFromStrapi } from "./actions/strapi";
import { Home } from "@/types/api/home";
import { Toaster } from "@/components/ui/toaster"

const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.ttf",
  variable: '--font-clash',
});

const archivo = localFont({
  src: "./fonts/Archivo-Variable.ttf",
  variable: '--font-archivo',
});

export async function generateMetadata(): Promise<Metadata> {
  const defaultMetadata = {
    title: {
      template: `%s | RDB`,
      default: 'RUA DE BAIXO'
    },
    description: "Os donos da Rua",
  }
  try {
    const data = await fetchFromStrapi<Home>('home?populate[0]=seo');
    const seo = data.data?.attributes?.seo;
  
    if (seo) {
      return {
        title: {
          template: `%s | RDB`,
          default: 'Rua de Baixo'
        },
        description: seo.metaDescription,
        keywords: seo.keywords?.split(','),
        alternates: {
          canonical: seo.canonicalURL,
        }
        // openGraph: {
        //   title: seo.opengraphTitle,
        //   description: seo.opengraphDescription,
        //   url: seo.opengraphUrl,
        //   type: seo.opengraphType,
        //   image: seo.opengraphImage,
        // }
      }
    }

    return defaultMetadata
  } catch (error) {
    return defaultMetadata
  }
}

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
        className={`${clashDisplay.variable} ${archivo.variable} dark antialiased min-h-screen flex flex-col relative`}
      >
        <StoreProvider finalDate={finalDate}>
          <Header marqueeStrings={marqueeStrings} />
          {children}
          <Footer />
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
