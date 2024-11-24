import { useCallback, useEffect, useState } from 'react';

export type TUsewindowDimensions = {
  width: number | null;
  height: number | null;
  isMobile: boolean | null;
};

export function useWindowDimensions(customMobileValue = 769): TUsewindowDimensions {
  const hasWindow = typeof window !== 'undefined';
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const handleResize = useCallback(() => {
    if (hasWindow) {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setIsMobile(window.innerWidth <= customMobileValue);
    }
  }, [customMobileValue, hasWindow]);

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow, handleResize]);

  return {
    width,
    height,
    isMobile,
  };
}
