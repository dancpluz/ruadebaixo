import { useEffect, useCallback, useRef } from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) => {
  const callbackRef = useRef(callback);
  const listeningRef = useRef(false);

  // Update callback reference if callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleClick = useCallback(
    (evt: MouseEvent | TouchEvent) => {
      if (ref.current?.contains(evt.target as Node)) return;
      callbackRef.current();
    },
    [ref]
  );

  useEffect(() => {
    if (listeningRef.current) return;
    listeningRef.current = true;

    const events: Array<'click' | 'touchstart'> = ['click', 'touchstart'];
    events.forEach((type) => {
      document.addEventListener(type, handleClick);
    });

    return () => {
      listeningRef.current = false;
      events.forEach((type) => {
        document.removeEventListener(type, handleClick);
      });
    };
  }, [handleClick]);
};