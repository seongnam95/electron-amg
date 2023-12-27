import { MouseEvent, useEffect, useRef } from 'react';

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
    columns: getColumns({ day, onContextMenu: onContextMenu }),
    dataSource: getDataSource(team, employees, attendances),
  };

  return (
    <MonthTableStyled className="MonthTable">
      <Table
        loading={loading}
        pagination={false}
        showSorterTooltip={false}
        scroll={{ x: '100%', y: '100%' }}
        {...tableProps}
      />
    </MonthTableStyled>
  );
};

export default MonthTable;
