import { useCallback, useState } from 'react';

export const useShowElement = () => {
  const [isShowed, setIsShowed] = useState<boolean>(false);

  const open = useCallback(() => {
    setIsShowed(true);
  }, []);

  const close = useCallback(() => {
    setIsShowed(false);
  }, []);

  return { isShowed, open, close };
};

export type ShowableElement = ReturnType<typeof useShowElement>
