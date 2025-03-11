'use client'

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-accent/10 animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
