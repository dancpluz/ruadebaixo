import { CenterScreen } from 'components/styles/OtherStyles.styled';

export const metadata = {
  title: 'Sucesso',
  description: 'Seu pedido foi feito com sucesso!',
}


export default function SuccessPage() {
  return (
    <CenterScreen>
      <div>
        <h1>Seu pedido foi feito!</h1>
        <p>Verifique o seu whatsapp que em breve entraremos em contato</p>
      </div>
    </CenterScreen>
  )
}
