import { useEffect, useRef } from 'react';

import dayjs from 'dayjs';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { TeamData } from '~/types/team';
import { generateWeekColorDays } from '~/utils/commuteRange';

import { MonthTable2Styled } from './styled';
import { groupByEmployeeIdAndDate } from './util';

const test = [
  {
    employeeId: 'asdasd',
    workingDates: [
      [
        {
          workingDate: '23-11-01',
        },
        {
          workingDate: '23-11-02',
        },
        {
          workingDate: '23-11-03',
        },
      ],
      [
        {
          workingDate: '23-11-11',
        },
        {
          workingDate: '23-11-12',
        },
      ],
    ],
    incentives: [
      [
        {
          workingDate: '23-11-01',
        },
        {
          workingDate: '23-11-02',
        },
      ],
      [
        {
          workingDate: '23-11-12',
        },
      ],
    ],
  },
  {
    employeeId: 'asdasd',
    workingDates: [
      [
        {
          workingDate: '23-11-01',
        },
        {
          workingDate: '23-11-02',
        },
        {
          workingDate: '23-11-03',
        },
      ],
      [
        {
          workingDate: '23-11-11',
        },
        {
          workingDate: '23-11-12',
        },
      ],
    ],
    incentives: [
      [
        {
          workingDate: '23-11-05',
        },
        {
          workingDate: '23-11-06',
        },
      ],
      [
        {
          workingDate: '23-11-12',
        },
      ],
    ],
  },
];

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
  const dayArray = generateWeekColorDays(dayjs(date, 'YY-MM'));
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
  const dayArray = generateWeekColorDays(dayjs(date, 'YY-MM'));

  const createRangeDiv = () => {
    dataSource.map(data => {
      data.workingDates.map(date => {
        const day = dayjs(date[0].workingDate, 'YY-MM-DD').date();
        const firstCell = document.getElementById(`${data.employeeId}-${day}`);
        let barElement, divWidth;

        if (firstCell) {
          divWidth = firstCell.clientWidth * date.length - 10;

          barElement = document.createElement('div');
          barElement.style.width = `${divWidth}px`;
          barElement.className = 'attendances-bar';
          barElement.style.height = '20px';
          barElement.style.background = '#326CF9';
          barElement.style.borderRadius = '3px';
          barElement.style.position = 'absolute';
          barElement.style.left = '5px';
          barElement.style.top = '0';

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
          <tr key={employee.id}>
            <td>{employee.name}</td>
            {dayArray.map(day => (
              <td key={day.day} id={`${employee.id}-${day.day}`}></td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default MonthTable2;
