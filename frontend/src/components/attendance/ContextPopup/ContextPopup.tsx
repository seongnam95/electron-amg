import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { Button, Flex, Space } from 'antd';
import { BoundingBox, motion } from 'framer-motion';

import insertHandlerChild from '~/utils/insertHandlerChild';

import { ContextPopupStyled } from './styled';
import {
  calculateDragConstraints,
  calculateInsideOffset,
  Offset,
} from './utils/calculateInsidePosition';

export interface ContextPopupProps {
  children: ReactElement;
  close?: boolean;
  content?: ReactElement;
  title?: ReactNode;
  subTitle?: ReactNode;
  onCancel?: () => void;
}

const ContextPopup = ({
  close,
  title,
  subTitle,
  content,
  children,
  onCancel,
}: ContextPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

  const [visible, setVisible] = useState(false);
  const [mouseOffset, setMouseOffset] = useState<Offset>({ x: 0, y: 0 });
  const [popupPosition, setPopupPosition] = useState<Offset>({ x: -9999, y: -9999 });
  const [dragConstraints, setDragConstraints] = useState<BoundingBox>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    if (close) closePopup();
  }, [close]);

  /** Popup 위치 선정 Effect */
  useEffect(() => {
    if (visible && popupRef.current) {
      const insideOffset = calculateInsideOffset(popupRef.current, mouseOffset.x, mouseOffset.y);
      setPopupPosition(insideOffset);
      resizeDragConstraints();
    }

    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => resizeDragConstraints(), 300);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
    };
  }, [popupRef, containerRef, mouseOffset.x, mouseOffset.y]);

  const resizeDragConstraints = () => {
    if (popupRef.current && containerRef.current) {
      const insideOffset = calculateInsideOffset(popupRef.current, mouseOffset.x, mouseOffset.y);
      const containerBound = calculateDragConstraints(
        insideOffset,
        popupRef.current,
        containerRef.current,
      );

      setDragConstraints(containerBound);
    }
  };

  const closePopup = () => setVisible(false);
  const openPopup = (event: MouseEvent) => {
    event.preventDefault();
    setMouseOffset({ x: event.clientX, y: event.clientY });
    setVisible(true);
  };

  /** 취소 핸들러 */
  const handleCancel = () => {
    closePopup();
    onCancel?.();
  };

  /** Element 핸들러에 함수 추가 */
  const insertedChild = insertHandlerChild(children, { onContextMenu: openPopup });
  const insertedContent = insertHandlerChild(content, { onCancel: handleCancel });

  return (
    <ContextPopupStyled ref={containerRef} className="ContextPopup">
      {insertedChild}
      <motion.div
        ref={popupRef}
        className="popup-wrap"
        key={`context-popup-${mouseOffset.x}-${mouseOffset.y}`}
        drag
        dragMomentum={false}
        dragElastic={false}
        dragConstraints={dragConstraints}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
        transition={{ ease: 'easeInOut', duration: 0.3 }}
        style={{
          zIndex: 1000,
          position: 'fixed',
          left: `${popupPosition.x}px`,
          top: `${popupPosition.y}px`,
          originX: popupPosition.styleOriginX,
          originY: popupPosition.styleOriginY,
        }}
      >
        <Flex vertical gap={8}>
          <Flex className="popup-title" align="center" justify="space-between" gap={14}>
            <span className="title-wrap">{title}</span>
            <Button
              type="text"
              size="small"
              icon={<AiOutlineClose size="1.6rem" />}
              onClick={handleCancel}
            />
          </Flex>
          <p className="sub-title">{subTitle}</p>
        </Flex>

        <Space className="popup-content">{insertedContent}</Space>
      </motion.div>
    </ContextPopupStyled>
  );
};

export default ContextPopup;
