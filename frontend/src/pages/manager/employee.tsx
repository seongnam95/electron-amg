import { useMemo, useState, ChangeEvent } from 'react';

import { Empty, Skeleton } from 'antd';
import { motion } from 'framer-motion';

import { EmployeeSidebar, EmployeeTable } from '@components/employee';

import ControlBar from '~/components/employee/EmployeeTable/ControlBar';
import {
  employeeKeys,
  useEmployeeMutation,
  useEmployeeQuery,
} from '~/hooks/queryHooks/useEmployeeQuery';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';
import { EmployeeData } from '~/types/employee';
import { searchEmployee, sortedEmployees } from '~/utils/employeeUtils';

const EmployeePage = () => {
  const [sort, setSort] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { employees, isEmployeeLoading } = useEmployeeQuery();

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
          <EmployeeTable employees={filteredEmployees} />
        )}
      </div>
      <EmployeeSidebar />
    </EmployeePageStyled>
  );
};

export default EmployeePage;
