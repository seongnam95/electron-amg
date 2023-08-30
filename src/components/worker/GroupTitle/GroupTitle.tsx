import React from 'react';

import { Tooltip } from 'antd';

import { GroupTitleStyled } from './styled';

export interface GroupTitleProps {
  groupName?: string;
  explanation?: string;
  mangerName?: string;
  doesExist?: boolean;
  onEditor?: () => void;
}

const GroupTitle = ({ groupName, explanation, mangerName, onEditor }: GroupTitleProps) => {
  console.log(groupName, explanation, mangerName);
  return (
    <GroupTitleStyled className="GroupTitle" doesExist={!!onEditor} onClick={onEditor}>
      <div className="header-text">
        {groupName}

        {/* 그룹 설명이 있다면, 표시 */}
        {explanation && (
          <Tooltip placement="bottom" title={explanation}>
            <span className="info-icon">i</span>
          </Tooltip>
        )}
      </div>

      {/* 그룹 담당자가 있다면, 표시 */}
      {mangerName && (
        <span className="manager-text-chip">
          담당자 <span className="manager-name">{mangerName}</span>
        </span>
      )}
    </GroupTitleStyled>
  );
};

export default React.memo(GroupTitle);
