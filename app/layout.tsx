// import localFont from "next/font/local";
import "./globals.css";
import AnimatedCursor from '@/components/AnimatedCursor'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <AnimatedCursor selector=".custom-cursor" aniPath="/wag.ani" />
      <body className='custom-cursor antialiased min-h-screen flex flex-col relative'>
        {children}
      </body>
    </html>
  );
}