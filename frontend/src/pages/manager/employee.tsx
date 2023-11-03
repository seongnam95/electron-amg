import { ChangeEvent, useEffect, useState } from 'react';

import { Skeleton } from 'antd';
import { useRecoilValue } from 'recoil';

import ControlBar from '~/components/employee/ControlBar';
import EmployeeTable from '~/components/employee/EmployeeTable';
import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { useDragScroll } from '~/hooks/useDragScroll';
import { userState } from '~/stores/user';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';

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

  if (isLoading || !selectedTeamId) return <Skeleton active style={{ padding: '2rem' }} />;
  return (
    <EmployeePageStyled className="EmployeePage">
      <ControlBar
        selectedTeamId={selectedTeamId}
        teams={teams}
        onChangeTeam={handleChangeTeam}
        onSearch={handleChangeSearch}
      />
      <EmployeeTable tableWrapRef={scrollRef} selectedTeamId={selectedTeamId} />
    </EmployeePageStyled>
  );
};

export default EmployeePage;
