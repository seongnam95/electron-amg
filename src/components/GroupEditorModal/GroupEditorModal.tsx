import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { ColorPicker, ModalProps, Select } from 'antd';
import { Color } from 'antd/es/color-picker';
import { PresetsItem } from 'antd/es/color-picker/interface';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { updateGroup } from '~/api/groupApi';
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
  group: GroupData;
  onSubmit?: () => void;
}

const GroupEditorModal = ({ group, open, onSubmit, onCancel, ...rest }: GroupEditorModalProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [copyGroup, setCopyGroup] = useState<GroupData>(group);
  const setGroup = useSetRecoilState(groupState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    setCopyGroup(group);
    if (open) nameInputRef.current?.focus();
  }, [open, group]);

  // 그룹명, 그룹설명 변경 핸들러
  const handleOnChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCopyGroup(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  // 그룹 색상 변경 핸들러
  const handleOnChangeColor = (e: Color) => {
    setCopyGroup(prevState => ({
      ...prevState,
      hexColor: e.toHexString(),
    }));
  };

  const handleOnSubmit = () => {
    const newGroup = {
      name: String(copyGroup.name),
      hex_color: String(copyGroup.hexColor),
      explanation: String(copyGroup.explanation),
    };

    updateGroup(copyGroup.id, newGroup)
      .then(() => {
        setGroup((prevState: GroupData[]) => {
          return prevState.map((group: GroupData) => {
            if (group.id === copyGroup.id) {
              return { ...group, ...copyGroup };
            }
            return group;
          });
        });
        onSubmit?.();
      })
      .catch(error => {
        console.log(error);
      });
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
          value={copyGroup?.name}
          spellCheck={false}
          onChange={handleOnChangeValue}
        />

        {/* 그룹 색상 */}
        <ColorPicker
          disabledAlpha
          defaultValue={copyGroup?.hexColor}
          presets={initColors}
          onChangeComplete={handleOnChangeColor}
        />
      </div>

      {/* 그룹 설명 */}
      <input
        id="explanation"
        className="input-explanation"
        key="explanation"
        value={copyGroup?.explanation}
        onChange={handleOnChangeValue}
        spellCheck={false}
        placeholder="그룹 설명 (선택)"
      />

      <Select defaultValue={'sddsd'} />
    </GroupEditorModalStyled>
  );
};

export default GroupEditorModal;
