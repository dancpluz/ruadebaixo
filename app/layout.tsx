import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Rua de Baixo",
  description: "Os donos da Rua",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${clashDisplay.variable} ${archivo.variable} dark antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
