import { Button, Flex, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';

import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { generateDays } from '~/utils/commuteRange';

import { AttendanceBar } from './MonthTable';

export interface MonthTableData {
  key: string;
  employee: EmployeeData;
  paySum: number;
  incomeTax: number;
  totalPay: number;
  attendances: AttendanceData[];
}

interface ColumnProps {
  date: Dayjs;
  onCellContextMenu?: (day: Dayjs, data: MonthTableData) => void;
}

export const getColumns = ({
  date,
  onCellContextMenu,
}: ColumnProps): ColumnsType<MonthTableData> => {
  const days = generateDays(date);

  const dayColumns: ColumnsType<MonthTableData> = days.map(day => {
    const isSaturday = day.dayOfWeek === '토';
    const isSunday = day.dayOfWeek === '일';
    const dayCellClassName = isSaturday ? 'saturday' : isSunday ? 'sunday' : '';

    return {
      key: day.dayNum,
      className: clsx('day', dayCellClassName),
      dataIndex: day.dayNum,
      title: day.dayNum,
      width: 40,
      align: 'center',
      onCell: data => ({
        onContextMenu: () => onCellContextMenu?.(day.day, data),
      }),
      render: (attendances, { employee }) => {
        if (attendances) {
          return <AttendanceBar employee={employee} attendances={attendances} cellWidth={40} />;
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
      ellipsis: true,
      sorter: (a, b) => a.employee.name.localeCompare(b.employee.name),
      render: (_, { key, employee }) => {
        return (
          <Button size="small" type="text">
            <b>{employee.name}</b>
          </Button>
        );
      },
    },
    ...dayColumns,
    {
      key: 'paySum',
      dataIndex: 'paySum',
      title: '수당 합계',
      width: 100,
      align: 'right',
      render: (_, { paySum }) => <>{paySum.toLocaleString()}</>,
    },
    {
      key: 'incomeTax',
      dataIndex: 'incomeTax',
      title: '소득세 합계',
      width: 90,
      align: 'right',
      render: (_, { incomeTax }) => <>{incomeTax.toLocaleString()}</>,
    },
    {
      key: 'totalPay',
      dataIndex: 'totalPay',
      className: 'amount-paid',
      title: '지급액 합계',
      width: 110,
      align: 'right',
      render: (_, { totalPay }) => <b>{totalPay.toLocaleString()}</b>,
    },
  ];
};
