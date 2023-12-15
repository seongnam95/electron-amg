import { Key, MouseEvent } from 'react';

import { Table } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';

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

  // Row 체크 핸들러
  const rowSelection: TableRowSelection<DateTableData> = {
    selectedRowKeys: selectedEmployeeIds,
    onChange: handleSelectedChange,
    getCheckboxProps: () => ({ disabled: disabledSelect }),
  };

  // 테이블 컬럼 불러오기, 핸들러
  const columns = getColumns({
    employees: employees,
    onClickName: onClickName,
  });

  // 테이블 데이터 맵핑
  const dataSource: DateTableData[] = employees.map(employee => {
    const attendance = attendances.find(data => data.employeeId === employee.id);
    return {
      key: employee.id,
      name: employee.name,
      position: employee.position,
      attendance: attendance,
      employee: employee,
    };
  });

  return (
    <DateTableStyled className="AttendanceTable" ref={scrollRef}>
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        onRow={row => ({
          onContextMenu: event => onContextMenu?.(event, row.employee),
        })}
      />
    </DateTableStyled>
  );
};

export default DateTable;
