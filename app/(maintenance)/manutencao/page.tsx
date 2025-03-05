import { fetchFromStrapi } from '@/app/actions/strapi';
import LogoAnimation from '@/components/LogoAnimation'
import SocialIcons from '@/components/SocialIcons'
import { Home } from '@/types/api/home';

export const metadata = {
  title: "MANUTENÇÃO",
  description: "O site está em manutenção. Por favor, volte mais tarde.",
};

export default async function Maintenance() {
  // const data = await fetchFromStrapi<Home>('home', true);
  // const maintenanceText = data.data?.attributes?.texto_manutencao || 'No momento estamos melhorando o site para você';

  return (
    <main className="flex flex-col flex-1 justify-center items-center gap-2 px-5">
      <LogoAnimation />
      <h1 className="text-4xl text-center font-semibold uppercase clash">Estamos em Manutenção</h1>
      <p className="text-xl text-center text-muted-foreground mb-6 lg:mb-4">{'maintenanceText'}</p>
      <SocialIcons />
    </main>
  )
}