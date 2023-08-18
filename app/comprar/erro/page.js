import { CenterScreen } from '@/components/styles/OtherStyles.styled';

export const metadata = {
  title: 'Erro',
  description: 'Infelizmente ocorreu algum erro inesperado',
}

export default function ErroPage() {
  return (
    <CenterScreen>
      <div>
        <h1>Infelizmente seu pedido não foi concluído</h1>
        <p>Por Favor, mande mensagem para nosso whatsapp</p>
      </div>
    </CenterScreen>
  )
}
