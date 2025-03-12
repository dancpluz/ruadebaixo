import { fetchGeneral } from '@/app/actions/db/read';
import LogoAnimation from '@/components/LogoAnimation'
import SocialIcons from '@/components/SocialIcons'

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "MANUTENÇÃO",
  description: "O site está em manutenção. Por favor, volte mais tarde.",
};

export default async function Maintenance() {
  let maintenanceText = 'No momento estamos melhorando o site para você';
  
  try {
    const { data } = await fetchGeneral();
    maintenanceText = data.maintenance_text || 'No momento estamos melhorando o site para você';
  } catch (error) {
    console.error(`Erro ao tentar puxar geral:`, error);
  }
  return (
    <main className="flex flex-col flex-1 justify-center items-center gap-2 px-5">
      <LogoAnimation />
      <h1 className="text-4xl text-center font-semibold uppercase clash">Estamos em Manutenção</h1>
      <p className="text-xl text-center text-muted-foreground mb-6 lg:mb-4">{maintenanceText}</p>
      <SocialIcons />
    </main>
  )
}