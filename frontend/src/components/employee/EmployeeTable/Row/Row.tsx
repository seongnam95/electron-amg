import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';

import Chip from '~/components/common/Chip';
import { employeeKeys, useEmployeeMutation } from '~/hooks/queryHooks/useEmployeeQuery';
import { POSITION_CODE, POSITION_COLORS } from '~/types/contract';
import { EmployeeData } from '~/types/employee';
import { formatPhoneNumber } from '~/utils/formatData';

import { RowStyled } from './styled';

export interface RowProps {
  employee: EmployeeData;
  className?: string;
  checked?: boolean;
  onAttendance?: (employeeId: string) => void;
  onAttendanceCancel?: (employeeId: string) => void;
  onChecked?: (e: CheckboxChangeEvent) => void;
}

const Row = ({
  className,
  employee,
  checked,
  onAttendance,
  onAttendanceCancel,
  onChecked,
}: RowProps) => {
  const { contract, worklog } = employee;
  const isWorking = !!worklog;

  const { removeEmployeeMutate } = useEmployeeMutation(employeeKeys.byId(employee.id));

  // 출근 처리
  const handleAttendance = () => {};

  // 퇴근 처리
  const handleAttendanceCancel = () => {
    removeEmployeeMutate(worklog?.id);
  };

  return (
    <RowStyled className={clsx('Row', className)}>
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
        {isWorking ? (
          <button className="commute-btn" onClick={handleAttendance}>
            출근
          </button>
        ) : (
          <button className="commute-btn" onClick={handleAttendanceCancel}>
            취소
          </button>
        )}
      </td>
    </RowStyled>
  );
};

export default Row;
