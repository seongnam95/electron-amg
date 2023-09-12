import { useMemo } from 'react';

import { Dropdown } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import clsx from 'clsx';
import { CSSProperties } from 'styled-components';

import Button from '~/components/common/Button';
import Chip from '~/components/common/Chip';
import { WorkerData, POSITION_CODE } from '~/types/worker';
import { formatPhoneNumber } from '~/utils/formatData';

import { WorkerListItemStyled } from './styled';

export interface WorkerListItemProps {
  worker: WorkerData;
  className?: string;
  checked?: boolean;
  onChecked?: (e: CheckboxChangeEvent) => void;
}

const WorkerListItem = ({ className, worker, checked, onChecked }: WorkerListItemProps) => {
  const menuItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '32px',
    padding: '0 4px',
  };

  const items: ItemType[] = useMemo(
    () => [
      {
        key: 'create-contract',
        label: (
          <p style={menuItemStyle}>
            <i className="bx bx-dock-top" />
            그룹 이동
          </p>
        ),
      },
      {
        key: 'group-edit',
        label: (
          <p style={menuItemStyle}>
            <i className="bx bx-edit" />
            그룹 편집
          </p>
        ),
      },
      {
        key: 'group-remove',
        danger: true,
        label: (
          <p style={menuItemStyle}>
            <i className="bx bx-trash" />
            그룹 삭제
          </p>
        ),
      },
    ],
    [],
  );

  return (
    <WorkerListItemStyled className={clsx('WorkerListItem', className)}>
      <Checkbox id={worker.id} onChange={onChecked} checked={checked} />
      <span className="item name">{worker.name}</span>
      <span className="item position">{POSITION_CODE[worker.positionCode]}</span>
      <span className="item phone">{formatPhoneNumber(worker.phone)}</span>
      <Chip $palette="warning">계약 종료</Chip>
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomLeft">
        <Button $variations="icon" $btnSize="small">
          <i className="bx bx-dots-vertical-rounded" />
        </Button>
      </Dropdown>
    </WorkerListItemStyled>
  );
};

export default WorkerListItem;
