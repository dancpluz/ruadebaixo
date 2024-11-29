import CartItems from "@/components/CartItems";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "FINALIZAR COMPRA",
  description: "Página para finalizar a compra com opções de pagamento e detalhes do carrinho.",
  keywords: ["compra", "pagamento", "carrinho", "checkout"],
};

export default async function Checkout() {
  return (
    <main className='flex flex-col flex-1'>
      <h1 className='text-5xl p-5 md:p-12 clash border-b border-foreground'>Finalizar Compra</h1>
      <div className='flex flex-col md:pb-10 md:flex-row grow'>
        <div className='md:p-12 p-5 grow flex justify-center'>
          <CartItems />
        </div>
        <CheckoutForm />
      </div>
    </main>
  )
}