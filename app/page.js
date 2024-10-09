import LandingBanner from "@/components/LandingBanner";
import LandingProducts from "@/components/LandingProducts";
import Strip from "@/components/Strip";
import Maintenance from "@/components/Maintenance";
import { checkMaintenanceMode } from '@/lib/config';
import { fetchLandingImages } from '@/lib/api';
import { CenterScreen } from '@/components/styles/OtherStyles.styled';

export const metadata = {
  title: 'Rua de Baixo',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
}

export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function Home() {

  return (
    <CenterScreen>
      <h1 style={{color: 'white'}}>Ex umbra in solem.</h1>
    </CenterScreen>
  )
  
  if (await checkMaintenanceMode()) {
    return (<Maintenance />)
  }

  const { title,images } = await fetchLandingImages();

  return (
    <div>
      <LandingBanner images={images} />
      <Strip text={"RUA DE BAIXO - "} />
      <LandingProducts title={title} />
    </div>
  )
}
