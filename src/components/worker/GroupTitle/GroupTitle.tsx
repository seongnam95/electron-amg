import React from 'react';

import { Dropdown, MenuProps, Tooltip } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import Button from '~/components/common/Button';

import { GroupTitleStyled } from './styled';

export interface GroupTitleProps {
  groupName?: string;
  explanation?: string;
  mangerName?: string;
  doesExist?: boolean;
  onEditor?: () => void;
}

const GroupTitle = ({
  groupName,
  explanation,
  mangerName,
  doesExist,
  onEditor,
}: GroupTitleProps) => {
  const handleMenuClick = () => {
    console.log('클릭');
  };

  const items = [
    {
      key: 'create-form',
      label: (
        <p className="create-form-btn" onClick={handleMenuClick}>
          계약서 폼 생성
        </p>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
    },
    {
      key: 'remove',
      danger: true,
      disabled: true,
      label: '그룹 삭제',
    },
  ];
  return (
    <GroupTitleStyled className="GroupTitle" doesExist={!!onEditor}>
      <div className="header-text">
        {groupName}

        {/* 그룹 설명이 있다면, 표시 */}
        {/* {explanation && (
          <Tooltip placement="bottom" title={explanation}>
            <span className="info-icon">i</span>
          </Tooltip>
        )} */}
      </div>

      {/* 그룹 담당자가 있다면, 표시 */}
      {/* {mangerName && (
        <span className="manager-text-chip">
          담당자 <span className="manager-name">{mangerName}</span>
        </span>
      )} */}
      <Dropdown menu={{ items }}>
        <Button styled={{ variations: 'icon', size: 'small' }}>
          <i className="bx bx-dots-vertical-rounded" />
        </Button>
      </Dropdown>
    </GroupTitleStyled>
  );
};

export default React.memo(GroupTitle);
