import { useEffect, useRef } from 'react';

export const useScrollBottom = <T extends HTMLElement, K>(watchValue: K) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({ top: ref.current.scrollHeight });
    }
  }, [watchValue]);

  return ref;
};
