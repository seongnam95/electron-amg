import { useState } from 'react';

import { Button, Flex, Form } from 'antd';

import PositionForm from '~/components/forms/PositionForm';
import { useSoundApp } from '~/hooks/componentHooks/useSoundApp';
import { PositionCreateBody, PositionUpdateBody } from '~/types/position';
import { UnitData } from '~/types/unit';

import PositionList from '../PositionList';
import { PositionManagerStyled } from './styled';

export interface PositionManagerProps {
  positions?: PositionUpdateBody[];
  unitValues?: UnitData[];
  isLoading?: boolean;
  onSubmit?: (positions: PositionUpdateBody[]) => void;
}

const PositionManager = ({ onSubmit }: PositionManagerProps) => {
  const [positions, setPositions] = useState<PositionCreateBody[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<PositionCreateBody>();
  const [existLeader, setExistLeader] = useState<boolean>(false);
  const isEditing = !!selectedPosition;

  const { soundMessage } = useSoundApp();
  const [form] = Form.useForm<PositionCreateBody>();

  // 직위 삭제
  const handlePositionRemove = () => {
    if (selectedPosition?.isLeader) setExistLeader(false);
    setPositions(prev => prev.filter(pos => pos !== selectedPosition));
  };

  // 직위 추가
  const handleAddPosition = (data: PositionCreateBody) => {
    console.log(data.isLeader);

    if (data.isLeader) setExistLeader(true);

    if (isEditing) {
      setPositions(prev => prev.map(pos => (pos === selectedPosition ? { ...data } : pos)));
    } else {
      setPositions(prev => [...prev, { ...data }]);
    }
  };

  // 직위 변경
  const handlePositionDoubleClick = (position: PositionCreateBody) => {
    setSelectedPosition(position);
    form.setFieldsValue(position);
  };

  // 서브밋
  const handleSubmit = () => {
    if (positions.length !== 0) {
      const sortedPositions = positions.map((position, idx) => ({
        ...position,
        sortingIndex: idx,
      }));
      onSubmit?.(sortedPositions);
    } else soundMessage.warning('하나 이상의 직위를 생성해주세요.');
  };

  return (
    <PositionManagerStyled className="PositionManager">
      <PositionList
        positions={positions}
        selectedPosition={selectedPosition}
        onReorder={setPositions}
        onDoubleClick={handlePositionDoubleClick}
      />
      <PositionForm existLeader={existLeader} />
    </PositionManagerStyled>
  );
};

export default PositionManager;
