"use client";

import { ThemeProvider } from "next-themes";
import PostHogProvider from '@/app/posthog'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <ThemeProvider attribute="data-theme"
        defaultTheme="system"
        enableSystem
      >
        {children}
      </ThemeProvider>
    </PostHogProvider>
  );
}