'use client'

import { useGeneratorContext } from '@/hooks/useGeneratorContext';
import InstagramCard from './InstagramCard';

export default function InstagramSection() {
  const { artists, pagination } = useGeneratorContext()

  const artistSlice = artists.slice(0, (pagination + 1) * 9)

  return (
    <div className='flex items-center gap-4 justify-center text-background bg-foreground'>
      {artistSlice.map(artist => (
        <InstagramCard
          key={`${artist.id} - ${artist.insta}`}
          insta={artist.insta}
        />
      ))}

    </div>
  )
}