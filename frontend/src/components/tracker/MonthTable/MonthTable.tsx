import { ForwardedRef, useEffect } from 'react';

import { Table } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import dayjs from 'dayjs';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useDragScroll } from '~/hooks/useDragScroll';
import { EmployeeData } from '~/types/employee';
import { TeamData } from '~/types/team';

import { MonthTableData, getColumns } from './config';
import { MonthTableStyled } from './styled';

export interface MonthTableProps {
  date: string;
  team?: TeamData;
  employees: EmployeeData[];
}

const MonthTable = ({ team, date, employees }: MonthTableProps) => {
  const { attendances } = useAttendanceQuery({ teamId: team?.id, date: date, enabled: !!team });

  const scrollRef = useDragScroll();

  useEffect(() => {}, []);

  const rowSelection: TableRowSelection<MonthTableData> = {
    onChange: (keys: React.Key[]) => console.log(keys),
  };

  const columns = getColumns({
    date: dayjs(date, 'YY-MM'),
  });

  const dataSource: MonthTableData[] = employees.map(employee => {
    const targetAttendances = attendances.filter(data => data.employeeId === employee.id);

    const paySum = targetAttendances.reduce((total, value) => total + value.pay, 0);
    const incomeTax = paySum * 0.033;
    const totalPay = paySum - incomeTax;

    return {
      key: employee.id,
      employee: employee,
      attendances: targetAttendances,
      paySum: paySum,
      incomeTax: incomeTax,
      totalPay: totalPay,
    };
  });

  return (
    <MonthTableStyled className="AttendanceTable" ref={scrollRef}>
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
      />
    </MonthTableStyled>
  );
};

export default MonthTable;
