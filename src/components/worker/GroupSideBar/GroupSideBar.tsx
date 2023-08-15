import { useEffect, useState } from 'react';

import { Divider, Menu } from 'antd';
import clsx from 'clsx';
import { useRecoilValue } from 'recoil';

import Button from '~/components/common/Button';
import { groupState } from '~/stores/group';

import WorkerModal from '../WorkerModal/WorkerModal';
import GroupItem from './GroupItem/GroupItem';
import { GroupSideBarStyled } from './styled';

export interface GroupSideBarProps {
  className?: string;
  onChange?: (id: string) => void;
}

const GroupSideBar = ({ className, onChange }: GroupSideBarProps) => {
  const [selectedId, setSelectedId] = useState<string>('all');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const groups = useRecoilValue(groupState);
  console.log(groups);

  const handleOnClickGroup = (id: string) => {
    if (isEditing) {
    } else {
      setSelectedId(id);
      onChange?.(id);
    }
  };

  return (
    <GroupSideBarStyled className={clsx('GroupSideBar', isEditing && 'editing')}>
      <ul className="menus">
        <GroupItem
          id="all"
          label="전체"
          activated={selectedId === 'all'}
          onClick={handleOnClickGroup}
        />

        <Divider style={{ margin: '12px 0' }} />

        {groups.length ? (
          groups.map(group => (
            <GroupItem
              id={group.id}
              key={group.id}
              color={group.hexColor}
              label={group.name}
              activated={selectedId === group.id}
              onClick={handleOnClickGroup}
            />
          ))
        ) : (
          <li className="item blank-label">그룹 없음</li>
        )}

        <Divider style={{ margin: '12px 0' }} />

        <GroupItem
          id="etc"
          label="기타"
          activated={selectedId === 'etc'}
          onClick={handleOnClickGroup}
        />
      </ul>

      <Button styled={{ fullWidth: true }} onClick={() => setIsEditing(!isEditing)}>
        그룹 추가
        <i className="bx bx-plus" />
      </Button>
    </GroupSideBarStyled>
  );
};

export default GroupSideBar;
