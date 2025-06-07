'use client'

import { getRandomArrayElement } from '@/lib/utils';
import { ArtistEntity } from '@/types/strapi';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GeneratorContextType {
  clippyAnimation: string;
  setClippyAnimation: React.Dispatch<React.SetStateAction<string>>;
  artists: ArtistEntity[];
  setArtists: React.Dispatch<React.SetStateAction<ArtistEntity[]>>;
  currentArtist?: ArtistEntity;
  setCurrentArtist: React.Dispatch<React.SetStateAction<ArtistEntity | undefined>>;
  selectRandomArtist: () => void;
  pagination: number;
  setPagination: React.Dispatch<React.SetStateAction<number>>;
}

const GeneratorContext = createContext<GeneratorContextType | undefined>(undefined);

interface GeneratorProviderProps {
  children: ReactNode;
  initialArtists?: ArtistEntity[];
}

export const GeneratorProvider = ({ children, initialArtists }: GeneratorProviderProps) => {
  const [clippyAnimation, setClippyAnimation] = useState<GeneratorContextType['clippyAnimation']>('');
  const [artists, setArtists] = useState<GeneratorContextType['artists']>(initialArtists || []);
  const [currentArtist, setCurrentArtist] = useState<GeneratorContextType['currentArtist']>(undefined);
  const [pagination, setPagination] = useState(0);

  function selectRandomArtist() {
    if (artists.length === 0) return null;
    setCurrentArtist(getRandomArrayElement(artists, currentArtist?.id));
  }

  return (
    <GeneratorContext.Provider value={{
      clippyAnimation,
      setClippyAnimation,
      artists,
      setArtists,
      currentArtist,
      setCurrentArtist,
      selectRandomArtist,
      pagination,
      setPagination,
    }}>
      {children}
    </GeneratorContext.Provider>
  );
};

export const useGeneratorContext = (): GeneratorContextType => {
  const context = useContext(GeneratorContext);
  if (!context) {
    throw new Error('useGeneratorContext must be used within an GeneratorProvider');
  }
  return context;
};