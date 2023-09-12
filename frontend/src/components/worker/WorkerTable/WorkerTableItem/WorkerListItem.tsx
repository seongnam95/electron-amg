import { memo } from 'react';

import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';

import Button from '~/components/common/Button';
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
  return (
    <WorkerListItemStyled className={clsx('WorkerListItem', className)}>
      <Checkbox id={worker.id} onChange={onChecked} checked={checked} />
      <span className="item name">{worker.name}</span>
      <span className="item position">{POSITION_CODE[worker.positionCode]}</span>
      <span className="item phone">{formatPhoneNumber(worker.phone)}</span>
      <Button btnSize="small" bgColor="transparent" hoverColor="transparent">
        <i className="bx bx-dots-vertical-rounded" />
      </Button>
    </WorkerListItemStyled>
  );
};

export default memo(WorkerListItem);
