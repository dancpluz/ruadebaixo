import localFont from 'next/font/local';
import { StateContext } from '@/context/StateContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StyledComponentsRegistry from '@/lib/registry';
import FacebookPixel from '@/components/FacebookPixel';
import GlobalStyles from '@/components/styles/GlobalStyles.styled';

const clash = localFont({ src: '../public/assets/fonts/ClashDisplay-Variable.ttf' })

export const metadata = {
  title: {
    template: '%s | RDB',
  },
  description: "⤵️ Descubra o autêntico mundo do streetwear na Rua de Baixo, onde a moda encontra a individualidade. Explore nosso último drop '+90' com as peças mais exclusivas do mercado dos brechós! Desde roupas vintage até designs inovadores, cada peça conta uma história única. Sinta a essência das ruas em nossas coleções. Vista-se com personalidade, escolha Rua de Baixo.",
  keywords: ['roupas','rua','baixo','rua de baixo','rdb','streetwear','drop','desconto','vendas','minidrop','achei','brechó','skate','moda','moda urbana','streetstyle','BMX','descolado','rap','graffitti','parkour','batalha de rima','cultural','daora','podpah','moda sustentavel','pixo','arte','Roupas streetwear baratas', 'Streetwear acessível', 'Moda urbana econômica', 'Streetwear de qualidade a preços baixos', 'Estilo de rua acessível', 'Tendências de moda de rua baratas', 'Roupas urbanas econômicas', 'Vestuário streetwear com desconto', 'Compras de rua em conta', 'Moda urbana em promoção', 'Streetwear econômico online', 'Cultura das ruas acessível', 'Descontos em streetwear', 'Roupa de rua com preços baixos', 'Estilo de rua acessível', 'Streetwear acessível para todos', 'Roupas de rua econômicas e estilosas', 'Promoções de moda urbana', 'Loja de rua com descontos', 'Ofertas de roupas de rua', 'Streetwear econômico de alta qualidade', 'Tendências de moda urbana baratas', 'Loja online de streetwear acessível', 'Descontos em roupas urbanas', 'Vestuário de rua em promoção'],
  colorScheme: 'light',
  metadataBase: new URL('https://www.ruadebaixo.com.br'),
  openGraph: {
    title: 'Rua de Baixo',
    description: 'Confira nosso último drop "+90" com as peças mais esclusivas do mercado dos brechós!',
    siteName: 'Rua de Baixo',
    url: 'https://www.ruadebaixo.com.br/',
    type: 'website',
    locale: 'pt_BR',
    images: '/assets/og.png'
  },
  icons: {
    icon: '/favicon.ico',
  },
  themeColor: 'white',
}

export default function RootLayout({ children }) {
  return (
    <StateContext>
      <html lang="pt-BR">
        <StyledComponentsRegistry>
          <GlobalStyles>
            <body className={clash.className}>
              <FacebookPixel />
              <Header />
              {children}
              <Footer />
            </body>
          </GlobalStyles>
        </StyledComponentsRegistry>
      </html>
    </StateContext>
  )
}
