import { ChangeEvent, useEffect, useState } from 'react';

import { Skeleton } from 'antd';
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

  const { user } = useRecoilValue(userState);
  const { teams, isLoading } = useTeamQuery({ userId: user.id });

  const [selectedTeamId, setSelectedTeamId] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (teams.length > 0) setSelectedTeamId(teams[0].id);
  }, [teams]);

  const handleChangeTeam = (id: string) => setSelectedTeamId(id);
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  if (isLoading) return <Skeleton active />;
  return (
    <EmployeePageStyled className="EmployeePage">
      <ControlBar
        selectedTeamId={selectedTeamId}
        teams={teams}
        onChangeTeam={handleChangeTeam}
        onSearch={handleChangeSearch}
      />
      <EmployeeTable tableWrapRef={scrollRef} isLoading={false} />
    </EmployeePageStyled>
  );
};

export default EmployeePage;
