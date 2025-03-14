import { fetchInvites } from "@/app/actions/db/read";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CreateInvitesForm from "./CreateInvitesForm";
import InvitesList from "./InvitesList";

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
      
      <InvitesList invites={invites} />
    </div>
  );
}
