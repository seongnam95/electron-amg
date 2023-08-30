import { MouseEvent, useMemo } from 'react';

import { Divider } from 'antd';

import Button from '~/components/common/Button';
import { GroupData } from '~/types/group';

import GroupItem from './GroupItem/GroupItem';
import { GroupSideBarStyled } from './styled';

export interface GroupSideBarProps {
  groups?: GroupData[];
  selected?: string;
  onCreate?: () => void;
  onChange?: (e: MouseEvent<HTMLLIElement>) => void;
}

const GroupSideBar = ({ groups, selected, onCreate, onChange }: GroupSideBarProps) => {
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

        {menus && menus?.length !== 0 ? (
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
            <GroupItem
              id="etc"
              label="기타 / 소속없음"
              activate={selected === 'etc'}
              onClick={onChange}
            />
          </section>
        ) : (
          <span className="empty-text">그룹 없음</span>
        )}
      </ul>

      <Button onClick={onCreate} styled={{ fullWidth: true, variations: 'default' }}>
        그룹 생성
        <i className="bx bx-plus" />
      </Button>
    </GroupSideBarStyled>
  );
};

export default GroupSideBar;
