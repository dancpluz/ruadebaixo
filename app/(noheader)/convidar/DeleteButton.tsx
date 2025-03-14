'use client';

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteInvite } from "@/app/actions/db/delete";
import { ApiError } from "@/types/errors";

interface DeleteButtonProps {
  documentId: string;
  name: string;
}

/**
 * Formata e mostra um erro do Strapi usando o Sonner
 */
function showStrapiError(error: ApiError) {
  // Extrai informações relevantes do erro
  const { message, statusCode, details } = error;
  
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
    toast.error("Erro ao excluir convite", {
      description: message,
      duration: 4000,
    });
  }
}

export default function DeleteButton({ documentId, name }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Tem certeza que deseja excluir o convite para "${name}"?`)) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await deleteInvite(documentId);

        // Verifica o resultado da server action
        // Como é serializado, verificamos diretamente se há um campo 'error'
        if ('error' in result) {
          // Se tiver erro, mostra o erro
          showStrapiError(result.error as ApiError);
          return;
        }
        
        // Se não tiver erro, foi um sucesso
        toast.success("Convite excluído", {
          description: `O convite para "${name}" foi excluído com sucesso.`,
        });
      } catch (error) {
        console.error("Erro ao excluir convite:", error);
        toast.error("Erro ao excluir convite", {
          description: "Ocorreu um erro ao tentar excluir o convite.",
        });
      }
    });
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      className="h-10 w-10 text-destructive hover:bg-destructive/10"
      title="Excluir convite"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
} 