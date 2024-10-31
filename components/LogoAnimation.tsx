'use client'

import { useWindowScroll } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { create } from 'zustand';
import Image from 'next/image';

interface FrameStore {
  currentFrame: number;
  setCurrentFrame: (frame: number) => void;
}

export const useFrameStore = create<FrameStore>((set) => ({
  currentFrame: 0,
  setCurrentFrame: (frame: number) => set({ currentFrame: frame }),
}));

const FRAME_COUNT = 30; // Total number of frames
const SCROLL_RANGE = 1500; // The range of y-scroll position to consider for the animation

export default function LogoAnimation() {
  const [{ y }] = useWindowScroll();
  const { currentFrame, setCurrentFrame } = useFrameStore();

  useEffect(() => {
    if (y !== null) {
      // Calculate the scroll percentage beyond the first loop (no clamping)
      const scrollPercentage = y / SCROLL_RANGE;

      // Calculate the new frame with a looping effect using modulo
      const newFrame = Math.floor(scrollPercentage * FRAME_COUNT) % FRAME_COUNT;

      // Update the current frame in state
      setCurrentFrame(newFrame);
    }
  }, [y, setCurrentFrame]);

  const frames = Array.from({ length: FRAME_COUNT }, (_, i) => (
    <Image
      key={i}
      src={`/anim/anisite${String(i).padStart(4, '0')}.webp`}
      alt={`Animação Logo Frame ${i}`}
      width={280}
      height={320}
      className={`absolute top-0 left-0 object-fit w-full h-full ${i === currentFrame ? "opacity-100" : "opacity-0"}`}
      priority={i === 0}
    />
  ));

  return (
    <div className='fixed top-1/2 left-1/2 lg:size-64 mix-blend-lighten sm:mix-blend-normal size-48 transform -translate-x-1/2 -translate-y-1/2 -z-10'>
      {frames}
    </div>
  );
}
