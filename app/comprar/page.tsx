import CartItems from "@/components/CartItems";
import CheckoutForm from "@/components/CheckoutForm";
// import { sendMessageToClient } from "@/app/actions/zapbot";
// import { simulateShipping } from "../actions/kangu";

export const metadata = {
  title: "FINALIZAR COMPRA",
  description: "Página para finalizar a compra com opções de pagamento e detalhes do carrinho.",
  keywords: ["compra", "pagamento", "carrinho", "checkout"],
};

export default async function Checkout() {
  return (
    <main className='flex flex-col flex-1 gap-8 md:gap-0'>
      <h1 className='text-5xl p-5 md:p-12 clash border-b border-foreground'>Finalizar Compra</h1>
      <div className='flex flex-col first:py-8 md:flex-row gap-8 grow'>
        <div className='md:py-8 grow flex justify-center'>
          <CartItems />
        </div>
        <CheckoutForm />
      </div>
    </main>
  )
}