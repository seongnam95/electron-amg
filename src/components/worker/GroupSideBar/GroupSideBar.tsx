import { useState } from 'react';

import { Divider, Empty } from 'antd';
import clsx from 'clsx';
import { useRecoilValue } from 'recoil';

import Button from '~/components/common/Button';
import { groupState } from '~/stores/group';

import GroupItem from './GroupItem/GroupItem';
import { GroupSideBarStyled } from './styled';

export interface GroupSideBarProps {
  onChange?: (id: string) => void;
}

const GroupSideBar = ({ onChange }: GroupSideBarProps) => {
  const [selectedId, setSelectedId] = useState<string>('all');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const groups = useRecoilValue(groupState);

  const handleOnClickGroup = (id: string) => {
    if (isEditing) {
    } else {
      setSelectedId(id);
      onChange?.(id);
    }
  };

  return (
    <GroupSideBarStyled className={clsx('GroupSideBar', isEditing && 'editing')}>
      {groups.length ? (
        <ul className="menus">
          <GroupItem
            id="all"
            label="전체"
            activated={selectedId === 'all'}
            onClick={handleOnClickGroup}
          />

          <Divider style={{ margin: '12px 0' }} />

          {groups.map(group => (
            <GroupItem
              id={group.id}
              key={group.id}
              color={group.hexColor}
              label={group.name}
              activated={selectedId === group.id}
              onClick={handleOnClickGroup}
            />
          ))}

          <Divider style={{ margin: '12px 0' }} />

          <GroupItem
            id="etc"
            label="기타"
            activated={selectedId === 'etc'}
            onClick={handleOnClickGroup}
          />
        </ul>
      ) : (
        <div className="empty-group-wrap">
          <Empty description="그룹 없음" />
        </div>
      )}

      <Button styled={{ fullWidth: true }} onClick={() => setIsEditing(!isEditing)}>
        그룹 추가
        <i className="bx bx-plus" />
      </Button>
    </GroupSideBarStyled>
  );
};

export default GroupSideBar;
