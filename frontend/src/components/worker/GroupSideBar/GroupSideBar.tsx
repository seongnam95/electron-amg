import { MouseEvent, useMemo } from 'react';

import { Divider, Skeleton } from 'antd';

import Button from '~/components/common/Button';
import { GroupData } from '~/types/group';

import GroupItem from './GroupItem/GroupItem';
import { GroupSideBarStyled } from './styled';

export interface GroupSideBarProps {
  isLoading?: boolean;
  groups?: GroupData[];
  selected?: string;
  onCreate?: () => void;
  onChange?: (e: MouseEvent<HTMLLIElement>) => void;
}

const GroupSideBar = ({ isLoading, groups, selected, onCreate, onChange }: GroupSideBarProps) => {
  const menus = useMemo(() => {
    return groups?.map((group: GroupData) => {
      return {
        id: group.id.toString(),
        label: group.name,
        color: group.hexColor,
      };
    });
  }, [groups]);

  return (
    <GroupSideBarStyled className="GroupSideBar">
      <ul className="menu-wrap">
        <GroupItem id="all" label="전체" activate={selected === 'all'} onClick={onChange} />
        <Divider style={{ margin: '12px 0' }} />

        {isLoading ? (
          <Skeleton active />
        ) : menus && menus?.length !== 0 ? (
          <section className="menus">
            {menus.map(menu => (
              <GroupItem
                id={menu.id}
                key={menu.id}
                color={menu.color}
                label={menu.label}
                activate={selected === menu.id}
                onClick={onChange}
              />
            ))}

            <Divider style={{ margin: '12px 0' }} />
            <GroupItem id="etc" label="기타" activate={selected === 'etc'} onClick={onChange} />
          </section>
        ) : (
          <span className="empty-text">그룹 없음</span>
        )}
      </ul>

      <Button fullWidth onClick={onCreate} primary variations="outline">
        그룹 추가
        <i className="bx bx-plus" />
      </Button>
    </GroupSideBarStyled>
  );
};

export default GroupSideBar;
