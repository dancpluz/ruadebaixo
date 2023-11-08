import BuyForm from "@/components/BuyForm";

export const metadata = {
  title: 'Finalizar Compra',
  description: 'Preencha e faça seu pedido aqui!',
  alternates: {
    canonical: '/comprar',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function Home() {
  return (
      <BuyForm />
  )
}
