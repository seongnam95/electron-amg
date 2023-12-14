import { BoundingBox } from 'framer-motion';

export interface Offset {
  x: number;
  y: number;
  styleOriginX?: number;
  styleOriginY?: number;
}

/**
 * 주어진 Element가 Window 내부에 위치하도록 계산한 좌표를 반환합니다.
 * @param element - 위치를 계산할 Element
 * @param mouseX - 마우스의 X 좌표
 * @param mouseY - 마우스와 Y 좌표
 * @returns {Offset} 계산 된 위치 객체
 */
export const calculateInsideOffset = (
  element: HTMLElement,
  mouseX: number,
  mouseY: number,
): Offset => {
  const { innerWidth, innerHeight } = window;

  const elementWidth = element.offsetWidth || 0;
  const elementHeight = element.offsetHeight || 0;

  const x = mouseX + elementWidth > innerWidth ? Math.max(0, innerWidth - elementWidth) : mouseX;
  const y =
    mouseY + elementHeight > innerHeight ? Math.max(0, innerHeight - elementHeight) : mouseY;

  const styleOriginX = (mouseX - x) / elementWidth;
  const styleOriginY = (mouseY - y) / elementHeight;

  return { x, y, styleOriginX, styleOriginY };
};

export const calculateDragConstraints = (
  popupOffset: Offset,
  popupElement: HTMLElement,
  containerElement: HTMLElement,
): BoundingBox => {
  const { x, y } = popupOffset;
  const { offsetWidth, offsetHeight } = popupElement;
  const { top, bottom, left, right } = containerElement.getBoundingClientRect();

  const dragLimit: BoundingBox = {
    top: top - y,
    bottom: bottom - (y + offsetHeight),
    left: left - x,
    right: right - (x + offsetWidth),
  };

  return dragLimit;
};
