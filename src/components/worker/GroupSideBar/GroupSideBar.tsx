import { MouseEvent } from 'react';

import { Divider } from 'antd';

import Button from '~/components/common/Button';
import { GroupData } from '~/types/group';

import GroupItem from './GroupItem/GroupItem';
import { GroupSideBarStyled } from './styled';

export interface GroupSideBarProps {
  groups?: GroupData[];
  selected?: string;
  onCreate?: () => void;
  onChange?: (id: string) => void;
}

const GroupSideBar = ({ groups, selected, onCreate, onChange }: GroupSideBarProps) => {
  const handleOnClickGroup = (e: MouseEvent<HTMLDivElement>) => {
    onChange?.(e.currentTarget.id);
  };

  // TODO: 스켈레톤 로딩 구현
  return (
    <GroupSideBarStyled className="GroupSideBar">
      <div className="menu-wrap">
        <GroupItem
          id="all"
          label="전체"
          activated={selected === 'all'}
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
                activated={selected === group.id}
                onClick={handleOnClickGroup}
              />
            ))}

            <Divider style={{ margin: '12px 0' }} />
            <GroupItem
              id="etc"
              label="기타"
              activated={selected === 'etc'}
              onClick={handleOnClickGroup}
            />
          </div>
        )}
      </div>

      <Button onClick={onCreate} styled={{ fullWidth: true, variations: 'default' }}>
        그룹 생성
        <i className="bx bx-plus" />
      </Button>
    </GroupSideBarStyled>
  );
};

export default GroupSideBar;
