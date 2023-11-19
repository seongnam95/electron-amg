import { Button, Flex, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';

import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { generateWeekColorDays } from '~/utils/commuteRange';

export interface MonthTableData {
  key: string;
  employee: EmployeeData;
  attendances: AttendanceData[];
  paySum: number;
  incomeTax: number;
  totalPay: number;
}

interface ColumnProps {
  date: Dayjs;
}

export const getColumns = ({ date }: ColumnProps): ColumnsType<MonthTableData> => {
  const days = generateWeekColorDays(date);

  const mapping: ColumnsType<MonthTableData> = days.map(day => {
    const isSaturday = day.dayOfWeek === '토';
    const isSunday = day.dayOfWeek === '일';
    const dayCellClassName = isSaturday ? 'saturday' : isSunday ? 'sunday' : '';

    return {
      key: day.day,
      className: clsx('day-cell', dayCellClassName),
      dataIndex: day.day,
      title: day.day,
      width: 40,
      align: 'center',
      render: (_, { attendances, employee }) => {
        const attendance = attendances.find(att => {
          const strSplit = att.workingDate.split('-');
          const workingDay = strSplit[strSplit.length - 1];

          return workingDay === day.day;
        });

        if (!attendance) return <></>;
        return (
          <Flex>
            <div style={{ background: 'red' }}></div>
          </Flex>
        );
      },
    };
  });

  return [
    {
      key: 'name',
      dataIndex: 'name',
      title: '이름',
      width: 110,
      ellipsis: true,
      sorter: (a, b) => a.employee.name.localeCompare(b.employee.name),
      render: (_, { employee }) => (
        <Button size="small" type="text">
          <b>{employee.name}</b>
        </Button>
      ),
    },
    ...mapping,
    {
      key: 'paySum',
      dataIndex: 'paySum',
      title: '일당 합계',
      width: 80,
      align: 'right',
      render: (_, { paySum }) => <>{paySum.toLocaleString()}</>,
    },
    {
      key: 'incomeTax',
      dataIndex: 'incomeTax',
      title: '소득세',
      width: 80,
      align: 'right',
      render: (_, { incomeTax }) => <>{incomeTax.toLocaleString()}</>,
    },
    {
      key: 'totalPay',
      dataIndex: 'totalPay',
      className: 'last-cell',
      title: '지급액 합계',
      width: 90,
      align: 'right',
      render: (_, { totalPay }) => <b>{totalPay.toLocaleString()}</b>,
    },
  ];
};
