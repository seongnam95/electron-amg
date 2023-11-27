import { useEffect, useRef } from 'react';

import clsx from 'clsx';
import dayjs from 'dayjs';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { TeamData } from '~/types/team';
import { generateDays } from '~/utils/commuteRange';

import { MonthTable2Styled } from './styled';
import { groupByEmployeeIdAndDate } from './util';

export interface MonthTable2Props {
  date: string;
  team?: TeamData;
  employees: EmployeeData[];
}

const MonthTable2 = ({ team, date, employees }: MonthTable2Props) => {
  const { attendances } = useAttendanceQuery({ teamId: team?.id, date: date, enabled: !!team });

  return (
    <MonthTable2Styled className="AttendanceTable">
      <table>
        <MonthTableHead date={date} />
        <MonthTableBody date={date} employees={employees} attendances={attendances} />
      </table>
    </MonthTable2Styled>
  );
};

const MonthTableHead = ({ date }: { date: string }) => {
  const dayArray = generateDays(dayjs(date, 'YY-MM'));
  const columns = [
    {
      key: 'name',
      title: '이름',
    },
    ...dayArray.map(day => {
      return {
        key: day.day,
        title: day.day,
      };
    }),
  ];

  return (
    <thead>
      <tr className="table-row">
        {columns.map(column => {
          return (
            <th key={column.key} className="table-cell">
              {column.title}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const MonthTableBody = ({
  date,
  employees,
  attendances,
}: {
  date: string;
  employees: EmployeeData[];
  attendances: AttendanceData[];
}) => {
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  const dataSource = groupByEmployeeIdAndDate(attendances);
  const dayArray = generateDays(dayjs(date, 'YY-MM'));

  const createRangeDiv = () => {
    dataSource.forEach(data => {
      data.workingDates.forEach(dates => {
        const day = dayjs(dates[0].workingDate, 'YY-MM-DD').date();
        const firstCell = document.getElementById(`${data.employeeId}-${day}`);
        let barElement, divWidth;

        if (firstCell) {
          divWidth = firstCell.clientWidth * dates.length - 10;

          barElement = document.createElement('div');
          barElement.style.width = `${divWidth}px`;
          barElement.className = 'attendance-bar attendance';

          firstCell.appendChild(barElement);
        }
      });
      data.incentives.forEach(dates => {
        const day = dayjs(dates[0].workingDate, 'YY-MM-DD').date();
        const firstCell = document.getElementById(`${data.employeeId}-${day}`);
        let barElement, divWidth;

        if (firstCell) {
          divWidth = firstCell.clientWidth * dates.length - 10;

          barElement = document.createElement('div');
          barElement.style.width = `${divWidth}px`;
          barElement.className = 'attendance-bar incentive';

          firstCell.appendChild(barElement);
        }
      });
      data.prePays.forEach(dates => {
        const day = dayjs(dates[0].workingDate, 'YY-MM-DD').date();
        const firstCell = document.getElementById(`${data.employeeId}-${day}`);
        let barElement, divWidth;

        if (firstCell) {
          divWidth = firstCell.clientWidth * dates.length - 10;

          barElement = document.createElement('div');
          barElement.style.width = `${divWidth}px`;
          barElement.className = 'attendance-bar prePay';

          firstCell.appendChild(barElement);
        }
      });
    });
  };

  useEffect(() => {
    createRangeDiv();
  }, [dataSource]);

  return (
    <tbody ref={tbodyRef}>
      {employees.map(employee => {
        return (
          <tr key={employee.id} className="table-row">
            <td className="table-cell first-cell">{employee.name}</td>
            {dayArray.map(day => (
              <td
                onClick={() => console.log(day)}
                className="table-cell"
                key={day.day}
                id={`${employee.id}-${day.day}`}
              ></td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default MonthTable2;
