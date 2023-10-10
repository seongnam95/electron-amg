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
  id: string;
  className?: string;
  checked?: boolean;
  onChecked?: (e: CheckboxChangeEvent) => void;
}

const Row = ({ id, className, employee, checked, onChecked }: RowProps) => {
  const { contract, worklog } = employee;
  const isWorking = !!worklog;

  const { createWorkLogMutate, removeWorkLogMutate } = useEmployeeMutation([]);

  // 출근 처리
  const handleAttendance = () => {
    if (contract)
      createWorkLogMutate({
        employeeId: employee.id,
        body: {
          positionCode: contract.positionCode,
          wage: contract.defaultWage,
        },
      });
  };

  // 퇴근 처리
  const handleAttendanceCancel = () => {
    if (worklog) removeWorkLogMutate(worklog?.id);
  };

  return (
    <RowStyled className={clsx('Row', className)}>
      <td>
        <Checkbox id={id} onChange={onChecked} checked={checked} />
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
      <td>{formatPhoneNumber(employee.phone)}</td>
      <td>{employee.residence}</td>
      <td className="text-accent">{contract ? contract.groupName : '소속 없음'}</td>
      <td>
        {!isWorking ? (
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
