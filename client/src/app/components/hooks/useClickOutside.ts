import { useEffect, RefObject, MutableRefObject } from "react";

function useOnClickOutside<T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (el && el.contains((event?.target as Node) || null)) {
        return;
      }
      handler();
    };
    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);
    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
  }, [ref as MutableRefObject<T>, handler]);
}

export default useOnClickOutside;
