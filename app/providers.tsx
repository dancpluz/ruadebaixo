"use client";

import { ThemeProvider } from "next-themes";
import PostHogProvider from '@/app/posthog'
import { Toaster } from "@/components/ui/sonner";
import { GameProvider } from "@/hooks/useGameContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="system"
        enableSystem
      >
        <GameProvider>
          <Toaster />
          {children}
        </GameProvider>
      </ThemeProvider>
    </PostHogProvider>
  );
}