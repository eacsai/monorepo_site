import { useCallback, useEffect, useState } from "react";
export default function useWinSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }, []);
  const wait = (fn,delay) => {
    let timer
    return () =>{
      if(timer) {
        return
      }
      timer = setTimeout(() =>{
        fn();
        timer = null;
      },delay);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", () =>{
      const run = wait(onResize,1000);
      run()
    });
    return () => {
      window.removeEventListener("resize", () => {
        const run = wait(onResize,1000);
        run()
      });
    };
  }, [onResize]);
  return size;
}
