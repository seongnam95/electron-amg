import { useRef, useEffect } from 'react';

export function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  let isDragging = false;
  let startMouseX: number;
  let startMouseY: number;
  let startScrollX: number;
  let startScrollY: number;

  const handleMouseDown = (e: MouseEvent) => {
    isDragging = true;
    startMouseX = e.pageX - (ref.current?.offsetLeft || 0);
    startMouseY = e.pageY - (ref.current?.offsetTop || 0);
    startScrollX = ref.current?.scrollLeft || 0;
    startScrollY = ref.current?.scrollTop || 0;
  };

  const handleMouseLeave = () => {
    isDragging = false;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const mouseX = e.pageX - (ref.current?.offsetLeft || 0);
    const mouseY = e.pageY - (ref.current?.offsetTop || 0);

    const deltaX = mouseX - startMouseX;
    const deltaY = mouseY - startMouseY;

    if (ref.current) {
      ref.current.scrollLeft = startScrollX - deltaX;
      ref.current.scrollTop = startScrollY - deltaY;
    }
  };

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    elem.addEventListener('mousedown', handleMouseDown);
    elem.addEventListener('mouseleave', handleMouseLeave);
    elem.addEventListener('mouseup', handleMouseUp);
    elem.addEventListener('mousemove', handleMouseMove);

    return () => {
      elem.removeEventListener('mousedown', handleMouseDown);
      elem.removeEventListener('mouseleave', handleMouseLeave);
      elem.removeEventListener('mouseup', handleMouseUp);
      elem.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return ref;
}
