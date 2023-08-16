import LandingBanner from "@/components/LandingBanner";
import LandingProducts from "@/components/LandingProducts";
import Strip from "@/components/Strip";

export const metadata = {
  title: {
    absolute: 'Rua de Baixo',
  }
}

export const revalidate = 30;

export default function Home() {
  return (
    <div>
      <LandingBanner />
      <Strip text={"RUA DE BAIXO - "} />
      <LandingProducts />
    </div>
  )
}
