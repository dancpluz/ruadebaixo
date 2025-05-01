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

    const timerInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(timerInterval);
        setIsLoading(false);
      }
    }, interval);

    return () => clearInterval(timerInterval);
  }, [isLoading]);

  const resetLoading = () => {
    setProgress(0);
    setIsLoading(true);
  };

  return { progress, isLoading, setIsLoading, resetLoading };
};