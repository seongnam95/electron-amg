import { useState } from 'react';

import { Button, Flex, Form, Space } from 'antd';

import PositionForm from '~/components/forms/PositionForm';
import { useSoundApp } from '~/hooks/componentHooks/useSoundApp';
import { PositionCreateBody } from '~/types/position';
import { UnitData } from '~/types/unit';

import PositionList from '../PositionList';

export interface PositionManagerProps {
  unitValues?: UnitData[];
  isLoading?: boolean;
  onSubmit?: (positions: PositionCreateBody[]) => void;
}

const PositionManager = ({ unitValues, isLoading, onSubmit }: PositionManagerProps) => {
  const [positions, setPositions] = useState<PositionCreateBody[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<PositionCreateBody>();

  const isEditing = !!selectedPosition;

  const { soundMessage } = useSoundApp();
  const [form] = Form.useForm<PositionCreateBody>();

  // 직위 추가
  const handleAddPosition = (data: PositionCreateBody) => {
    setSelectedPosition(undefined);

    if (data.isLeader) {
      const existLeader = positions.some(pos => pos.isLeader);
      if (existLeader) {
        soundMessage.warning('팀장은 각 팀당 한명만 가능합니다.');
        return;
      }
    }
    if (isEditing) {
      setPositions(prev => prev.map(pos => (pos === selectedPosition ? { ...data } : pos)));
    } else {
      setPositions(prev => [...prev, { ...data }]);
    }
  };

  // 직위 삭제
  const handleRemovePosition = () => {
    setPositions(prev => prev.filter(pos => pos !== selectedPosition));
    setSelectedPosition(undefined);
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
    <Space className="PositionManager" direction="vertical" align="end">
      <Flex gap={32} style={{ marginBottom: 24 }}>
        <PositionList
          positions={positions}
          selectedPosition={selectedPosition}
          onReorder={setPositions}
          onDoubleClick={setSelectedPosition}
        />
        <PositionForm
          form={form}
          isEditing={isEditing}
          unitValues={unitValues}
          initValues={selectedPosition}
          onCancel={() => setSelectedPosition(undefined)}
          onRemove={handleRemovePosition}
          onSubmit={handleAddPosition}
        />
      </Flex>
      <Button
        loading={isLoading}
        type="primary"
        htmlType="submit"
        style={{ padding: '0 2.4rem' }}
        onClick={handleSubmit}
      >
        직위 생성하기
      </Button>
    </Space>
  );
};

export default PositionManager;
