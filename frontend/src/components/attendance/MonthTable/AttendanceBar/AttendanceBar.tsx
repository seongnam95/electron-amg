import { HTMLAttributes } from 'react';

import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';

import { AttendanceBarStyled } from './styled';

interface AttendanceBarProps extends HTMLAttributes<HTMLDivElement> {
  employee: EmployeeData;
  attendances: AttendanceData[];
  cellWidth: number;
}

const AttendanceBar = ({ employee, attendances, cellWidth, ...props }: AttendanceBarProps) => {
  const width = attendances.length * cellWidth;
  const color = employee.position.color;

  return (
    <AttendanceBarStyled style={{ width: width }} {...props}>
      <div className="attendance-bar" style={{ backgroundColor: color }} />
    </AttendanceBarStyled>
  );
};

export default AttendanceBar;
