import { useState } from 'react';

import { GroupItemStyled, GroupItemStyledProps } from './stlyed';

export interface GroupSideBarProps extends GroupItemStyledProps {
  id: string;
  label: string;
  onClick?: (id: string) => void;
}

const GroupItem = ({ id, label, onClick, ...rest }: GroupSideBarProps) => {
  const handleOnClick = () => onClick?.(id);
  return (
    <GroupItemStyled onClick={handleOnClick} {...rest}>
      {rest.color && <span className="color-bar" />}
      {label}
    </GroupItemStyled>
  );
};

export default GroupItem;
