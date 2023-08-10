import { useState } from 'react';

import { Divider } from 'antd';
import clsx from 'clsx';
import { useRecoilValue } from 'recoil';

import Button from '~/components/common/Button';
import { groupState } from '~/stores/group';

import { GroupSideBarStyled } from './styled';

export interface GroupSideBarProps {
  className?: string;
  onChange?: (id: string) => void;
}

const GroupSideBar = ({ className, onChange }: GroupSideBarProps) => {
  const [selectedId, setSelectedId] = useState<string>('all');
  const groups = useRecoilValue(groupState);
  console.log(groups);
  const handleOnClickGroup = (id: string) => {
    setSelectedId(id);
    onChange?.(id);
  };

  return (
    <GroupSideBarStyled className={clsx('GroupSideBar', className)}>
      <div className="menu-wrap">
        <li
          className={clsx('group-item', selectedId === 'all' && 'active')}
          onClick={() => handleOnClickGroup('all')}
        >
          전체
        </li>

        <ul className="menus">
          <Divider style={{ margin: '12px 0' }} />
          {groups ? (
            groups.map(group => (
              <li
                id={group.id}
                key={group.id}
                className={clsx('group-item', selectedId === group.id && 'active')}
                onClick={() => handleOnClickGroup(group.id)}
              >
                <span className="group-color-bar" style={{ backgroundColor: group.hexColor }} />
                {group.name}
              </li>
            ))
          ) : (
            <li className="group-item blank-label">그룹 없음</li>
          )}
          <Divider style={{ margin: '12px 0' }} />
        </ul>

        <li
          id="etc"
          className={clsx('group-item', selectedId === 'etc' && 'active')}
          onClick={() => handleOnClickGroup('etc')}
        >
          기타
        </li>
      </div>

      <Button styled={{ fullWidth: true }}>
        그룹 편집
        <i className="bx bx-edit" />
      </Button>
    </GroupSideBarStyled>
  );
};

export default GroupSideBar;
