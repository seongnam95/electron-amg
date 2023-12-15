import { MouseEvent, useMemo } from 'react';

import { Table, TableProps } from 'antd';
import { Dayjs } from 'dayjs';

import { useDragScroll } from '~/hooks/useDragScroll';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';

import { MonthTableData, getColumns, getDataSource } from './config';
import { MonthTableStyled } from './styled';

export interface MonthTableProps {
  day: Dayjs;
  employees: EmployeeData[];
  attendances: AttendanceData[];
  onContextMenu?: (event: MouseEvent, employee: EmployeeData, day: Dayjs) => void;
}

const MonthTable = ({ day, employees, attendances, onContextMenu }: MonthTableProps) => {
  const scrollRef = useDragScroll();

  const tableProps: TableProps<MonthTableData> = {
    rowSelection: { onChange: (keys: React.Key[]) => console.log(keys) },
    columns: getColumns(day, { onContextMenu: onContextMenu }),
    dataSource: useMemo(() => getDataSource(employees, attendances), [attendances]),
  };

  return (
    <MonthTableStyled className="AttendanceTable" ref={scrollRef}>
      <Table pagination={false} {...tableProps} />
    </MonthTableStyled>
  );
};

export default MonthTable;
