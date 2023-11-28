import { useEffect, useRef } from 'react';

import { Empty } from 'antd';

import { PositionData } from '~/types/position';

import PositionItem from './PositionItem';
import { PositionListStyled } from './styled';

export interface PositionListProps {
  positions?: Omit<PositionData, 'id'>[];
  onRemove: (key: React.Key) => void;
}

const PositionList = ({ positions, onRemove }: PositionListProps) => {
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
      {positions ? (
        <ul ref={listRef} className="position-list">
          {positions.map(position => {
            return <PositionItem {...{ position }} onRemove={onRemove} />;
          })}
        </ul>
      ) : (
        <Empty className="empty-wrap" description={false} style={{ width: 80 }} />
      )}
    </PositionListStyled>
  );
};

export default PositionList;
