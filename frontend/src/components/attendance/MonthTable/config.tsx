import { MouseEvent } from 'react';

import { Button, Flex, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';

import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { ReportData } from '~/types/statistics';
import { TeamData } from '~/types/team';
import { generateDays } from '~/utils/commuteRange';
import { getAttendanceStats } from '~/utils/statistics/report';

import AttendanceBar from './AttendanceBar';
import { groupedAttendanceByDay } from './util';

export interface MonthTableData {
  key: string;
  employee: EmployeeData;
  report: ReportData;
  attendances: AttendanceData[];
}

export const getDataSource = (
  team: TeamData,
  employees: EmployeeData[],
  attendances: AttendanceData[],
) => {
  const reports = employees.map(employee => {
    const filteredAttendances = attendances.filter(
      attendance => attendance.employeeId === employee.id,
    );

    const stats = getAttendanceStats(team, employee.position.standardPay, filteredAttendances);
    return { ...stats, target: employee };
  });

  return reports.map(report => {
    const { target: employee } = report;

    const targetAttendances = attendances.filter(data => data.employeeId === employee.id);
    const workingGroups = groupedAttendanceByDay(targetAttendances);

    const existAttendances: { [key: string]: AttendanceData[] } = {};

    workingGroups.forEach(group => {
      const firstDate = dayjs(group[0].workingDate, 'YY-MM-DD').date();
      existAttendances[firstDate] = group;
    });

    return {
      key: employee.id,
      employee: employee,
      attendances: targetAttendances,
      report: report,
      ...existAttendances,
    };
  });
};

interface ColumnProps {
  onContextMenu?: (event: MouseEvent, employee: EmployeeData, day: Dayjs) => void;
}

export const getColumns = (
  day: Dayjs,
  { onContextMenu }: ColumnProps,
): ColumnsType<MonthTableData> => {
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
      render: (attendances, { employee }) => {
        if (attendances) {
          return <AttendanceBar employee={employee} attendances={attendances} cellWidth={42} />;
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
      key: 'dailyPay',
      dataIndex: 'dailyPay',
      title: '수당 합계',
      width: 100,
      align: 'right',
      render: (_, { report }) => <>{report.dailyPay.toLocaleString()}</>,
    },
    {
      key: 'mealCost',
      dataIndex: 'mealCost',
      title: '식대',
      width: 90,
      align: 'right',
      render: (_, { report }) => <>{report.mealCost.toLocaleString()}</>,
    },
    {
      key: 'paySum',
      dataIndex: 'paySum',
      title: 'OT',
      width: 90,
      align: 'right',
      render: (_, { report }) => <>{report.otPay.toLocaleString()}</>,
    },
    {
      key: 'prepay',
      dataIndex: 'prepay',
      title: '선지급',
      width: 100,
      align: 'right',
      render: (_, { report }) => <>{report.prepay.toLocaleString()}</>,
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
      render: (_, { report }) => <b>{report.totalPaySum.toLocaleString()}</b>,
    },
  ];
};
