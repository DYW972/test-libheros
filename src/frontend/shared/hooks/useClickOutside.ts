import { useEffect } from 'react';

export function useClickOutside(
  refs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  callback: () => void,
) {
  useEffect(() => {
    const refArray = Array.isArray(refs) ? refs : [refs];

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      const clickedOutsideAll = refArray.every(
        (ref) => ref.current && !ref.current.contains(target),
      );

      if (clickedOutsideAll) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback]);
}
