import { ChangeEvent, useRef, useState } from 'react';

import { ColorPicker } from 'antd';
import { PresetsItem } from 'antd/es/color-picker/interface';

import { GroupData } from '~/types/group';

import { EditableLabelStyled, EditableLabelStyledProps } from './styled';

export interface EditableLabelProps extends EditableLabelStyledProps {
  group: GroupData;
}

const EditableLabel = ({ group, ...rest }: EditableLabelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(group.name ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const initColors: PresetsItem[] = [
    {
      label: '기본 컬러',
      colors: ['#FE8730', '#FA5454', '7230FE'],
    },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    inputRef.current?.focus();
  };

  return (
    <EditableLabelStyled onClick={() => setIsEditing(true)} {...rest}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        spellCheck={false}
        disabled={!isEditing}
      />
      <ColorPicker disabledAlpha presets={initColors} />
    </EditableLabelStyled>
  );
};

export default EditableLabel;
