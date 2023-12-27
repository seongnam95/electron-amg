import { HTMLAttributes } from 'react';

import { AttendanceData } from '~/types/attendance';

import { AttendanceBarStyled } from './styled';

interface AttendanceBarProps extends HTMLAttributes<HTMLDivElement> {
  attendances: AttendanceData[];
  cellWidth: number;
}

const AttendanceBar = ({ color, attendances, cellWidth, ...props }: AttendanceBarProps) => {
  const width = attendances.length * cellWidth;

  return (
    <AttendanceBarStyled style={{ width: width }} {...props}>
      <div className="attendance-bar" style={{ backgroundColor: color }} />
    </AttendanceBarStyled>
  );
};

export default AttendanceBar;
