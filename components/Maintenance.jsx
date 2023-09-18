import { CenterScreen } from '@/components/styles/OtherStyles.styled';
import { Logo } from '@/components/styles/LinksPage.styled';
import logo from '@/public/assets/logonew.svg';
import Link from 'next/link';
import { fetchMaintenanceText } from '@/lib/config';


export default async function Maintenance() {
  const text = await fetchMaintenanceText()

  return (
    <CenterScreen>
      <Link href={'/links'}>
        <div>
          <Logo priority src={logo} alt={'Rua de Baixo Logo'} />
          <h2>Site em Manutenção</h2>
          <p>{text}</p>
        </div>
      </Link>
    </CenterScreen>
  )
}
