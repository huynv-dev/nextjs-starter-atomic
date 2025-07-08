import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Lắng nghe sự kiện resize
    window.addEventListener('resize', handleResize);

    // Gọi lần đầu
    handleResize();

    // Dọn dẹp sự kiện
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
