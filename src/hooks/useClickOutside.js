import { useEffect, useRef } from "react";

export const useClickOutside = handler => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutSide = e => {
      const isToggleButton = e.target.closest('button');
      if (ref.current && !ref.current.contains(e.target) && !isToggleButton)
        handler();
    }
    document.addEventListener('click', handleClickOutSide, true);

    return () =>
      document.removeEventListener('click', handleClickOutSide, true);
  }, [handler])

  return ref
}