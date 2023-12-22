import { Key } from 'react';

import { Table, TableProps } from 'antd';

import { EmployeeData } from '~/types/employee';

import { EmployeeTableData, getColumns } from './config';
import { EmployeeTableWrapStyled } from './styled';

interface EmployeeTableProps {
  employees: EmployeeData[];
  loading?: boolean;
  onSelect: (employees: EmployeeData[]) => void;
  onClickName: (employee: EmployeeData) => void;
  onCopy?: (data: string) => void;
}

const EmployeeTable = ({
  employees,
  loading,
  onClickName,
  onSelect,
  onCopy,
}: EmployeeTableProps) => {
  const handleSelectedChange = (_: Key[], datas: EmployeeTableData[]) => {
    const selectedEmployees = datas.map(data => data.employee);
    onSelect?.(selectedEmployees);
  };

  const tableConfig: TableProps<EmployeeTableData> = {
    rowSelection: { onChange: handleSelectedChange },
    columns: getColumns({
      employees: employees,
      onClickName: onClickName,
      onCopy: onCopy,
    }),
    dataSource: employees.map(employee => {
      return {
        key: employee.id,
        employee: employee,
      };
    }),
  };

  return (
    <EmployeeTableWrapStyled className="EmployeeTable">
      <Table
        loading={loading}
        pagination={false}
        showSorterTooltip={false}
        scroll={{ x: '100%', y: '100%' }}
        {...tableConfig}
      />
    </EmployeeTableWrapStyled>
  );
};

export default EmployeeTable;
