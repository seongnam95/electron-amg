import { ChangeEvent, useState } from 'react';

import { useRecoilValue } from 'recoil';

import EmployeeTable from '~/components/employee/EmployeeTable';
import ControlBar from '~/components/employee/EmployeeTable/ControlBar';
import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { useDragScroll } from '~/hooks/useDragScroll';
import { userState } from '~/stores/user';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';
import { searchEmployee } from '~/utils/employeeUtils';

const EmployeePage = () => {
  const scrollRef = useDragScroll();
  const { teams } = useRecoilValue(userState).user;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTeamID, setSelectedTeamID] = useState<string>(teams[0].id);
  const { team } = useTeamQuery({ teamID: selectedTeamID });

  const employees = team ? team.employees : [];
  const filteredEmployees = searchEmployee(employees, searchTerm);

  const handleChangeTeam = (id: string) => setSelectedTeamID(id);
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  return (
    <EmployeePageStyled className="EmployeePage">
      <ControlBar
        selectedTeamID={selectedTeamID}
        teams={teams}
        onChangeTeam={handleChangeTeam}
        onSearch={handleChangeSearch}
      />
      <EmployeeTable tableWrapRef={scrollRef} isLoading={false} employees={filteredEmployees} />
    </EmployeePageStyled>
  );
};

export default EmployeePage;
