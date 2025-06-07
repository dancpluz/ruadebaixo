export const ICONS = [
  { src: '/paint/star.webp', alt: 'Ícone Estrela' },
  { src: '/paint/rectangle-dotted.webp', alt: 'Ícone Retângulo Pontilhado' },
  { src: '/paint/eraser.webp', alt: 'Ícone Borracha' },
  { src: '/paint/bucket.webp', alt: 'Ícone Balde de Tinta' },
  { src: '/paint/drop.webp', alt: 'Ícone Gota' },
  { src: '/paint/magnify.webp', alt: 'Ícone Lupa' },
  { src: '/paint/pencil.webp', alt: 'Ícone Lápis' },
  { src: '/paint/brush.webp', alt: 'Ícone Pincel' },
  { src: '/paint/spray.webp', alt: 'Ícone Spray' },
  { src: '/paint/text.webp', alt: 'Ícone Texto' },
  { src: '/paint/line.webp', alt: 'Ícone Linha' },
  { src: '/paint/curve.webp', alt: 'Ícone Curva' },
  { src: '/paint/rectangle.webp', alt: 'Ícone Retângulo' },
  { src: '/paint/shape.webp', alt: 'Ícone Forma' },
  { src: '/paint/oval.webp', alt: 'Ícone Oval' },
  { src: '/paint/rounded.webp', alt: 'Ícone Retângulo Arredondado' },
]

export const GIF_DURATIONS: { [key: string]: number } = {
  '/clippy/clippy0.gif': 0, // Idle state
  '/clippy/clippy1.gif': 2650,
  '/clippy/clippy2.gif': 2250,
  '/clippy/clippy3.gif': 4500,
  '/clippy/clippy4.gif': 8100,
  '/clippy/clippy5.gif': 8400,
  '/clippy/clippy6.gif': 13600,
}

export const FORM_LINK = 'https://forms.gle/MKQ2efd1m7YxGZaR9'

export const INSTAGRAM_LINK = 'https://www.instagram.com/ruadebaixoloja/'

export const WHATSAPP_GROUP_ID = '120363159389024765@g.us'
// ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 clippy6.gif