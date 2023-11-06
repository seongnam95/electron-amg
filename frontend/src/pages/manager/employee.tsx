import { useEffect, useState } from 'react';

import { Skeleton } from 'antd';
import { useRecoilValue } from 'recoil';

import ControlBar from '~/components/employee/ControlBar';
import EmployeeTable from '~/components/employee/EmployeeTable';
import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { useDragScroll } from '~/hooks/useDragScroll';
import { userState } from '~/stores/user';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';

const EmployeePage = () => {
  const { user } = useRecoilValue(userState);
  const { teams, isLoading } = useTeamQuery({ userId: user.id });
  const scrollRef = useDragScroll();

  const [selectedTeamId, setSelectedTeamId] = useState<string>();

  useEffect(() => {
    if (teams.length > 0) setSelectedTeamId(teams[0].id);
  }, [teams]);

  const handleChangeTeam = (id: string) => setSelectedTeamId(id);

  if (isLoading || !selectedTeamId) return <Skeleton active style={{ padding: '2rem' }} />;
  return (
    <EmployeePageStyled className="EmployeePage">
      <ControlBar selectedTeamId={selectedTeamId} teams={teams} onChangeTeam={handleChangeTeam} />
      <EmployeeTable tableWrapRef={scrollRef} selectedTeamId={selectedTeamId} />
    </EmployeePageStyled>
  );
};

export default EmployeePage;
