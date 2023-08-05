import Card from "@/components/Card";
import LandingBanner from "@/components/LandingBanner";
import Strip from "@/components/Strip";
import Tag from "@/components/Tag";

export const metadata = {
  title: {
    absolute: 'Rua de Baixo',
  }
}

export default function Home() {

  return (
    <div>
      <LandingBanner />
      <Strip text={"RUA DE BAIXO - "} />
      {/* <Card product={product1} /> */}
    </div>
  )
}
