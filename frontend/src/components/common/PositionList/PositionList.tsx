import { useEffect, useRef, useState } from 'react';

import { Empty } from 'antd';
import clsx from 'clsx';
import { Reorder } from 'framer-motion';

import { PositionCreateBody } from '~/types/position';

import PositionItem from './PositionItem';
import { PositionListStyled } from './styled';

export interface PositionListProps {
  positions?: PositionCreateBody[];
  selectedPosition?: PositionCreateBody;
  onReorder?: (positions: PositionCreateBody[]) => void;
  onDoubleClick?: (position: PositionCreateBody) => void;
}

const PositionList = ({
  positions,
  selectedPosition,
  onReorder,
  onDoubleClick,
}: PositionListProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [reorderedPositions, setReorderedPositions] = useState<PositionCreateBody[]>([]);
  const [draggingName, setDraggingName] = useState<string>();

  useEffect(() => {
    if (positions) setReorderedPositions(positions);
    if (listRef.current) {
      const scrollHeight = listRef.current.scrollHeight;
      listRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [positions]);

  return (
    <PositionListStyled className="PositionList">
      {reorderedPositions && reorderedPositions.length > 0 ? (
        <Reorder.Group
          ref={listRef}
          className="position-list"
          values={reorderedPositions}
          onReorder={(items: PositionCreateBody[]) => onReorder?.(items)}
        >
          {reorderedPositions.map((position, idx) => {
            const isEditing = !!selectedPosition;
            const isSelected = position === selectedPosition;
            const isDragging = !!draggingName;
            const isDraggingTarget = position.name === draggingName;

            return (
              <Reorder.Item
                key={`${position.name}${position.unitId}`}
                value={position}
                onDragStart={() => setDraggingName(position.name)}
                onDragEnd={() => setDraggingName(undefined)}
              >
                <PositionItem
                  className={clsx(
                    'position-item',
                    isEditing && 'editing',
                    isSelected && 'selected',
                    isDragging && 'editing',
                    isDraggingTarget && 'selected',
                  )}
                  position={position}
                  onDoubleClick={onDoubleClick}
                />
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      ) : (
        <Empty className="empty-wrap" description={false} style={{ width: 80 }} />
      )}
    </PositionListStyled>
  );
};

export default PositionList;
