import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type GameContextType = {
  selectedGame: number | null;
  setSelectedGame: Dispatch<SetStateAction<number | null>>;
  backSide: boolean;
  setBackSide: Dispatch<SetStateAction<boolean>>;
};

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGame, setSelectedGame] = useState<GameContextType['selectedGame']>(null);
  const [backSide, setBackSide] = useState<GameContextType['backSide']>(false);

  return (
    <GameContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
        backSide,
        setBackSide
      }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};