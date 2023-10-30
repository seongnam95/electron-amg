import { useState } from 'react';

import { useRecoilValue } from 'recoil';

import EmployeeTable from '~/components/employee/EmployeeTable';
import ControlBar from '~/components/employee/EmployeeTable/ControlBar';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { useDragScroll } from '~/hooks/useDragScroll';
import { userState } from '~/stores/user';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';
import { EmployeeData } from '~/types/employee';
import { searchEmployee } from '~/utils/employeeUtils';

const EmployeePage = () => {
  const scrollRef = useDragScroll();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [teamIndex, setTeamIndex] = useState<number>(0);

  const { user } = useRecoilValue(userState);
  const { team } = useTeamQuery({ teamId: user.teams[teamIndex].id });

  const employees = team ? team.employees : [];
  const filteredEmployees = searchEmployee(employees, searchTerm);

  // 팀 변경 핸들러
  const handleChangeTeam = (id: string) => {
    const index = user.teams.findIndex(team => team.id === id);
    setTeamIndex(index ? index : 0);
  };

  return (
    <EmployeePageStyled className="EmployeePage">
      <ControlBar
        selectedTeam={team}
        teams={user.teams}
        onChangeTeam={handleChangeTeam}
        onSearch={e => setSearchTerm(e.target.value)}
      />
      <EmployeeTable tableWrapRef={scrollRef} isLoading={false} employees={filteredEmployees} />
    </EmployeePageStyled>
  );
};

export default EmployeePage;
