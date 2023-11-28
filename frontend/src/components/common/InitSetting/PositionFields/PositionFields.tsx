import { useRef, RefObject, useEffect, useState } from 'react';
import { MdOutlineAdd } from 'react-icons/md';

import { InputRef, ColorPicker, Form, Input, InputNumber, Divider, Select, Space } from 'antd';
import { Color } from 'antd/es/color-picker';

import PositionForm from '~/components/forms/PositionForm';
import { PositionCreateBody, PositionData, SALARY, SalaryType } from '~/types/position';

import PositionList from '../../PositionList';
import { PositionFieldsStyled } from './styled';

const PositionFields = () => {
  const [positions, setPositions] = useState<Omit<PositionData, 'id'>[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Omit<PositionData, 'id'>>();

  const handleSubmit = (data: PositionCreateBody) => {
    setPositions(prev => [...prev, { ...data }]);
    setSelectedPosition(undefined);
  };

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
