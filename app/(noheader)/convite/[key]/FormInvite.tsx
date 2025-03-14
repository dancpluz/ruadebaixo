'use client';

import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Button } from "@/components/ui/button";
import { invitationFormSchema } from "@/lib/validations";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { confirmInvite } from "@/app/actions/db/update";
import { toast } from "sonner"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { INSTA_MASK, PHONE_MASK } from "@/lib/const";

export default function FormInvite({ inviteKey, documentId }: { inviteKey: string, documentId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof invitationFormSchema>>({
    resolver: zodResolver(invitationFormSchema),
    defaultValues: {
      whatsapp: "",
      insta: "",
    },
  })

  async function onSubmit(values: z.infer<typeof invitationFormSchema>) {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const result = await confirmInvite({ 
        inviteKey, 
        documentId, 
        whatsapp: values.whatsapp, 
        insta: values.insta
      });
      
      if (result.success) {
        toast.success('Presença confirmada com sucesso!');
        // Recarregar a página para mostrar o estado atualizado
        router.refresh();
      } else {
        // Tratamento do erro que veio do servidor
        const errorMessage = result.error?.message || 'Erro desconhecido';
        toast.error(`Erro ao confirmar presença: ${errorMessage}`);
        console.error('Erro ao confirmar presença:', result.error);
      }
    } catch (error) {
      // Tratamento de erro inesperado no cliente
      toast.error('Ocorreu um erro inesperado ao confirmar a presença');
      console.error('Erro inesperado:', error);
    } finally {
      setIsSubmitting(false);
    }
  }
  
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="whatsapp"
                  mask={PHONE_MASK}
                  label="Whatsapp"
                  className="bg-background"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insta"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="insta"
                  mask={INSTA_MASK}
                  label="Instagram"
                  className="bg-background"
                  {...field}
                />
              </FormControl>
              <FormDescription>Vamos mandar informações pelo WhatsApp/Instagram</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Confirmando..." : "Confirmar Minha Presença"}
        </Button>
      </form>
    </Form>
  );
}

