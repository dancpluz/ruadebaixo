import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";
import AnimatedCursor from '@/components/AnimatedCursor'
import { getArtists } from "./actions/strapi";
import { checkStrapiAvailability } from "@/lib/strapi";
import { ArtistEntity } from "@/types/strapi";
import Providers from "./providers";
import { Metadata } from 'next';

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: "Gere sua Arte! | FCK IA",
    template: "%s | FCK IA",
  },
  description: "GERE SUA ARTE 100% GRÁTIS, PERFEITA E FÁCIL! Uma experiência nostálgica ao estilo Windows XP, onde artistas reais são valorizados. Se você é um artista indignado com IA participe do nosso projeto!",
  applicationName: "FCK IA",
  authors: [{ name: "Ruadebaixo" }],
  generator: 'Next.js',
  keywords: [
    'fck ia', 'hate ai', 'fck ai', 'arte real', 'gerador de imagens', 'paródia de IA', 'Windows XP', 'nostalgia', 'Ruadebaixo',
    'artistas brasileiros', 'inteligência artificial', 'arte digital', 'Clippy', 'Rover', 'satira IA',
    'experiência vintage', 'computador retrô', 'instagram de artistas', 'arte real'
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'Ruadebaixo',
  publisher: 'Ruadebaixo',
  metadataBase: new URL('https://ia.ruadebaixo.com.br'),
  openGraph: {
    title: "Gere sua Arte | FCK IA",
    description: 'CRIE SUA ARTE 100% GRÁTIS, PERFEITA E FÁCIL! TECNOLOGIA IA DE PONTA!',
    url: 'https://ia.ruadebaixo.com.br',
    siteName: 'FCK IA',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/fck-ia-logo.webp',
        width: 5700,
        height: 3300,
        alt: 'Logo do FCK IA, cachorro Rover mijando no computador',
      },
      {
        url: '/gpt.png',
        width: 256,
        height: 256,
        alt: 'Logo do ChatGPT pixelizado',
      },
      // {
      //   url: 'https://ia.ruadebaixo.com.br/images/preview-artistas.png',
      //   width: 1200,
      //   height: 630,
      //   alt: 'Janelas estilo XP com posts reais de artistas',
      // }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gere sua Arte! | FCK IA",
    description: 'CRIE SUA ARTE 100% GRÁTIS, PERFEITA E FÁCIL! TECNOLOGIA IA DE PONTA!',
    images: ['/fck-ia-logo.webp'],
    creator: '@ruadebaixoloja'
  },
  alternates: {
    canonical: 'https://ia.ruadebaixo.com.br',
    languages: {
      'pt-BR': 'https://ia.ruadebaixo.com.br',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ],
    apple: '/icon.png',
  },
  themeColor: 'white',
  colorScheme: 'light dark',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const availabilityResult = await checkStrapiAvailability();
  if (availabilityResult.isErr()) return <pre>Erro \n{JSON.stringify(availabilityResult,null,2)}</pre>

  const resultArtists = await getArtists();
  if (resultArtists.isErr()) return <pre>Erro \n{JSON.stringify(resultArtists,null,2)}</pre>
  const initialArtists = resultArtists.value.data as ArtistEntity[]

  return (
    <html lang="pt-BR">
      <body className='custom-cursor antialiased min-h-screen flex flex-col relative'>
        <LoadingScreen />
        <AnimatedCursor selector=".custom-cursor" aniPath="/wag.ani" />
        <Providers initialArtists={initialArtists}>
          {children}
        </Providers>
      </body>
    </html>
  );
}