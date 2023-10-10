import { useState } from 'react';

import { Empty, Skeleton } from 'antd';

import { EmployeeSidebar, EmployeeTable } from '@components/employee';

import ControlBar from '~/components/employee/EmployeeTable/ControlBar';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';
import { sortedEmployees } from '~/utils/employeeUtils';

interface PaginationData {
  page: number;
  hasMore: boolean;
  nextPage: number;
}

const EmployeePage = () => {
  const initPagination: PaginationData = {
    page: 1,
    nextPage: 1,
    hasMore: false,
  };
  const [pagination, setPagination] = useState<PaginationData>(initPagination);
  const [sort, setSort] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleQuerySuccess = () => {
    if (response) {
      const { total, offset, list, ...rest } = response;
      setPagination(rest);
    }
  };

  const { employees, response, isEmployeeLoading } = useEmployeeQuery({
    page: pagination.page,
    onSuccess: handleQuerySuccess,
  });

  const isEmptyEmployee = employees.length === 0;
  const filteredEmployees = sortedEmployees(employees, searchTerm, sort);

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
          <EmployeeTable>
            {filteredEmployees.map(employee => {
              return <EmployeeTable.Row key={employee.id} id={employee.id} employee={employee} />;
            })}
          </EmployeeTable>
        )}
      </div>
      <EmployeeSidebar />
    </EmployeePageStyled>
  );
};

export default EmployeePage;
