import { HTMLAttributes, useMemo } from 'react';

import { Table } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import dayjs from 'dayjs';

import { useDragScroll } from '~/hooks/useDragScroll';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';

import { MonthTableData, getColumns } from './config';
import { AttendanceBarStyled, MonthTableStyled } from './styled';
import { groupedAttendanceByDay } from './util';

export interface MonthTableProps {
  dateStr: string;
  employees: EmployeeData[];
  attendances: AttendanceData[];
}

const MonthTable = ({ dateStr, employees, attendances }: MonthTableProps) => {
  const scrollRef = useDragScroll();

  const rowSelection: TableRowSelection<MonthTableData> = {
    onChange: (keys: React.Key[]) => console.log(keys),
  };

  const columns = getColumns({
    date: dayjs(dateStr, 'YY-MM'),
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
      const paySum = targetAttendances.reduce(
        (total, value) => total + value.position.standardPay,
        0,
      );
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
      />
    </MonthTableStyled>
  );
};

interface AttendanceBarProps extends HTMLAttributes<HTMLDivElement> {
  employee: EmployeeData;
  attendances: AttendanceData[];
  cellWidth: number;
}

export const AttendanceBar = ({
  employee,
  attendances,
  cellWidth,
  ...props
}: AttendanceBarProps) => {
  const width = attendances.length * cellWidth;
  const color = employee.position.color;

  return (
    <AttendanceBarStyled style={{ width: width }} {...props}>
      <div className="attendance-bar" style={{ backgroundColor: color }} />
    </AttendanceBarStyled>
  );
};

export default MonthTable;
