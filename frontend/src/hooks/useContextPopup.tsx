import { useState, MouseEvent, useRef, useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import ContextPopup, { ContextPopupProps } from '~/components/attendance/ContextPopup';

interface ContextPopupOptions extends ContextPopupProps {}

type PositionType = { offsetX: number; offsetY: number; originX?: number; originY?: number };
const useContextPopup = ({ children, ...options }: ContextPopupOptions) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState<PositionType>({ offsetX: 0, offsetY: 0 });
  const [popupPosition, setPopupPosition] = useState<PositionType>({
    offsetX: -9999,
    offsetY: -9999,
    originX: 0,
    originY: 0,
  });

  useEffect(() => {
    if (visible && popupRef.current) {
      const newPosition = calculatePosition(mousePosition.offsetX, mousePosition.offsetY);
      setPopupPosition(newPosition);
    }
  }, [visible, mousePosition.offsetX, mousePosition.offsetY]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openPopup = (event: MouseEvent) => {
    event.preventDefault();
    setMousePosition({ offsetX: event.clientX, offsetY: event.clientY });
    setVisible(true);
  };

  const closePopup = () => {
    setVisible(false);
    setPopupPosition({ offsetX: -9999, offsetY: -9999 });
  };

  const calculatePosition = (x: number, y: number) => {
    const popupWidth = popupRef.current?.offsetWidth || 0;
    const popupHeight = popupRef.current?.offsetHeight || 0;

    const { innerWidth, innerHeight } = window;

    let offsetX = x;
    let offsetY = y;
    let originX = 0;
    let originY = 0;

    if (x + popupWidth > innerWidth) {
      offsetX = x - popupWidth;
      originX = 1;
    }

    if (y + popupHeight > innerHeight) {
      offsetY = y - popupHeight;
      originY = 1;
    }

    return { offsetX, offsetY, originX, originY };
  };

  const renderPopup = (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={popupRef}
          key="context-popup"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          style={{
            position: 'fixed',
            left: `${popupPosition.offsetX}px`,
            top: `${popupPosition.offsetY}px`,
            zIndex: 9999,
            originX: popupPosition.originX,
            originY: popupPosition.originY,
          }}
        >
          <ContextPopup title="근무 로그 추가/변경" {...options}>
            {children}
          </ContextPopup>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return { openPopup, closePopup, renderPopup };
};

export default useContextPopup;
