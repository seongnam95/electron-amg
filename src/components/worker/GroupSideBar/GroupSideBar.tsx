import { ReactNode, useEffect, useState } from 'react';

import { Divider } from 'antd';
import clsx from 'clsx';
import { useRecoilValue } from 'recoil';

import { groupQuery } from '~/stores/group';
import { GroupData } from '~/types/group';

import { GroupSideBarStyled } from './styled';

export interface GroupSideBarProps {
  className?: string;
}

const GroupSideBar = ({ className }: GroupSideBarProps) => {
  const [selected, setSelected] = useState<GroupData>();
  const groups = useRecoilValue(groupQuery);

  useEffect(() => {
    setSelected(groups[0]);
  }, []);

  const handleOnClickGroup = (group: GroupData) => {
    setSelected(group);
  };

  return (
    <GroupSideBarStyled className={clsx('GroupSideBar', className)}>
      <li
        className={clsx('item', selected === group && 'active')}
        onClick={() => handleOnClickGroup(group)}
      >
        {group.name}
      </li>
      <Divider />
      <ul className="menus">
        {groups.map(group => (
          <li
            key={group.id}
            className={clsx('item', selected === group && 'active')}
            onClick={() => handleOnClickGroup(group)}
          >
            {group.name}
          </li>
        ))}
      </ul>
      <Divider />
    </GroupSideBarStyled>
  );
};

export default GroupSideBar;
