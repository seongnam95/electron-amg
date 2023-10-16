import dayjs from 'dayjs';

import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { WeekColorData } from '~/utils/commuteRange';

import { RowStyled } from './styled';

export interface RowProps {
  name: string;
  days: Array<WeekColorData>;
  attendances?: Array<AttendanceData>;
}

const Row = ({ days, name, attendances }: RowProps) => {
  const dayArray = Array.from({ length: days.length }, (_, index) => {
    console.log(_);
    index + 1;
  });

  const findWorkingRanges = (
    dataByEmployee: Record<string, AttendanceData[]>,
  ): Record<string, AttendanceData[][]> => {
    return Object.entries(dataByEmployee).reduce((acc, [employeeId, data]) => {
      const sortedData = data.sort((a, b) => a.workingDate.localeCompare(b.workingDate));
      const ranges = sortedData.reduce((acc, curr, i, arr) => {
        if (
          i === 0 ||
          curr.workingDate !==
            dayjs(arr[i - 1].workingDate)
              .add(1, 'day')
              .format('YYYYMMDD')
        ) {
          acc.push([curr]);
        } else {
          acc[acc.length - 1].push(curr);
        }
        return acc;
      }, [] as AttendanceData[][]);
      acc[employeeId] = ranges;
      return acc;
    }, {} as Record<string, AttendanceData[][]>);
  };

  return (
    <RowStyled className="Row">
      <td>{name}</td>
    </RowStyled>
  );
};

export default Row;
