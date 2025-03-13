"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      position="top-right"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-background)",
          "--normal-text": "var(--color-foreground)",
          "--normal-border": "var(--color-foreground)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
