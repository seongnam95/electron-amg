import React, { cloneElement, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { Button, Flex, Space } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';

import { ContextPopupStyled } from './styled';
import calculatePosition from './util';

type PositionType = { offsetX: number; offsetY: number; originX?: number; originY?: number };

export interface ContextPopupProps {
  title?: ReactNode;
  content?: ReactNode;
  children?: ReactNode;
  onCancel?: () => void;
}

const ContextPopup = ({ title, content, children, onCancel }: ContextPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [lineStart, setLineStart] = useState({ x: 0, y: 0 });
  const [lineEnd, setLineEnd] = useState({ x: 0, y: 0 });

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
      const newPosition = calculatePosition(popupRef, mousePosition.offsetX, mousePosition.offsetY);
      setPopupPosition(newPosition);

      setLineEnd({
        x: newPosition.offsetX + popupRef.current.offsetWidth / 2,
        y: newPosition.offsetY + popupRef.current.offsetHeight / 2,
      });
    }
  }, [visible, mousePosition.offsetX, mousePosition.offsetY]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (event.button !== 0) return;
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', closePopup);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', closePopup);
    };
  }, []);

  const openPopup = (event: MouseEvent) => {
    event.preventDefault();
    const newMousePosition = { offsetX: event.clientX, offsetY: event.clientY };

    if (
      visible &&
      (mousePosition.offsetX !== newMousePosition.offsetX ||
        mousePosition.offsetY !== newMousePosition.offsetY)
    ) {
      setVisible(false);

      setTimeout(() => {
        setMousePosition(newMousePosition);
        setVisible(true);
        setLineStartPosition(event);
      }, 140);
    } else {
      setMousePosition(newMousePosition);
      setVisible(true);
      setLineStartPosition(event);
    }
  };

  const setLineStartPosition = (event: MouseEvent) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = event;
    const { x, y } = containerRef.current.getBoundingClientRect();
    const lineStartPosition = { x: clientX - x, y: clientY - y };

    setLineStart(lineStartPosition);
  };

  const closePopup = () => {
    setVisible(false);
    setPopupPosition({ offsetX: -9999, offsetY: -9999 });
  };

  const handleCancel = () => {
    closePopup();
    onCancel?.();
  };

  const clonedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      const originalContextMenuHandler = child.props.onContextMenu;

      return cloneElement(child as ReactElement, {
        onContextMenu: (...args: any[]) => {
          openPopup(args[0]);
          if (originalContextMenuHandler) {
            originalContextMenuHandler(...args);
          }
        },
      });
    }
    return child;
  });

  const clonedContent = React.Children.map(content, child => {
    if (React.isValidElement(child)) {
      return cloneElement(child as ReactElement, {
        onCancel: handleCancel,
      });
    }
    return child;
  });

  return (
    <ContextPopupStyled ref={containerRef} className="ContextPopup">
      {clonedChildren}
      {/* <div className={clsx('context-popup-mask', visible && 'visible')} /> */}
      <svg
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <line x1={lineStart.x} y1={lineStart.y} x2={lineEnd.x} y2={lineEnd.y} stroke="black" />
      </svg>
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={popupRef}
            className="popup-wrap"
            key={`context-popup-${mousePosition.offsetX}-${mousePosition.offsetY}`}
            drag
            dragConstraints={{ current: containerRef.current }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.14 }}
            style={{
              position: 'fixed',
              left: `${popupPosition.offsetX}px`,
              top: `${popupPosition.offsetY}px`,
              zIndex: 9999,
              originX: popupPosition.originX,
              originY: popupPosition.originY,
            }}
          >
            <Flex className="popup-title" align="center" justify="space-between" gap={14}>
              <span className="title-wrap">{title}</span>
              <Button
                type="text"
                size="small"
                icon={<AiOutlineClose size="1.6rem" />}
                onClick={handleCancel}
              />
            </Flex>
            <Space className="popup-content">{clonedContent}</Space>
          </motion.div>
        )}
      </AnimatePresence>
    </ContextPopupStyled>
  );
};

export default ContextPopup;
