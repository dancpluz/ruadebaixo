'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle } from 'lucide-react'
import { sendMessageToGroupError } from '@/app/actions/zapbot'
import { getUserIP } from '@/app/actions/other'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { toast } = useToast()

  useEffect(() => {
    const sendLog = async () => {
      const userIp = await getUserIP()
      const errorMessage = `[${userIp}] *OCORREU UM ERRO NO SITE:*\n⚠️ ${error.message}\n🌲 ${error.stack}`
      await sendMessageToGroupError(errorMessage)
    }
    sendLog()
  }, [error])

  const handleSubmit = async (formData: FormData) => {
    try {
      const userIp = await getUserIP()
      const message = formData.get('feedback') as string
      await sendMessageToGroupError(`[${userIp}] *UM USUÁRIO ANÔNIMO ENVIOU:*\n${message}`);

      toast({
        title: "Feedback Enviado",
        description: "Obrigado por informar qual foi o seu erro, em breve vamos corrigir.",
      })
    } catch {
      toast({
        title: "Erro ao enviar feedback",
        description: "Ocorreu um erro ao enviar o feedback. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="flex flex-col flex-1 gap-8 items-center justify-center overflow-hidden p-5">
      <Card className="w-full max-w-lg">
        <CardHeader className='pb-4'>
          <CardTitle className="flex items-center gap-2">
            <div className="size-8">
              <AlertCircle className="size-8" />
            </div>
            <span className='text-2xl uppercase clash grow'>Aconteceu um erro inesperado</span>
          </CardTitle>
          <CardDescription className='text-sm uppercase'>
            Perdão pelo incômodo, se puder nos fale o que aconteceu.
          </CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <Label className="uppercase" htmlFor="feedback">O que você estava tentando fazer?</Label>
              <Textarea id="feedback" name="feedback" placeholder="Eu acessei a página..." />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => reset()}>TENTAR NOVAMENTE</Button>
            <Button type="submit">ENVIAR</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}