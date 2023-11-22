import { useMemo } from 'react';

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
import { AttendanceBarStyled, MonthTableStyled } from './styled';
import { groupedAttendanceByDay } from './util';

export interface MonthTableProps {
  date: string;
  employees: EmployeeData[];
}

const MonthTable = ({ date, employees }: MonthTableProps) => {
  const scrollRef = useDragScroll();

  const team = useRecoilValue(teamStore);
  const { attendances } = useAttendanceQuery({
    date: date,
    teamId: team.id,
    enabled: team.id !== '',
  });

  const rowSelection: TableRowSelection<MonthTableData> = {
    onChange: (keys: React.Key[]) => console.log(keys),
  };

  const columns = getColumns({
    date: dayjs(date, 'YY-MM'),
    onCellContextMenu: (day, data) => console.log(data),
  });

  const dataSource: MonthTableData[] = useMemo(() => {
    return employees.map(employee => {
      const targetAttendances = attendances.filter(data => data.employeeId === employee.id);
      const workingGroups = groupedAttendanceByDay(targetAttendances);

      // Attendance Bar 그룹핑
      const existAttendances: { [key: string]: AttendanceData[] } = {};

      workingGroups.forEach(group => {
        const firstDate = dayjs(group[0].workingDate, 'YY-MM-DD').date();
        existAttendances[firstDate] = group;
      });

      // 합계액
      const paySum = targetAttendances.reduce((total, value) => total + value.pay, 0);
      const incomeTax = paySum * 0.033;
      const totalPay = paySum - incomeTax;

      return {
        key: employee.id,
        name: employee.name,
        employee: employee,
        paySum: paySum,
        incomeTax: incomeTax,
        totalPay: totalPay,
        attendances: targetAttendances,
        ...existAttendances,
      };
    });
  }, [attendances]);

  return (
    <MonthTableStyled className="AttendanceTable" ref={scrollRef}>
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        // onRow={data => {
        //   return {

        //     onContextMenu: () => console.log(data),
        //   };
        // }}
      />
    </MonthTableStyled>
  );
};

interface AttendanceBarProps {
  employee: EmployeeData;
  attendances: AttendanceData[];
  cellWidth: number;
}

export const AttendanceBar = ({ employee, attendances, cellWidth }: AttendanceBarProps) => {
  const width = attendances.length * cellWidth;
  const color = employee.position.color;

  return (
    <AttendanceBarStyled style={{ width: width }}>
      <div className="attendance-bar" style={{ backgroundColor: color }} />
    </AttendanceBarStyled>
  );
};

export default MonthTable;
