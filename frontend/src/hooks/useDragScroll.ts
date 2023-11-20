import { useRef, useEffect } from 'react';

interface DragScrollOptions {
  draggableX?: boolean;
  draggableY?: boolean;
  inertia?: boolean;
  inertiaVelocity?: number;
}

export const useDragScroll = ({
  draggableX = true,
  draggableY = true,
  inertia = true,
  inertiaVelocity = 0.95,
}: DragScrollOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);

  let isDragging = false;

  let startX: number, startY: number;
  let scrollX: number, scrollY: number;

  let velocityX = 0;
  let velocityY = 0;
  let lastX = 0;
  let lastY = 0;

  let rafId: number | null = null;

  const handleMouseDown = (e: MouseEvent) => {
    isDragging = true;

    startX = e.pageX - (ref.current?.offsetLeft || 0);
    startY = e.pageY - (ref.current?.offsetTop || 0);

    scrollX = ref.current?.scrollLeft || 0;
    scrollY = ref.current?.scrollTop || 0;

    lastX = e.pageX;
    lastY = e.pageY;

    if (ref.current) ref.current.style.cursor = 'grabbing';
  };

  const animateScroll = () => {
    if (ref.current && (Math.abs(velocityX) > 0.5 || Math.abs(velocityY) > 0.5)) {
      if (draggableX) {
        ref.current.scrollLeft -= velocityX;
        velocityX *= inertiaVelocity;
      }

      if (draggableY) {
        ref.current.scrollTop -= velocityY;
        velocityY *= inertiaVelocity;
      }

      rafId = requestAnimationFrame(animateScroll);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const mouseX = e.pageX - (ref.current?.offsetLeft || 0);
    const mouseY = e.pageY - (ref.current?.offsetTop || 0);

    if (ref.current) {
      // 마우스의 이동 거리를 기반으로 속도를 계산
      velocityX = mouseX - startX - (ref.current.scrollLeft - scrollX);
      velocityY = mouseY - startY - (ref.current.scrollTop - scrollY);

      if (draggableX) ref.current.scrollLeft = scrollX - (mouseX - startX);
      if (draggableY) ref.current.scrollTop = scrollY - (mouseY - startY);
    }

    startX = mouseX;
    startY = mouseY;

    scrollX = ref.current?.scrollLeft || 0;
    scrollY = ref.current?.scrollTop || 0;
  };

  const handleMouseUpLeave = (e: MouseEvent) => {
    isDragging = false;
    e.preventDefault();

    if (ref.current) ref.current.style.cursor = 'default';

    const minVelocityThreshold = 5;

    // 마우스의 최종 속도가 임계값 이상일 경우 관성 스크롤을 실행
    if (
      inertia &&
      (Math.abs(velocityX) > minVelocityThreshold || Math.abs(velocityY) > minVelocityThreshold)
    ) {
      animateScroll();
    } else {
      velocityX = 0;
      velocityY = 0;
    }
  };

  useEffect(() => {
    const elem = ref.current;

    if (!elem) return;
    elem.addEventListener('mousedown', handleMouseDown);
    elem.addEventListener('mouseup', handleMouseUpLeave);
    elem.addEventListener('mousemove', handleMouseMove);
    elem.addEventListener('mouseleave', handleMouseUpLeave);

    return () => {
      elem.removeEventListener('mousedown', handleMouseDown);
      elem.removeEventListener('mouseup', handleMouseUpLeave);
      elem.removeEventListener('mousemove', handleMouseMove);
      elem.removeEventListener('mouseleave', handleMouseUpLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return ref;
};
