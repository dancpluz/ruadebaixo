'use client'

import InstagramRedirectProvider from '@/hooks/InstagramRedirectProvider'
import { GeneratorProvider } from '@/hooks/useGeneratorContext'
import { ArtistEntity } from '@/types/strapi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient()

export default function Providers({ children, initialArtists }: { children: React.ReactNode, initialArtists: ArtistEntity[] }) {
  return (
    <InstagramRedirectProvider>
      <GeneratorProvider initialArtists={initialArtists}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
      </GeneratorProvider>
    </InstagramRedirectProvider>
  )
}
