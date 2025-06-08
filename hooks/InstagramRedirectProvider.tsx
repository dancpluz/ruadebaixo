'use client'
import React from 'react'
import { useEffect, useState } from 'react';

export default function InstagramRedirectProvider({ children }: { children: React.ReactNode }) {
  const [showBanner, setShowBanner] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Only run this check once
    if (hasChecked) return;

    // Detect Instagram in-app browser
    const isInstagramBrowser = /Instagram.*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent) ||
      /Instagram.*Android/i.test(navigator.userAgent);

    if (isInstagramBrowser) {
      setShowBanner(true);
    }

    setHasChecked(true);
  }, [hasChecked]);

  const handleOpenInBrowser = () => {
    // Get the current full URL
    const currentUrl = window.location.href;

    // iOS
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // Try to open in Chrome first
      window.location.href = `googlechrome://navigate?url=${encodeURIComponent(currentUrl)}`;

      // Fallback to Safari after a brief delay
      setTimeout(() => {
        window.location.href = `safari-${currentUrl}`;
      }, 300);
    }
    // Android
    else {
      // Try Chrome intent
      window.location.href = `intent://${currentUrl.replace('https://', '')}#Intent;package=com.android.chrome;scheme=https;end`;

      // Fallback after delay
      setTimeout(() => {
        window.location.href = `intent://${currentUrl.replace('https://', '')}#Intent;scheme=https;package=org.mozilla.firefox;end`;
      }, 300);
    }
  };

  return (
    <>
      {showBanner && (
        <div className="fixed top-0 left-0 w-full p-4 bg-blue-500 text-white text-center z-[10000] font-sans shadow-md">
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-4 border-none p-2 text-red-500 text-xl cursor-pointer hover:opacity-75 flex items-center justify-center size-7"
          >
            ×
          </button>

          <div className="mb-3">
            Para uma melhor experiência, abra este site no seu navegador padrão.
          </div>

          <button
            onClick={handleOpenInBrowser}
            className="text-foreground border-none rounded px-4 py-2 cursor-pointer font-bold transition-colors"
          >
            Abrir no Navegador
          </button>
        </div>
      )}

      <div className={`transition-all duration-300 ${showBanner ? 'mt-20' : 'mt-0'}`}>
        {children}
      </div>
    </>
  );
}