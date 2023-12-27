import { Key, MouseEvent } from 'react';

import { Table, TableProps } from 'antd';

import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';

import { getColumns, DateTableData, getDataSource } from './config';
import { DateTableStyled } from './styled';

export interface DateTableProps {
  employees?: EmployeeData[];
  attendances?: AttendanceData[];
  disabledSelect?: boolean;
  selectedEmployeeIds?: string[];
  onSelect?: (employees: EmployeeData[]) => void;
  onClickName?: (employee: EmployeeData) => void;
  onContextMenu?: (event: MouseEvent, employee: EmployeeData) => void;
}

const DateTable = ({
  employees = [],
  attendances = [],
  disabledSelect,
  selectedEmployeeIds,
  onSelect,
  onClickName,
  onContextMenu,
}: DateTableProps) => {
  const handleSelectedChange = (_: Key[], datas: DateTableData[]) => {
    const selectedEmployees = datas.map(data => data.employee);
    onSelect?.(selectedEmployees);
  };

  const tableProps: TableProps<DateTableData> = {
    onRow: row => ({
      onContextMenu: event => onContextMenu?.(event, row.employee),
    }),
    rowSelection: {
      selectedRowKeys: selectedEmployeeIds,
      onChange: handleSelectedChange,
      getCheckboxProps: () => ({ disabled: disabledSelect }),
    },
    columns: getColumns({
      employees: employees,
      onClickName: onClickName,
    }),
    dataSource: getDataSource(employees, attendances),
  };

  return (
    <DateTableStyled className="DateTable">
      <Table
        pagination={false}
        showSorterTooltip={false}
        scroll={{ x: '100%', y: '100%' }}
        {...tableProps}
      />
    </DateTableStyled>
  );
};

export default DateTable;
