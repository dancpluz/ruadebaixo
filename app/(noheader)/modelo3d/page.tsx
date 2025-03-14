import Band from "./band";

export const metadata = {
  title: "Modelo 3D Interativo",
  description: "Experimente nosso modelo 3D interativo",
}

export default function ModeloPage() {
 
  return (
    <div className="fixed inset-0 w-full h-full">
      <Band />
    </div>
  )
} 