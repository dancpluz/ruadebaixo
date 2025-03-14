import { fetchInvite, fetchInvites } from "@/app/actions/db/read";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import FormInvite from "./FormInvite";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
    ? `${name} - Presença Confirmada | Festa Secreta`
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

export async function generateStaticParams() {
  // Busca todos os convites do banco de dados
  const invitesResult = await fetchInvites();
  
  // Se houver erro na busca, retorna uma lista vazia
  if (invitesResult.isErr()) {
    console.error('Erro ao buscar convites para geração estática:', invitesResult.error.message);
    return [];
  }
  
  // Extrai os dados dos convites
  const invites = invitesResult.value.data;
  
  // Mapeia cada convite para o formato esperado pelo generateStaticParams
  // Cada objeto deve ter a mesma estrutura que o params da página
  // Neste caso, apenas a propriedade 'key' é necessária
  return invites.map(invite => ({
    key: invite.key
  }));
}

export default async function Convite({ params }: { params: Promise<{ key: string }> }) {
  const paramKey = (await params).key;

  const invitation = await fetchInvite(paramKey);

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
  const { documentId, key: inviteKey, name, confirmed, confirmed_at, whatsapp, insta } = invite;
  
  if (!invite) {
    // Redundância extra para garantir que não há convite
    redirect('/convite');
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="w-full rounded-none gap-4 max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl">Oi {name}!</CardTitle>
          <CardDescription>
            {confirmed 
              ? "Sua presença foi confirmada para a festa secreta da Rua de Baixo"
              : "Você foi convidado para a festa secreta da Rua de Baixo"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {confirmed ? (
            <div className="space-y-4">
              <div className="bg-green-950/30 border border-green-900/50 p-4 rounded-lg">
                <p className="text-green-400 font-medium mb-1">Presença confirmada!</p>
                <p className="text-sm text-green-500/80">
                  Confirmada em {format(new Date(confirmed_at), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                </p>
                
                {/* Mostre os dados de contato se foram fornecidos */}
                <div className="mt-3 pt-3 border-t border-green-900/30 text-sm space-y-1">
                  {whatsapp && (
                    <p>Seu WhatsApp: {whatsapp}</p>
                  )}
                  {insta && (
                    <p>Seu Instagram: {insta}</p>
                  )}
                </div>
              </div>
              <div className="text-sm text-center text-zinc-400 mt-4">
                <p>Fique de olho no seu WhatsApp/Instagram.</p>
                <p>Enviaremos mais informações em breve!</p>
              </div>
            </div>
          ) : (
              <FormInvite inviteKey={inviteKey} documentId={documentId} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}