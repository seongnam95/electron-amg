import React, { useMemo } from 'react';

import { Dropdown, Modal } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { CSSProperties } from 'styled-components';

import Button from '~/components/common/Button';
import { GroupRequestBody, useEasyMutation } from '~/hooks/queryHooks/useGroup';

import { GroupTitleStyled } from './styled';

export interface GroupTitleProps {
  groupId: string;
  groupName?: string;
  color?: string;
  explanation?: string;
  mangerName?: string;
  doesExist?: boolean;
  onEditor?: () => void;
}

const GroupTitle = ({
  groupId,
  groupName,
  color,
  explanation,
  mangerName,
  doesExist,
  onEditor,
}: GroupTitleProps) => {
  const { removeMutate } = useEasyMutation<GroupRequestBody>(
    ['group'],
    import.meta.env.VITE_GROUP_API_URL,
  );

  const createContractForm = () => {};
  const editGroup = () => onEditor?.();
  const removeGroup = () => removeMutate(groupId);

  const showRemoveModal = () => {
    Modal.confirm({
      title: '해당 그룹을 삭제하시겠습니까?',
      content: '그룹 내 모든 근로자는 기타(소속없음)으로 이동됩니다.',
      okText: '그룹 삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: removeGroup,
    });
  };

  const menuItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '32px',
    padding: '0 4px',
  };

  const items: ItemType[] = useMemo(
    () => [
      {
        key: 'create-contract',
        onClick: createContractForm,
        label: (
          <p style={menuItemStyle}>
            <i className="bx bx-dock-top" />
            계약서 폼 생성
          </p>
        ),
      },
      {
        key: 'group-edit',
        onClick: editGroup,
        label: (
          <p style={menuItemStyle}>
            <i className="bx bx-edit" />
            그룹 편집
          </p>
        ),
      },
      {
        key: 'group-remove',
        onClick: showRemoveModal,
        danger: true,
        label: (
          <p style={menuItemStyle}>
            <i className="bx bx-trash" />
            그룹 삭제
          </p>
        ),
      },
    ],
    [],
  );

  return (
    <GroupTitleStyled className="GroupTitle">
      <div className="title-row">
        <span className="header-text">{groupName}</span>

        {doesExist ? (
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button>
              <i className="bx bx-dots-vertical-rounded" />
            </Button>
          </Dropdown>
        ) : null}
      </div>

      <div className="info-wrap">
        {mangerName && <span className="manager-text">{mangerName}</span>}
        <span className="explanation-text">{explanation}</span>
      </div>
    </GroupTitleStyled>
  );
};

export default React.memo(GroupTitle);
