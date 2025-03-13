import { fetchInvite } from "@/app/actions/db/read";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import FormInvite from "./FormInvite";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ key: string }> }) {
  const key = (await params).key;
  const invitation = await fetchInvite(key);
  if (invitation.isErr()) {
    return { title: 'Erro ao buscar convite' };
  }

  const invite = invitation.value.data[0];
  const { name, confirmed } = invite;

  const titleText = confirmed 
    ? ` ${name}- Presença Confirmada | Festa Secreta`
    : `${name} - Convite Festa Secreta`;

  const descriptionText = confirmed
    ? `${name} confirmou presença na festa secreta da Rua de Baixo`
    : `${name}, você foi convidado(a) para a festa secreta da Rua de Baixo`;

  return {
    title: titleText,
    description: descriptionText,
    openGraph: {
      title: titleText,
      description: descriptionText,
      // images: [
      //   { url: invite.image },
      // ],
    },
  };
}

export default async function Convite({ params }: { params: Promise<{ key: string }> }) {
  const key = (await params).key;

  const invitation = await fetchInvite(key);

  if (invitation.isErr()) {
    // Se o erro for 404 (convite não encontrado), redireciona para a página /convite
    if (invitation.error.statusCode === 404) {
      redirect('/convite');
    }
    
    // Para outros erros, exibe uma mensagem amigável
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Erro</h1>
        <p className="text-center">Não foi possível obter os detalhes do seu convite.</p>
        <p className="text-sm text-muted-foreground mt-4">Tente novamente mais tarde ou entre em contato conosco.</p>
      </div>
    );
  }

  const invite = invitation.value.data[0];
  const { documentId, name, confirmed } = invite;
  
  if (!invite) {
    // Redundância extra para garantir que não há convite
    redirect('/convite');
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="w-full gap-4 max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl">Oi {name}!</CardTitle>
          <CardDescription>Você foi convidado para a festa secreta da Rua de Baixo</CardDescription>
        </CardHeader>
        <CardContent>
          <FormInvite documentId={documentId} />
        </CardContent>
      </Card>
    </div>
  );
}