// import localFont from "next/font/local";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";
import AnimatedCursor from '@/components/AnimatedCursor'
import { getArtists } from "./actions/strapi";
import { checkStrapiAvailability } from "@/lib/strapi";
import { ArtistEntity } from "@/types/strapi";
import Providers from "./providers";

// const clashDisplay = localFont({
//   src: "./fonts/ClashDisplay-Variable.ttf",
//   variable: '--font-clash',
//   display: 'swap',
// });

// const archivo = localFont({
//   src: "./fonts/Archivo-Variable.ttf",
//   variable: '--font-archivo',
//   display: 'swap',
// });

//export const dynamic = 'force-dynamic'

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