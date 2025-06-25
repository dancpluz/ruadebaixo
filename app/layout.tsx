import localFont from "next/font/local";
import { Roboto_Condensed } from 'next/font/google'
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.ttf",
  variable: '--font-clash',
  display: 'swap',
});

const archivo = localFont({
  src: "./fonts/Archivo-Variable.ttf",
  variable: '--font-archivo',
  display: 'swap',
});

const robotoCondensed = Roboto_Condensed({
  variable: '--font-roboto-condensed',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={cn(
        clashDisplay.variable,
        archivo.variable,
        robotoCondensed.variable
      )}
      lang="pt-BR"
      suppressHydrationWarning
    >
      <body className='antialiased min-h-screen flex flex-col relative'>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}