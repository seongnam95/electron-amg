import { useState } from 'react';

import { Empty, Skeleton } from 'antd';

import { EmployeeTable } from '@components/employee';

import ControlBar from '~/components/employee/EmployeeTable/ControlBar';
import { useAttendanceMutation } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';
import { EmployeeData } from '~/types/employee';
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
  const [sort, setSort] = useState<string>('default');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<Array<string>>([]);
  const { employees, response, isEmployeeLoading } = useEmployeeQuery({
    page: pagination.page,
    onSuccess: () => {
      if (response) {
        const { total, offset, list, ...rest } = response;
        setPagination(rest);
      }
    },
  });

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
