'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from '@/app/Context'
import { Skeleton } from "@/components/ui/skeleton"

export default function Countdown() {
  const  timeLeft = useCart(({ timeLeft }) => timeLeft)
  const calculateTimeLeft = useCart(({ calculateTimeLeft }) => calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft()
    }, 1000)

    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  const shouldShowUnit = (unit: string, value: number): boolean => {
    switch (unit) {
      case 'dias':
        return value > 0
      case 'horas':
        return value > 0 || timeLeft.dias > 0
      case 'minutos':
        return value > 0 || timeLeft.horas > 0 || timeLeft.dias > 0
      case 'segundos':
        return value > 0 || timeLeft.minutos > 0 || timeLeft.horas > 0 || timeLeft.dias > 0
      default:
        return false
    }
  }

  const timeComponents = Object.entries(timeLeft)
    .filter(([unit, value]) => shouldShowUnit(unit, value))
    .map(([interval, value]) => (
      <Card key={interval} className="grow border-0 p-4 rounded-none outline outline-foreground outline-1 text-center bg-background/80">
        <CardHeader className="p-0">
          <CardTitle className="text-5xl font-medium clash">{value}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-md uppercase">{value === 1 ? interval.slice(0, -1) : interval}</p>
        </CardContent>
      </Card>
    ));

  return (
    <div className="fixed bottom-0 flex flex-wrap w-full justify-center">
      {Object.values(timeLeft).some(value => value > 0) ? timeComponents : 
      Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="grow h-[106px] rounded-none border bg-background/80" />
      ))}
    </div>
  );
}