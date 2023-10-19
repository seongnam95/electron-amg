import { useState } from 'react';

import AntTable from '~/components/employee/AntTable';
import ControlBar from '~/components/employee/AntTable/ControlBar';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { useDragScroll } from '~/hooks/useDragScroll';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';
import { searchEmployee } from '~/utils/employeeUtils';

const EmployeePage = () => {
  const scrollRef = useDragScroll();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [valid, setValid] = useState<boolean>(true);

  const { employees, isLoading } = useEmployeeQuery({ params: { valid: valid } });
  const filteredEmployees = searchEmployee(employees, searchTerm);

  const handleDeleteEmployee = () => {};

  return (
    <EmployeePageStyled className="EmployeePage">
      <ControlBar onSearch={e => setSearchTerm(e.target.value)} />
      <AntTable tableWrapRef={scrollRef} isLoading={isLoading} employees={filteredEmployees} />
    </EmployeePageStyled>
  );
};

export default EmployeePage;
