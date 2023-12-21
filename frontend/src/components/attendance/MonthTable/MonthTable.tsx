import { MouseEvent, useMemo } from 'react';

import { Table, TableProps } from 'antd';
import { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { teamStore } from '~/stores/team';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';

import { MonthTableData, getColumns, getDataSource } from './config';
import { MonthTableStyled } from './styled';

export interface MonthTableProps {
  day: Dayjs;
  employees: EmployeeData[];
  attendances: AttendanceData[];
  loading?: boolean;
  onContextMenu?: (event: MouseEvent, employee: EmployeeData, day: Dayjs) => void;
}

const MonthTable = ({ day, employees, attendances, loading, onContextMenu }: MonthTableProps) => {
  const team = useRecoilValue(teamStore);

  const tableProps: TableProps<MonthTableData> = {
    pagination: false,
    scroll: { x: '100%', y: '100%' },
    showSorterTooltip: false,
    columns: useMemo(() => getColumns(day, { onContextMenu: onContextMenu }), []),
    dataSource: useMemo(() => getDataSource(team, employees, attendances), [attendances]),
  };

  return (
    <MonthTableStyled className="AttendanceTable">
      <Table loading={loading} {...tableProps} />
    </MonthTableStyled>
  );
};

export default MonthTable;
