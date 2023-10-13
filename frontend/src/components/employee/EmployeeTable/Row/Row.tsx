import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';

import Chip from '~/components/common/Chip';
import { POSITION_CODE, POSITION_COLORS } from '~/types/contract';
import { EmployeeData } from '~/types/employee';
import { formatPhoneNumber } from '~/utils/formatData';

import { RowStyled } from './styled';

export interface RowProps {
  employee: EmployeeData;
  id: string;
  className?: string;
  checked?: boolean;
  onSelected?: (e: CheckboxChangeEvent) => void;
}

const Row = ({ id, className, employee, checked, onSelected }: RowProps) => {
  const { contract, isAttendance, hasContract } = employee;
  const stateText = !hasContract ? '계약만료' : '정상';
  const salaryText = contract
    ? contract.salary === 'daily'
      ? '일급'
      : contract.salary === 'weekly'
      ? '주급'
      : '월급'
    : '없음';

  return (
    <RowStyled className={clsx('Row', className)}>
      <td>
        <Checkbox id={id} onChange={onSelected} checked={checked} />
      </td>
      <td>
        <div className="employee-name">
          {contract ? (
            <Chip
              $color="white"
              $borderColor="transparent"
              $bgColor={POSITION_COLORS[contract.positionCode]}
            >
              {POSITION_CODE[contract.positionCode]}
            </Chip>
          ) : (
            <Chip>기타</Chip>
          )}

          <span>{employee.name}</span>
        </div>
      </td>
      <td className="cell-center">{formatPhoneNumber(employee.phone)}</td>
      <td className="text-accent">{contract ? contract.groupName : '소속 없음'}</td>
      <td>
        <div className="wage-wrap">
          <Chip>{salaryText}</Chip>
          <span>{contract ? `${Number(contract?.defaultWage).toLocaleString()}원` : '-'}</span>
        </div>
      </td>
      <td className="cell-center">3일</td>
      <td className="cell-center">
        <div className="center-wrap">
          <Chip style={{ width: '7rem' }}>{stateText}</Chip>
        </div>
      </td>
    </RowStyled>
  );
};

export default Row;
