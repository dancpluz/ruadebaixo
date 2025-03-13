'use client';

import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Button } from "@/components/ui/button";
import { invitationFormSchema } from "@/lib/validations";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

export default function FormInvite({ documentId }: { documentId: string }) {
  const form = useForm<z.infer<typeof invitationFormSchema>>({
    resolver: zodResolver(invitationFormSchema),
    defaultValues: {
      phone: "",
      insta: "",
    },
  })

  async function onSubmit(values: z.infer<typeof invitationFormSchema>) {
    console.log(values)
    //setIsSubmitting(true)

    //await confirmAttendance(invitationId, values.phone, values.insta)

    //setIsSubmitting(false)
    //router.refresh()
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="phone"
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
                  label="Instagram"
                  className="bg-background"
                  {...field}
                />
              </FormControl>
              <FormDescription>Vamos mandar porras no whatsapp</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Confirming..." : "Confirm Attendance"}
        </Button>
      </form>
    </Form>
  );
}

