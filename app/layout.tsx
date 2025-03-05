import localFont from "next/font/local";
import "./globals.css";

const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.ttf",
  variable: '--font-clash',
});

const archivo = localFont({
  src: "./fonts/Archivo-Variable.ttf",
  variable: '--font-archivo',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${clashDisplay.variable} ${archivo.variable} dark antialiased min-h-screen flex flex-col relative`}
      >
        {children}
      </body>
    </html>
  );
}