import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { Button, Flex, Space } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';

import insertHandlerChild from '~/utils/insertHandlerChild';

import { ContextPopupStyled } from './styled';
import calculateInsidePosition, { Offset } from './utils/calculateInsidePosition';

export interface ContextPopupProps {
  children: ReactElement;
  content?: ReactElement;
  title?: ReactNode;
  onCancel?: () => void;
}

const ContextPopup = ({ title, content, children, onCancel }: ContextPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [mouseOffset, setMouseOffset] = useState<Offset>({ x: 0, y: 0 });
  const [popupPosition, setPopupPosition] = useState<Offset>({ x: -9999, y: -9999 });

  /** Popup 위치 선정 Effect */
  useEffect(() => {
    if (visible && popupRef.current) {
      const insideOffset = calculateInsidePosition(popupRef.current, mouseOffset.x, mouseOffset.y);
      setPopupPosition(insideOffset);
    }
  }, [visible, mouseOffset.x, mouseOffset.y]);

  const openPopup = (event: MouseEvent) => {
    event.preventDefault();
    const mouseOffset = { x: event.clientX, y: event.clientY };

    if (visible) closePopup();
    setMouseOffset(mouseOffset);
    setVisible(true);
  };

  const closePopup = () => {
    setVisible(false);
    setPopupPosition({ x: -9999, y: -9999 });
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
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={popupRef}
            className="popup-wrap"
            key={`context-popup-${mouseOffset.x}-${mouseOffset.y}`}
            drag
            dragMomentum={false}
            dragElastic={false}
            dragConstraints={{ current: containerRef.current }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.14 }}
            style={{
              zIndex: 9999,
              position: 'fixed',
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
              originX: popupPosition.styleOriginX,
              originY: popupPosition.styleOriginY,
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
            <Space className="popup-content">{insertedContent}</Space>
          </motion.div>
        )}
      </AnimatePresence>
    </ContextPopupStyled>
  );
};

export default ContextPopup;
