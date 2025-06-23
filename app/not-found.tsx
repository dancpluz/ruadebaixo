import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-pixelated tracking-wider">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8 font-bold">Página não encontrada</p>
      <Link href="/">
        <button className="text-xl text-foreground px-4 py-2">
          Voltar para o início
        </button>
      </Link>
    </div>
  );
}
