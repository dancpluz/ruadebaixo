"use client";

import { ThemeProvider } from "next-themes";
import PostHogProvider from '@/app/posthog'
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <ThemeProvider attribute="data-theme"
        defaultTheme="system"
        enableSystem
      >
        <Toaster />
        {children}
      </ThemeProvider>
    </PostHogProvider>
  );
}