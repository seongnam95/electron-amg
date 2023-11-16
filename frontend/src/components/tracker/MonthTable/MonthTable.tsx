import { ReactNode } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import styled, { css } from 'styled-components';

import { EmployeeData } from '~/types/employee';
import { TeamData } from '~/types/team';
import { WeekColorData, generateWeekColorDays } from '~/utils/commuteRange';

import Row from './Row';
import { MonthTableStyled } from './styled';

export interface MonthTableProps {
  team?: TeamData;
  date?: string;
  employees?: Array<EmployeeData>;
}

const MonthTable = ({ date, employees }: MonthTableProps) => {
  const days = generateWeekColorDays(dayjs(date, 'YY-MM'));

  return (
    <MonthTableStyled className="AttendanceTable">
      <table>
        <thead>
          <tr>
            <th className="name-column" />
            {days.map(day => (
              <th key={day.day}>{day.day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee: EmployeeData) => (
            <Row key={'row' + employee.id} days={days} name={employee.name} />
          ))}
        </tbody>
      </table>
    </MonthTableStyled>
  );
};

export default MonthTable;
