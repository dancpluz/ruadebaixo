import { z } from "zod";

export const invitationFormSchema = z.object({
  phone: z
    .string()
    .max(20, { message: "Número muito longo (máx. 20 dígitos)" })
    .optional().or(z.literal("")),
  insta: z
    .string()
    .max(30, { message: "Instagram muito longo (máx. 30 caracteres)" })
    .refine((value) => !value.includes(" "), { message: "Não pode conter espaços" })
    .or(z.literal("")),
})

export type InvitationFormValues = z.infer<typeof invitationFormSchema>
