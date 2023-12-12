import { RefObject } from 'react';

const calculatePosition = (popupRef: RefObject<HTMLElement>, mouseX: number, mouseY: number) => {
  const { innerWidth, innerHeight } = window;

  const popupWidth = popupRef.current?.offsetWidth || 0;
  const popupHeight = popupRef.current?.offsetHeight || 0;

  let offsetX = mouseX;
  let offsetY = mouseY;
  let originX = 0;
  let originY = 0;

  if (mouseX + popupWidth > innerWidth) {
    offsetX = Math.max(0, innerWidth - popupWidth) - 10;
    originX = 1;
  }

  if (mouseY + popupHeight > innerHeight) {
    offsetY = Math.max(0, innerHeight - popupHeight) - 10;
    originY = 1;
  }

  originX = (mouseX - offsetX) / popupWidth;
  originY = (mouseY - offsetY) / popupHeight;

  return { offsetX, offsetY, originX, originY };
};

export default calculatePosition;
