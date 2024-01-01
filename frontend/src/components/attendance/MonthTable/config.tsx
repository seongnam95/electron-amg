import { MouseEvent } from 'react';

import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';

import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { ReportData } from '~/types/statistics';
import { TeamData } from '~/types/team';
import { generateDays } from '~/utils/commuteRange';
import { getStatsByEmployee } from '~/utils/statistics/report';

import AttendanceBar from './AttendanceBar';
import { AttendanceGroupData, groupedAttendanceByDay } from './util';

/** [ MonthTable ] 데이터 인터페이스*/
export interface MonthTableData {
  key: string;
  employee: EmployeeData;
  report: ReportData;
  attendances: AttendanceData[];
}

/**
 * [ MonthTable ] 데이터 소스를 반환합니다.
 * @param team 팀 데이터
 * @param employees 근로자 데이터 리스트
 * @param attendances 출근 기록 데이터 리스트
 * @returns {MonthTableData[]} MonthTableData[]
 */
export const getDataSource = (
  team: TeamData,
  employees: EmployeeData[],
  attendances: AttendanceData[],
): MonthTableData[] => {
  const employeeStats = getStatsByEmployee(team, employees, attendances);
  console.log(employeeStats);
  return employeeStats.map(stats => {
    const { employee, attendances, report } = stats;

    const workingGroups = groupedAttendanceByDay(attendances);
    const existAttendances: { [key: string]: AttendanceGroupData } = {};

    workingGroups.forEach(group => {
      const firstDate = dayjs(group.attendances[0].workingDate, 'YY-MM-DD').date();
      existAttendances[firstDate] = group;
    });

    return {
      key: employee.id,
      employee: employee,
      attendances: attendances,
      report: report,
      ...existAttendances,
    };
  });
};

/** [ MonthTable ] 컬럼 인터페이스 */
interface ColumnProps {
  day: Dayjs;
  onContextMenu?: (event: MouseEvent, employee: EmployeeData, day: Dayjs) => void;
}

/**
 * [ MonthTable ] 컬럼 데이터를 반환합니다.
 * @param ColumnProps 날짜, 대상 근로자 데이터, 핸들러
 */
export const getColumns = ({ day, onContextMenu }: ColumnProps): ColumnsType<MonthTableData> => {
  const days = generateDays(day);

  const dayColumns: ColumnsType<MonthTableData> = days.map(day => {
    const isSaturday = day.dayOfWeek === '토';
    const isSunday = day.dayOfWeek === '일';
    const dayCellClassName = isSaturday ? 'saturday' : isSunday ? 'sunday' : '';

    return {
      key: day.dayNum,
      className: clsx('day', dayCellClassName),
      dataIndex: day.dayNum,
      title: day.dayNum,
      width: 42,
      align: 'center',
      onCell: data => ({
        onContextMenu: event => onContextMenu?.(event, data.employee, day.day),
      }),
      render: attendances => {
        if (attendances) {
          return (
            <AttendanceBar
              color={attendances.position.color}
              attendances={attendances.attendances}
              cellWidth={42}
            />
          );
        }
      },
    };
  });

  return [
    {
      key: 'name',
      dataIndex: 'name',
      title: '이름',
      width: 90,
      fixed: 'left',
      ellipsis: true,
      sorter: (a, b) => a.employee.name.localeCompare(b.employee.name),
      render: (_, { employee }) => {
        return (
          <Button size="small" type="text">
            <b>{employee.name}</b>
          </Button>
        );
      },
    },
    ...dayColumns,
    {
      key: 'attendanceCount',
      dataIndex: 'attendanceCount',
      title: '계',
      width: 50,
      align: 'center',
      render: (_, { report }) => <b>{report.attendanceCount}</b>,
    },
    {
      key: 'dailyPay',
      dataIndex: 'dailyPay',
      title: '수당 합계',
      width: 100,
      align: 'right',
      render: (_, { report }) => <>{report.paySum.toLocaleString()}</>,
    },
    {
      key: 'mealCost',
      dataIndex: 'mealCost',
      title: '식대',
      width: 90,
      align: 'right',
      render: (_, { report }) => <>{report.mealCostSum.toLocaleString()}</>,
    },
    {
      key: 'paySum',
      dataIndex: 'paySum',
      title: 'OT',
      width: 90,
      align: 'right',
      render: (_, { report }) => <>{report.otPaySum.toLocaleString()}</>,
    },
    {
      key: 'prepay',
      dataIndex: 'prepay',
      title: '선지급',
      width: 100,
      align: 'right',
      render: (_, { report }) => <>{report.prepaySum.toLocaleString()}</>,
    },
    {
      key: 'incomeTax',
      dataIndex: 'incomeTax',
      title: '소득세',
      width: 90,
      align: 'right',
      render: (_, { report }) => <>{report.taxAmount.toLocaleString()}</>,
    },
    {
      key: 'totalPay',
      dataIndex: 'totalPay',
      className: 'amount-paid',
      title: '지급액',
      width: 110,
      fixed: 'right',
      align: 'right',
      render: (_, { report }) => <b>{report.finalPay.toLocaleString()}</b>,
    },
  ];
};
