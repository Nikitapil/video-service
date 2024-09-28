import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>(callback: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listenerFn = (e: MouseEvent) => {
      if (e.target !== ref.current && !ref.current?.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener('click', listenerFn);

    return () => document.removeEventListener('click', listenerFn);
  }, [callback]);

  return { ref };
};
