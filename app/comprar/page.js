import BuyForm from "@/components/BuyForm";

export const metadata = {
  title: 'Finalizar Compra',
  description: 'Preencha e faça seu pedido aqui!',
  alternates: {
    canonical: '/comprar',
  },
}

export default function Home() {
  return (
      <BuyForm />
  )
}
