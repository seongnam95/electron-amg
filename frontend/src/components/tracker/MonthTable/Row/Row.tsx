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

  return (
    <RowStyled className="Row">
      <td>{name}</td>
    </RowStyled>
  );
};

export default Row;
