import { ChangeEvent, useEffect, useRef, useState, MouseEvent } from 'react';
import { useQuery } from 'react-query';

import { ColorPicker, ModalProps, Select } from 'antd';
import { Color } from 'antd/es/color-picker';
import { PresetsItem } from 'antd/es/color-picker/interface';

import { fetchUsers } from '~/api/userApi';
import Button from '~/components/common/Button';
import { GroupData } from '~/types/group';

import { GroupEditorModalStyled } from './styled';

const initColors: PresetsItem[] = [
  {
    label: '기본 컬러',
    colors: ['#FE8730', '#FA5454', '7230FE'],
  },
];

export interface GroupEditorModalProps extends ModalProps {
  targetGroup: GroupData;
  onSubmit?: (group: GroupData) => void;
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
  const { data: userData } = useQuery('usersQuery', fetchUsers, {
    enabled: open,
    staleTime: 1000 * 60 * 10,
  });

  const users = userData?.map(v => ({
    value: v.id,
    label: `${v.name} (${v.username})`,
  }));

  const managerValue = group.userId
    ? users?.filter(v => group.userId === v.value)[0].value
    : undefined;

  useEffect(() => {
    if (targetGroup) setGroup(targetGroup);
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

  const handleOnCancel = (e: MouseEvent<HTMLButtonElement>) => {
    setGroup(targetGroup);
    onCancel?.(e);
  };

  const RenderFooter = () => (
    <div className="btn-wrap">
      <Button className="btn-cancel" styled={{ variations: 'link' }} onClick={handleOnCancel}>
        취소
      </Button>
      <Button className="btn-ok" styled={{ variations: 'link' }} onClick={() => onSubmit?.(group)}>
        저장
      </Button>
    </div>
  );

  return (
    <GroupEditorModalStyled open={open} centered footer={<RenderFooter />} {...rest}>
      <div className="title-color-row">
        {/* 그룹명 */}
        <input
          ref={nameInputRef}
          id="name"
          type="text"
          className="input-name"
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

      <div className="selector-row">
        <Select
          className="user-selector"
          options={users}
          defaultValue={managerValue}
          placeholder="( 그룹 담당자 선택 )"
        />
        <Button className="user-clear-btn" styled={{ variations: 'icon' }}>
          <i className="bx bx-x" />
        </Button>
      </div>
    </GroupEditorModalStyled>
  );
};

export default GroupEditorModal;
