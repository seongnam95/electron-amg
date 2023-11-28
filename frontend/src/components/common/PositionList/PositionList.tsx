import { useEffect, useRef } from 'react';

import { Empty } from 'antd';

import { PositionData } from '~/types/position';

import PositionItem from './PositionItem';
import { PositionListStyled } from './styled';

export interface PositionListProps {
  positions?: Omit<PositionData, 'id'>[];
  onDoubleClick?: (position: Omit<PositionData, 'id'>) => void;
  onRemove?: (position: Omit<PositionData, 'id'>) => void;
}

const PositionList = ({ positions, onDoubleClick, onRemove }: PositionListProps) => {
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
            return (
              <PositionItem
                key={`${position.name}/${idx}`}
                {...{ position }}
                onDoubleClick={onDoubleClick}
                onRemove={onRemove}
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
