import { useCallback, useState } from 'react';

export const useShowElement = (initialShowed = false) => {
  const [isShowed, setIsShowed] = useState<boolean>(initialShowed);

  const open = useCallback(() => {
    setIsShowed(true);
  }, []);

  const close = useCallback(() => {
    setIsShowed(false);
  }, []);

  return { isShowed, open, close };
};

export type ShowableElement = ReturnType<typeof useShowElement>;
