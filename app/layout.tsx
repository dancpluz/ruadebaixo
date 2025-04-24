import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={clashDisplay.variable + ' ' + archivo.variable} lang="pt-BR">
      <body className='antialiased min-h-screen flex flex-col relative'>
        {children}
      </body>
    </html>
  );
}