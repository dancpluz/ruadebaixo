import { CenterScreen } from '@/components/styles/OtherStyles.styled';

export const metadata = {
  title: '404',
  description: 'A página que você está procurando não existe',
}

export default function NotFound() {
  return (
    <CenterScreen>
      <div>
        <h1>Erro 404</h1>
        <p>A página que você está procurando não foi encontrada</p>
      </div>
    </CenterScreen>
  )
}