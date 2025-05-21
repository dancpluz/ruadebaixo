'use client'
import React from 'react'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function InstagramRedirectProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Detect Instagram in-app browser
    const isInstagramBrowser = /Instagram.*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent) ||
      /Instagram.*Android/i.test(navigator.userAgent);
    if (isInstagramBrowser) {
      // For iOS/Android native browser redirection
      const url = `https://ia.ruadebaixo.com.br${pathname}`;

      // iOS
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = `googlechrome://${url}`;
        window.location.href = `firefox://open-url?url=${url}`;
        window.location.href = url; // Fallback
      }
      // Android
      else {
        window.location.href = `intent://${url}#Intent;package=com.android.chrome;scheme=https;end`;
        window.location.href = `intent://${url}#Intent;scheme=https;package=org.mozilla.firefox;end`;
        window.location.href = url; // Fallback
      }
    }
  }, [pathname]);

  return children;
}
