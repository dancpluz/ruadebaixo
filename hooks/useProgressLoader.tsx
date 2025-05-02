'use client'

import { useState, useEffect } from 'react'

interface ProgressLoaderProps {
  steps?: number[];
  interval?: number;
  initialLoadingState?: boolean;
}

export default function useProgressLoader(options: ProgressLoaderProps = {}) {
  const {
    steps = [25, 50, 75, 100],
    interval = 750,
    initialLoadingState = true
  } = options;

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(initialLoadingState);

  useEffect(() => {
    let currentStep = 0;
    let timeoutId: NodeJS.Timeout;

    const nextStep = () => {
      if (currentStep < steps.length) {
        // Add +/- 20% randomness to interval
        const randomFactor = 0.5 * (Math.random() * 2 - 1); // Between -0.2 and +0.2
        const randomizedInterval = interval * (1 + randomFactor);

        setProgress(steps[currentStep]);
        currentStep++;

        // Schedule next step with new random interval
        timeoutId = setTimeout(nextStep, Math.max(200, randomizedInterval)); // Minimum 300ms
      } else {
        setIsLoading(false);
      }
    };

    // Start the progression
    nextStep();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading]);

  const resetLoading = () => {
    setProgress(0);
    setIsLoading(true);
  };

  return { progress, isLoading, setIsLoading, resetLoading };
};