import { Key, MouseEvent } from 'react';

import { Table } from 'antd';

import { useDragScroll } from '~/hooks/useDragScroll';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';

import { getColumns, DateTableData } from './config';
import { DateTableStyled } from './styled';

export interface DateTableProps {
  employees: EmployeeData[];
  attendances: AttendanceData[];
  disabledSelect?: boolean;
  selectedEmployeeIds?: string[];
  onSelect?: (employees: EmployeeData[]) => void;
  onClickName?: (employee: EmployeeData) => void;
  onContextMenu?: (event: MouseEvent, employee: EmployeeData) => void;
}

const DateTable = ({
  employees,
  attendances,
  disabledSelect,
  selectedEmployeeIds,
  onSelect,
  onClickName,
  onContextMenu,
}: DateTableProps) => {
  const scrollRef = useDragScroll();

  const handleSelectedChange = (_: Key[], datas: DateTableData[]) => {
    const selectedEmployees = datas.map(data => data.employee);
    onSelect?.(selectedEmployees);
  };

  const tableProps = {
    rowSelection: {
      selectedRowKeys: selectedEmployeeIds,
      onChange: handleSelectedChange,
      getCheckboxProps: () => ({ disabled: disabledSelect }),
    },
    columns: getColumns({
      employees: employees,
      onClickName: onClickName,
    }),
    dataSource: employees.map(employee => {
      const attendance = attendances.find(data => data.employeeId === employee.id);
      return {
        key: employee.id,
        name: employee.name,
        position: employee.position,
        attendance: attendance,
        employee: employee,
      };
    }),
  };

  return (
    <DateTableStyled className="AttendanceTable" ref={scrollRef}>
      <Table
        pagination={false}
        onRow={row => ({
          onContextMenu: event => onContextMenu?.(event, row.employee),
        })}
        {...tableProps}
      />
    </DateTableStyled>
  );
};

export default DateTable;
