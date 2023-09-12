import React, { useMemo } from 'react';

import { Dropdown, Modal, Tooltip } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { CSSProperties } from 'styled-components';

import Button from '~/components/common/Button';
import { groupKeys, useGroupMutation } from '~/hooks/queryHooks/useGroupQuery';

import { GroupTitleStyled } from './styled';

export interface GroupTitleProps {
  groupId: string;
  groupName?: string;
  explanation?: string;
  mangerName?: string;
  doesExist?: boolean;
  onEditor?: () => void;
  onRemove?: () => void;
}

const GroupTitle = ({
  groupId,
  groupName,
  explanation,
  mangerName,
  doesExist,
  onEditor,
  onRemove,
}: GroupTitleProps) => {
  const { removeGroupMutate } = useGroupMutation(groupKeys.all);

  const createContractForm = () => {};

  const removeGroup = () => {
    removeGroupMutate(groupId, { onSuccess: onRemove });
  };

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
        onClick: onEditor,
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
      <div className="title-wrap">
        <Tooltip title={explanation} placement="bottom">
          <span className="header-text">{groupName}</span>
        </Tooltip>
        {mangerName && <span className="manager-text">{mangerName}</span>}
      </div>

      {doesExist ? (
        <Dropdown menu={{ items }} trigger={['click']}>
          <Button $variations="icon">
            <i className="bx bx-dots-vertical-rounded" />
          </Button>
        </Dropdown>
      ) : null}
    </GroupTitleStyled>
  );
};

export default React.memo(GroupTitle);
