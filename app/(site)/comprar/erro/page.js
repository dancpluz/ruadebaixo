import { CenterScreen } from 'components/styles/OtherStyles.styled';

export const metadata = {
  title: 'Erro',
  description: 'Infelizmente ocorreu algum erro inesperado',
}



export default function ErrorPage() {
  return (
    <CenterScreen>
      <div>
        <h1>Infelizmente ocorreu algum erro inesperado</h1>
        <p>Por Favor, mande mensagem para nosso whatsapp</p>
      </div>
    </CenterScreen>
  )
}
