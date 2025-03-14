'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import CopyButton from "./CopyButton";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import DeleteButton from "./DeleteButton";
import SearchInvites from "./SearchInvites";

// Tipo baseado na estrutura do convite observada no código
interface Invite {
  id: number;
  documentId: string;
  name: string;
  key: string;
  confirmed: boolean;
  confirmed_at?: string;
}

interface InvitesListProps {
  invites: Invite[];
}

export default function InvitesList({ invites }: InvitesListProps) {
  const [filteredInvites, setFilteredInvites] = useState<Invite[]>(invites);

  const handleSearch = (term: string) => {
    if (!term) {
      setFilteredInvites(invites);
      return;
    }

    const lowerCaseTerm = term.toLowerCase();
    const filtered = invites.filter(invite => 
      invite.name.toLowerCase().includes(lowerCaseTerm)
    );
    
    setFilteredInvites(filtered);
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Lista de Convites</CardTitle>
            <CardDescription>
              Todos os convites criados e seus status
            </CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            Exibindo {filteredInvites.length} de {invites.length} convites
          </div>
        </div>
        <SearchInvites onSearch={handleSearch} />
      </CardHeader>
      <CardContent>
        {filteredInvites.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum convite encontrado com esse nome.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInvites.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{invite.name}</p>
                  <p className={`text-sm ${invite.confirmed ? 'text-green-500/50' : 'text-foreground/50'}`}>
                    {invite.confirmed && invite.confirmed_at
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
                      href={`/convite/${invite.key}`}
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
        )}
      </CardContent>
    </Card>
  );
} 