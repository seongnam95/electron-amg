import { useState, MouseEvent } from 'react';
import { useQuery } from 'react-query';

import { Divider } from 'antd';

import { fetchGroups } from '~/api/group';
import Button from '~/components/common/Button';

import GroupItem from './GroupItem/GroupItem';
import { GroupSideBarStyled } from './styled';

export interface GroupSideBarProps {
  onChange?: (id: string) => void;
}

const GroupSideBar = ({ onChange }: GroupSideBarProps) => {
  const [selectedId, setSelectedId] = useState<string>('all');
  const { data: groups, isLoading } = useQuery('groupQuery', fetchGroups);

  const handleOnClickGroup = (e: MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;
    setSelectedId(id);
    onChange?.(id);
  };

  // TODO: 스켈레톤 로딩 구현
  if (isLoading) return <>로딩중</>;
  return (
    <GroupSideBarStyled className="GroupSideBar">
      <div className="menu-wrap">
        <GroupItem
          id="all"
          label="전체"
          activated={selectedId === 'all'}
          onClick={handleOnClickGroup}
        />
        <Divider style={{ margin: '12px 0' }} />

        {groups && groups.length !== 0 && (
          <div className="menus">
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
          </div>
        )}
      </div>

      <Button styled={{ fullWidth: true, variations: 'default' }}>
        그룹 생성
        <i className="bx bx-plus" />
      </Button>
    </GroupSideBarStyled>
  );
};

export default GroupSideBar;
