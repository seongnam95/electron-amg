import { ForwardedRef, useEffect } from 'react';

import { Table } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useDragScroll } from '~/hooks/useDragScroll';
import { teamStore } from '~/stores/team';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';

import { MonthTableData, getColumns } from './config';
import { MonthTableStyled } from './styled';

export interface MonthTableProps {
  date: string;
  employees: EmployeeData[];
}

const MonthTable = ({ date, employees }: MonthTableProps) => {
  const team = useRecoilValue(teamStore);
  const { attendances } = useAttendanceQuery({
    date: date,
    teamId: team.id,
    enabled: team.id !== '',
  });

  const scrollRef = useDragScroll();

  const rowSelection: TableRowSelection<MonthTableData> = {
    onChange: (keys: React.Key[]) => console.log(keys),
  };

  const columns = getColumns({
    date: dayjs(date, 'YY-MM'),
  });

  const mappingDay = (attendances: AttendanceData[]) => {
    const sortedAttendances = attendances.sort(
      (a, b) =>
        dayjs(a.workingDate, 'YY-MM-DD').valueOf() - dayjs(b.workingDate, 'YY-MM-DD').valueOf(),
    );

    sortedAttendances.forEach((attendance, idx) => {
      const prev = sortedAttendances[idx - 1] || null;
      const prevDate = prev ? dayjs(prev.workingDate, 'YY-MM-DD').add(1, 'day') : null;
      const currDate = dayjs(attendance.workingDate, 'YY-MM-DD');

      let result: string[] = [];
      if (!prev || !prevDate?.isSame(currDate, 'day')) {
        result = [...result, attendance.workingDate];
      } else {
      }
    });
  };

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
