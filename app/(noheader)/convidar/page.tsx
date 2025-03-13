import { fetchInvites } from "@/app/actions/db/read";
import { createInvites } from "@/app/actions/db/create";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import CopyButton from "@/app/(noheader)/convidar/CopyButton";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import CreateInvitesForm from "./CreateInvitesForm";
import DeleteButton from "./DeleteButton";

export const metadata = {
  title: "Convidar",
  description: "Criar convites em lote",
};

export const dynamic = 'force-dynamic';

export default async function Convidar() {
  const invitesResult = await fetchInvites();
  const invites = invitesResult.isOk() ? invitesResult.value.data : [];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Criar Convites em Lote</CardTitle>
          <CardDescription>
            Digite um nome por linha para criar múltiplos convites
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateInvitesForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Convites</CardTitle>
          <CardDescription>
            Todos os convites criados e seus status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invites.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{invite.name}</p>
                  <p className={`text-sm ${invite.confirmed ? 'text-green-500/50' : 'text-foreground/50'}`}>
                    {invite.confirmed
                      ? `Confirmado em ${format(new Date(invite.confirmed_at), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}`
                      : "Não confirmado"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value={`${process.env.NEXT_PUBLIC_APP_URL}/convite/${invite.key}`}
                    className="w-[300px]"
                  />
                  <CopyButton
                    value={`${process.env.NEXT_PUBLIC_APP_URL}/convite/${invite.key}`}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="h-10 w-10"
                  >
                    <Link 
                      href={`${process.env.NEXT_PUBLIC_APP_URL}/convite/${invite.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteButton 
                    documentId={invite.documentId} 
                    name={invite.name} 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
