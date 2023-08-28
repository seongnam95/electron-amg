import { ChangeEvent, useEffect, useRef, useState, MouseEvent, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';

import { ColorPicker, ModalProps, Select } from 'antd';
import { Color } from 'antd/es/color-picker';
import { PresetsItem } from 'antd/es/color-picker/interface';

import { updateGroup } from '~/api/group';
import { fetchUsers } from '~/api/user';
import Button from '~/components/common/Button';
import { GroupData } from '~/types/group';
import { UserData } from '~/types/user';

import { GroupEditorModalStyled } from './styled';

const initColors: PresetsItem[] = [
  {
    label: '기본 컬러',
    colors: ['#FE8730', '#FA5454', '7230FE'],
  },
];

export interface GroupEditorModalProps extends ModalProps {
  group: GroupData;
}

const GroupEditorModal = ({ group, open, onCancel, ...rest }: GroupEditorModalProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const initGroup = {
    id: group.id,
    name: '',
    explanation: '',
    hexColor: '',
    userId: '',
  };

  const [newGroup, setNewGroup] = useState(initGroup);
  const { data: userData } = useQuery<UserData[]>('usersQuery', fetchUsers, {
    enabled: open,
    staleTime: 1000 * 60 * 10,
  });

  const { mutate } = useMutation(updateGroup);

  const users = [
    { value: '', label: '( 담당자 없음 )' },
    ...(userData
      ? userData.map(v => ({
          value: v.id,
          label: `${v.name} (${v.username})`,
        }))
      : []),
  ];

  useEffect(() => {
    if (open) nameInputRef.current?.focus();
  }, [open, group]);

  // 그룹명, 그룹설명 변경 핸들러
  const handleOnChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewGroup(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  // 그룹 색상 변경 핸들러
  const handleOnChangeColor = (e: Color) => {
    setNewGroup(prevState => ({
      ...prevState,
      hexColor: e.toHexString(),
    }));
  };

  // 담당자 변경 핸들러
  const handleOnChangeManager = (v: string) => {
    setNewGroup(prevState => ({
      ...prevState,
      userId: v,
    }));
  };

  // Footer 버튼 클릭 핸들러
  const handleOnSubmit = () => {
    console.log(newGroup);

    const isEmpty =
      newGroup.constructor === Object && Object.keys(newGroup).length === 0 ? true : false;
    if (!isEmpty) mutate(newGroup);
  };

  // const handleOnClickRemove = () => onRemove?.(group);
  const handleOnCancel = (e: MouseEvent<HTMLButtonElement>) => {
    setNewGroup(initGroup);
    onCancel?.(e);
  };

  const RenderFooter = () => (
    <div className="btn-wrap">
      {/* <Button className="btn-remove" styled={{ variations: 'link' }} onClick={handleOnClickRemove}>
        그룹 삭제
      </Button> */}

      <div className="btn-wrap inner">
        <Button className="btn-cancel" styled={{ variations: 'link' }} onClick={handleOnCancel}>
          취소
        </Button>
        <Button className="btn-ok" styled={{ variations: 'link' }} onClick={handleOnSubmit}>
          저장
        </Button>
      </div>
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
          spellCheck={false}
          placeholder={group?.name}
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
        onChange={handleOnChangeValue}
        spellCheck={false}
        placeholder={group.explanation ? group.explanation : '그룹 설명 (선택)'}
      />

      <Select
        className="user-selector"
        options={users}
        placeholder={
          group.user ? `${group.user.name} (${group.user.username})` : '그룹 담당자 (선택)'
        }
        onChange={handleOnChangeManager}
      />
    </GroupEditorModalStyled>
  );
};

export default GroupEditorModal;
