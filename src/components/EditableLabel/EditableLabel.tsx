import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { ColorPicker } from 'antd';
import { PresetsItem } from 'antd/es/color-picker/interface';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import { filteredGroupState } from '~/stores/group';

import Button from '../common/Button';
import { EditableLabelStyled } from './styled';

export interface EditableLabelProps {
  groupId: string;
}

const EditableLabel = ({ groupId, ...rest }: EditableLabelProps) => {
  const currentGroup = useRecoilValue(filteredGroupState(groupId));
  const initValue = groupId === 'all' ? '전체' : groupId === 'etc' ? '기타' : currentGroup.name;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(initValue);
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

  const handleOnClickOk = () => {};

  const handleOnClickCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => console.log(isEditing), [isEditing]);

  return (
    <EditableLabelStyled isEditing={isEditing} {...rest}>
      <div className="row">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setIsEditing(true)}
          spellCheck={false}
        />
        {isEditing && (
          <motion.div
            key="btn"
            className="btn-wrap"
            initial={{ opacity: 0, x: -8, visibility: 'hidden' }}
            animate={{ opacity: 1, x: 0, visibility: 'visible' }}
            exit={{ opacity: 0, x: -8, visibility: 'hidden' }}
            transition={{ duration: 0.3 }}
          >
            <Button className="ok-btn" styled={{ variations: 'icon' }} onClick={handleOnClickOk}>
              <i className="bx bx-check" />
            </Button>
            <Button
              className="cancel-btn"
              styled={{ variations: 'icon' }}
              onClick={handleOnClickCancel}
            >
              <i className="bx bx-x" />
            </Button>
          </motion.div>
        )}
      </div>

      {isEditing && (
        <motion.div
          key="edit"
          className="edit-row"
          initial={{ opacity: 0, x: -8, visibility: 'hidden' }}
          animate={{ opacity: 1, x: 0, visibility: 'visible' }}
          exit={{ opacity: 0, x: -8, visibility: 'hidden' }}
          transition={{ duration: 0.3 }}
        >
          <ColorPicker disabledAlpha presets={initColors} />
          <input className="input-explanation" spellCheck={false} placeholder="그룹 설명 (선택)" />
        </motion.div>
      )}
    </EditableLabelStyled>
  );
};

export default EditableLabel;
