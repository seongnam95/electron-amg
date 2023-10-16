import { ReactNode } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import styled, { css } from 'styled-components';

import { EmployeeData } from '~/types/employee';
import { WeekColorData, generateWeekColorDays } from '~/utils/commuteRange';

import Row from './Row';
import { MonthTableStyled } from './styled';

export interface MonthTableProps {
  selectedDay: Dayjs;
  employees: Array<EmployeeData>;
}

const MonthTable = ({ selectedDay, employees }: MonthTableProps) => {
  const days = generateWeekColorDays(selectedDay);

  return (
    <MonthTableStyled className="MonthTable">
      <thead>
        <tr>
          <th className="name-column" />
          {days.map(day => (
            <th key={day.day} style={{ color: day.color }}>
              {day.day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {employees?.map((employee: EmployeeData) => (
          <Row
            key={'row' + employee.id}
            days={days}
            name={employee.name}
            attendances={employee.attendances}
          />
        ))}
      </tbody>
    </MonthTableStyled>
  );
};

const ColorBar = styled.span<{
  isRangeStart: boolean;
  isRangeEnd: boolean;
  color: string;
  hoverColor: string;
}>`
  display: flex;
  margin: auto;
  height: 1.6rem;

  background-color: ${p => p.color};
  transition: 140ms all;

  &:hover {
    background-color: ${p => p.hoverColor};
  }

  ${p =>
    p.isRangeStart &&
    css`
      margin-left: 1rem;
      border-top-left-radius: 0.4rem;
      border-bottom-left-radius: 0.4rem;
    `}

  ${p =>
    p.isRangeEnd &&
    css`
      margin-right: 1rem;
      border-top-right-radius: 0.4rem;
      border-bottom-right-radius: 0.4rem;
    `}
`;

export default MonthTable;
