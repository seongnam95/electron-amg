import { useMemo } from 'react';

import { Dropdown } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import clsx from 'clsx';
import { CSSProperties } from 'styled-components';

import Button from '~/components/common/Button';
import Chip from '~/components/common/Chip';
import { useWorklogMutation, worklogKeys } from '~/hooks/queryHooks/useWorklogQuery';
import { POSITION_CODE, POSITION_COLORS } from '~/types/contract';
import { EmployeeData } from '~/types/employee';
import { formatPhoneNumber } from '~/utils/formatData';

import { EmployeeListItemStyled } from './styled';

export interface EmployeeListItemProps {
  employee: EmployeeData;
  className?: string;
  checked?: boolean;
  onChecked?: (e: CheckboxChangeEvent) => void;
}

const EmployeeListItem = ({ className, employee, checked, onChecked }: EmployeeListItemProps) => {
  const { contract, worklog } = employee;
  const isWorking = !!worklog;
  const { createWorklogMutate, removeWorklogMutate } = useWorklogMutation(
    isWorking ? worklogKeys.byId(worklog.id) : worklogKeys.all,
  );

  const handleAttendance = () => {
    if (isWorking) removeWorklogMutate(worklog.id);
    else
      createWorklogMutate({
        wage: contract.defaultWage,
        positionCode: contract.positionCode,
      });
  };

  return (
    <EmployeeListItemStyled className={clsx('EmployeeListItem', className)}>
      <td>
        <Checkbox id={employee.id} onChange={onChecked} checked={checked} />
      </td>
      <td>
        <div className="employee-name">
          <Chip
            $color="white"
            $borderColor="transparent"
            $bgColor={POSITION_COLORS[contract.positionCode]}
          >
            {POSITION_CODE[contract.positionCode]}
          </Chip>
          <span>{employee.name}</span>
        </div>
      </td>
      <td>{formatPhoneNumber(employee.phone)}</td>
      <td>{employee.residence}</td>
      <td className="text-accent">{contract.groupName}</td>
      <td>
        <button className={clsx('commute-btn', worklog && 'working')} onClick={handleAttendance}>
          {worklog ? '출근취소' : '출근처리'}
        </button>
      </td>
    </EmployeeListItemStyled>
  );
};

export default EmployeeListItem;
