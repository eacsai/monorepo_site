import { useRef, useEffect, useCallback } from 'react';

export const useThrottle = (fn: (...args: any[]) => void, delay: number, dep: any = []) => {
  const { current } = useRef<any>({ fn, timer: null });
  useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  );

  return useCallback((...args: any) => {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        current.fn(...args);
        clearTimeout(current.timer);
        current.timer = null;
      }, delay);
    }
  }, dep);
};
