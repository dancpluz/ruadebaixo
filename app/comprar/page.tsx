import { createCustomer, getParcelOptions, createPayment, getPixQR } from "@/app/actions/asaas";
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



  const customer = await createCustomer({ cpf: '05749091171', name: 'JUAN PABLO' });

  const payment = await getParcelOptions(100, 12);

  // async function sendMessage(formData: FormData) {
  //   'use server'
  //   const message = formData.get('message') as string;
  //   const data = await sendMessageToClient(message, '61998118398');
  //   console.log(data);
  // }

  async function btnCreatePayment(formData: FormData) {
    'use server'
    const cobranca = await createPayment({
      cpf: '05749091171',
      billingType: 'CREDIT_CARD',
      value: 32,
      installmentCount: 2,
      description: 'Teste de pagamento2'
    })

    console.log(cobranca)
    const qrCode = await getPixQR(cobranca.id);
  }


  return (
    <div className='text-xl w-screen'>
      <pre>
        {customer ? JSON.stringify(customer, null,  2) : ''}
      </pre>
      <form action={btnCreatePayment}>
        <input type="text" name="message" />
        <button>
          Teste
        </button>

      </form>
      {/* {qrCode ? (
        // Render the image using Base64 data
        <Image
          src={`data:image/png;base64,${qrCode.encodedImage}`}
          alt="Fetched Image"
          width={500}
          height={300}
        />
      ) : (
        <p>Loading image...</p>
      )} */}
      
      <pre>
        {payment ? JSON.stringify(payment, null, 2) : ''}
      </pre>
    </div>
  )
}