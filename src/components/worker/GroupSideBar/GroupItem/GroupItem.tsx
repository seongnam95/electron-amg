import React from 'react';

import { GroupItemStyled, GroupItemStyledProps } from './styled';

export interface GroupSideBarProps extends GroupItemStyledProps {
  id: string;
  label: string;
}

const GroupItem = ({ label, ...rest }: GroupSideBarProps) => {
  return (
    <GroupItemStyled {...rest}>
      {rest.color && <span className="color-bar" />}
      {label}
    </GroupItemStyled>
  );
};

export default GroupItem;
