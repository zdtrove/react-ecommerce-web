import { useEffect, useState } from 'react';

export type WindowSize = {
  width: number | undefined;
};

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined
  });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth
    });

    function handleResize() {
      setWindowSize({
        width: window.innerWidth
      });
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
