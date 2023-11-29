import { useState } from 'react';

import PositionForm from '~/components/forms/PositionForm';
import { PositionCreateBody, PositionData } from '~/types/position';

import PositionList from '../../PositionList';
import { PositionFieldsStyled } from './styled';

const PositionFields = () => {
  const [positions, setPositions] = useState<Omit<PositionData, 'id'>[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Omit<PositionData, 'id'>>();

  const handleDoubleClick = (position: Omit<PositionData, 'id'>) => setSelectedPosition(position);

  const handleRemove = (position: Omit<PositionData, 'id'>) => {
    setPositions(prev => prev.filter(pos => pos !== position));
  };

  return (
    <PositionFieldsStyled>
      <PositionList
        positions={positions}
        onDoubleClick={handleDoubleClick}
        onRemove={handleRemove}
      />
      <PositionForm onSubmit={handleSubmit} initialValues={selectedPosition} />
    </PositionFieldsStyled>
  );
};

export default PositionFields;
