'use client';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useTransition } from "react";
import { z } from "zod";
import { createInvites } from "@/app/actions/db/create";
import { ApiError } from "@/types/errors";

const bulkInviteSchema = z.object({
  names: z.string().min(1, "Nome é obrigatório"),
}).transform((data) => {
  return data.names
    .split("\n")
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
});

/**
 * Formata e mostra um erro do Strapi usando o Sonner
 */
function showStrapiError(error: ApiError) {
  // Extrai informações relevantes do erro
  const { statusCode, details } = error;
  const message = error.getReadableMessage();
  
  // Verifica se temos detalhes específicos de validação
  if (details?.errors && Array.isArray(details.errors)) {
    // Cria uma lista de erros de validação
    const errorList = details.errors.map((err: any) => 
      err.path ? `${err.path.join('.')}: ${err.message}` : err.message
    );
    
    // Mostra o toast com a lista de erros
    toast.error("Erro de validação", {
      description: (
        <div className="mt-2 text-sm">
          <p className="font-medium">O servidor reportou os seguintes erros:</p>
          <ul className="list-disc pl-4 mt-1 space-y-1">
            {errorList.map((msg: string, idx: number) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      ),
      duration: 5000,
    });
  } 
  // Se tivermos um nome de erro específico
  else if (error.originalError && (error.originalError as any)?.error?.name) {
    const errorName = (error.originalError as any).error.name;
    
    // Mostra o toast com informações de erro classificadas
    toast.error(`Erro: ${errorName}`, {
      description: message,
      duration: 4000,
    });
  } 
  // Caso padrão: apenas mostra a mensagem
  else {
    toast.error("Erro ao criar convites", {
      description: message,
      duration: 4000,
    });
  }
}

export default function CreateInvitesForm() {
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    try {
      const result = bulkInviteSchema.safeParse({
        names: formData.get("names"),
      });

      if (!result.success) {
        toast.error("Por favor, insira pelo menos um nome", {
          description: "Insira um ou mais nomes, um por linha",
        });
        return;
      }

      const names = result.data;

      if (names.length === 0) {
        toast.error("Por favor, insira pelo menos um nome", {
          description: "Insira um ou mais nomes, um por linha",
        });
        return;
      }

      startTransition(async () => {
        try {
          const createResult = await createInvites(names);
          
          // Verifica o resultado da server action
          // Como é serializado, perdemos os métodos isOk/isErr
          // Então verificamos diretamente se há um campo 'error'
          if ('error' in createResult) {
            // Se tiver erro, mostra o erro
            showStrapiError(createResult.error as ApiError);
            return;
          }
          
          // Se não tiver erro, foi um sucesso
          toast.success(`${names.length} convite(s) criado(s) com sucesso!`, {
            description: names.length > 1 
              ? `Foram criados ${names.length} convites` 
              : `Foi criado 1 convite para ${names[0]}`,
          });
        } catch (error) {
          console.error("Erro ao criar convites:", error);
          toast.error("Erro ao criar convites", {
            description: "Houve um problema ao enviar os dados. Tente novamente.",
          });
        }
      });
    } catch (error) {
      console.error("Erro ao processar formulário:", error);
      toast.error("Erro ao processar formulário", {
        description: "Houve um problema ao processar seus dados. Tente novamente.",
      });
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="names">Nomes</Label>
        <Textarea
          id="names"
          name="names"
          placeholder="Digite um nome por linha"
          className="min-h-[200px]"
          disabled={isPending}
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Criando..." : "Criar Convites"}
      </Button>
    </form>
  );
} 