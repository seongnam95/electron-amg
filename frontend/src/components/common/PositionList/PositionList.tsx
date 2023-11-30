import { useEffect, useRef } from 'react';

import { Empty } from 'antd';
import clsx from 'clsx';

import { PositionCreateBody } from '~/types/position';

import PositionItem from './PositionItem';
import { PositionListStyled } from './styled';

export interface PositionListProps {
  positions?: PositionCreateBody[];
  selectedPosition?: PositionCreateBody;
  onDoubleClick?: (position: PositionCreateBody) => void;
}

const PositionList = ({ positions, selectedPosition, onDoubleClick }: PositionListProps) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
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
      {positions && positions.length > 0 ? (
        <ul ref={listRef} className="position-list">
          {positions.map((position, idx) => {
            const isEditing = !!selectedPosition;
            const isSelected = position === selectedPosition;

            return (
              <PositionItem
                className={clsx('position-item', isEditing && 'editing', isSelected && 'selected')}
                key={`${position.name}/${idx}`}
                {...{ position }}
                onDoubleClick={onDoubleClick}
              />
            );
          })}
        </ul>
      ) : (
        <Empty className="empty-wrap" description={false} style={{ width: 80 }} />
      )}
    </PositionListStyled>
  );
};

export default PositionList;
