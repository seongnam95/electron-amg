import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';

import { ColorPicker, ModalProps, Select } from 'antd';
import { Color } from 'antd/es/color-picker';
import { PresetsItem } from 'antd/es/color-picker/interface';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { updateGroup } from '~/api/group';
import { groupState } from '~/stores/group';
import { userState } from '~/stores/user';
import { GroupData } from '~/types/group';

import Button from '../common/Button';
import { GroupEditorModalStyled } from './styled';

const initColors: PresetsItem[] = [
  {
    label: '기본 컬러',
    colors: ['#FE8730', '#FA5454', '7230FE'],
  },
];

export interface GroupEditorModalProps extends ModalProps {
  targetGroup: GroupData;
  onSubmit?: () => void;
}

const GroupEditorModal = ({
  targetGroup,
  open,
  onSubmit,
  onCancel,
  ...rest
}: GroupEditorModalProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [group, setGroup] = useState<GroupData>(targetGroup);

  const { mutate, data, isLoading, isError } = useMutation(updateGroup, {
    onMutate: variable => {
      console.log('variable', variable);
    },
    onSuccess: (data, variables, context) => {
      console.log('success', data, variables, context);
      onSubmit?.();
    },
  });

  useEffect(() => {
    setGroup(targetGroup);
    if (open) nameInputRef.current?.focus();
  }, [open, targetGroup]);

  // 그룹명, 그룹설명 변경 핸들러
  const handleOnChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setGroup(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  // 그룹 색상 변경 핸들러
  const handleOnChangeColor = (e: Color) => {
    setGroup(prevState => ({
      ...prevState,
      hexColor: e.toHexString(),
    }));
  };

  const handleOnSubmit = () => {
    const newGroup = {
      name: String(group.name),
      hex_color: String(group.hexColor),
      explanation: String(group.explanation),
    };
    mutate({ groupId: targetGroup.id, updatedData: newGroup });
  };

  const RenderFooter = () => (
    <div className="btn-wrap">
      <Button className="btn-cancel" styled={{ variations: 'link' }} onClick={onCancel}>
        취소
      </Button>
      <Button className="btn-ok" styled={{ variations: 'link' }} onClick={handleOnSubmit}>
        저장
      </Button>
    </div>
  );

  return (
    <GroupEditorModalStyled open={open} centered footer={<RenderFooter />} {...rest}>
      <div className="row">
        {/* 그룹명 */}
        <input
          ref={nameInputRef}
          id="name"
          type="text"
          value={group?.name}
          spellCheck={false}
          onChange={handleOnChangeValue}
        />

        {/* 그룹 색상 */}
        <ColorPicker
          disabledAlpha
          defaultValue={group?.hexColor}
          presets={initColors}
          onChangeComplete={handleOnChangeColor}
        />
      </div>

      {/* 그룹 설명 */}
      <input
        id="explanation"
        className="input-explanation"
        key="explanation"
        value={group?.explanation}
        onChange={handleOnChangeValue}
        spellCheck={false}
        placeholder="그룹 설명 (선택)"
      />

      <Select defaultValue={'sddsd'} />
    </GroupEditorModalStyled>
  );
};

export default GroupEditorModal;
