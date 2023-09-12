import { useRef, useEffect } from 'react';

export function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const startDragging = (e: MouseEvent) => {
    isDown = true;
    startX = e.pageX - (ref.current?.offsetLeft || 0);
    scrollLeft = ref.current?.scrollLeft || 0;
  };

  const stopDragging = () => {
    isDown = false;
  };

  const dragging = (e: MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - (ref.current?.offsetLeft || 0);
    const walk = x - startX; //scroll-fast
    if (ref.current) {
      ref.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    const elem = ref.current;
    if (elem) {
      elem.addEventListener('mousedown', startDragging);
      elem.addEventListener('mouseleave', stopDragging);
      elem.addEventListener('mouseup', stopDragging);
      elem.addEventListener('mousemove', dragging);
    }
    return () => {
      if (elem) {
        elem.removeEventListener('mousedown', startDragging);
        elem.removeEventListener('mouseleave', stopDragging);
        elem.removeEventListener('mouseup', stopDragging);
        elem.removeEventListener('mousemove', dragging);
      }
    };
  }, []);

  return ref;
}
