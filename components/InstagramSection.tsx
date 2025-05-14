'use client'

import { useGeneratorContext } from '@/hooks/useGeneratorContext';
import InstagramCard from './InstagramCard';
import { shuffleArray } from '@/lib/utils';

export default function InstagramSection() {
  const { artists, pagination } = useGeneratorContext()

  const currentSlice = (pagination + 1) * 9;

  const artistSlice = shuffleArray(artists).slice(0, currentSlice);
  
  return (
    <div className='relative'>
      {artistSlice.map((artist, index) => (
        <div
          key={`${artist.id}-${artist.insta}`}
          className="h-screen flex items-start justify-center sticky top-0 py-4"
          style={{
            // transform: `calc(-5vh + ${index * 40}px)`,
            transform: `translateX(${index * 10}px) translateY(${index * 20}px)`,
          }}
        >
          <InstagramCard
            key={`${artist.id} - ${artist.insta}`}
            insta={artist.insta}
          />
        </div>
      ))}
    </div>
  )
}