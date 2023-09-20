import { useEffect, useState } from "react";

export const useCheckWindowSize = size => {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < size) {
        setShowBtn(true);
      } else setShowBtn(false);
    }
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [size])

  return showBtn
}