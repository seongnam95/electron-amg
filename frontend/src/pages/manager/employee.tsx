import { useState } from 'react';

import { Empty, Skeleton } from 'antd';

import { EmployeeTable } from '@components/employee';

import ControlBar from '~/components/employee/EmployeeTable/ControlBar';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';
import { sortedEmployees } from '~/utils/employeeUtils';

const EmployeePage = () => {
  const [sort, setSort] = useState<string>('default');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<Array<string>>([]);
  const { employees, isEmployeeLoading } = useEmployeeQuery();

  const isEmptyEmployee = employees.length === 0;
  const filteredEmployees = sortedEmployees(employees, searchTerm, sort);

  const handleSelectedEmployee = (ids: Array<string>) => {
    setSelectedIds(ids);
  };

  return (
    <EmployeePageStyled className="EmployeePage">
      <div className="employee-content">
        <ControlBar
          onSearch={e => setSearchTerm(e.target.value)}
          onChangeSort={sort => setSort(sort)}
        />
        {isEmployeeLoading ? (
          <Skeleton active style={{ padding: '2rem' }} />
        ) : isEmptyEmployee ? (
          <Empty description="데이터 없음" style={{ marginTop: '8rem' }} />
        ) : (
          <EmployeeTable onSelected={handleSelectedEmployee}>
            {filteredEmployees.map(employee => {
              return <EmployeeTable.Row key={employee.id} id={employee.id} employee={employee} />;
            })}
          </EmployeeTable>
        )}
      </div>
    </EmployeePageStyled>
  );
};

export default EmployeePage;
