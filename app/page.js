import LandingBanner from "@/components/LandingBanner";
import LandingProducts from "@/components/LandingProducts";
import Strip from "@/components/Strip";
import Maintenance from "@/components/Maintenance";
import { checkMaintenanceMode } from '@/lib/config';

export const metadata = {
  title: {
    absolute: 'Rua de Baixo',
  }
}

export const revalidate = 60;

export const dynamic = 'force-dynamic';

export default async function Home() {
  
  if (await checkMaintenanceMode()) {
    return (<Maintenance />)
  }

  return (
    <div>
      <LandingBanner />
      <Strip text={"RUA DE BAIXO - "} />
      <LandingProducts />
    </div>
  )
}
