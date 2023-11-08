import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { Button, Drawer } from 'antd';
import { useRecoilValue } from 'recoil';

import ControlBar from '~/components/employee/ControlBar';
import EmployeeInfoView from '~/components/employee/EmployeeInfoView';
import EmployeeTable from '~/components/employee/EmployeeTable';
import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { useDragScroll } from '~/hooks/useDragScroll';
import { userState } from '~/stores/user';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';

const EmployeePage = () => {
  // State
  const { user } = useRecoilValue(userState);
  const [selectedTeamId, setSelectedTeamId] = useState<string>();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>();
  const [openEmployeeInfoDrawer, setOpenEmployeeInfoDrawer] = useState<boolean>(false);

  // Hook
  const scrollRef = useDragScroll();

  // 렌더링 1회
  const { teams } = useTeamQuery({ userId: user.id });

  // selectedTeamId가 없을 때 teams가 불려왔을 경우 teams 첫 항목 ID 저장
  useEffect(() => {
    if (!selectedTeamId && teams.length > 0) setSelectedTeamId(teams[0].id);
  }, [teams]);

  const handleChangeTeam = (id: string) => setSelectedTeamId(id);
  const handleClickName = (id: string) => {
    setSelectedEmployeeId(id);
    setOpenEmployeeInfoDrawer(true);
  };

  const RenderExtra = (
    <Button type="text" danger icon={<FaTrashAlt size="1.6rem" style={{ marginTop: 3 }} />} />
  );

  return (
    <EmployeePageStyled className="EmployeePage">
      <ControlBar selectedTeamId={selectedTeamId} teams={teams} onChangeTeam={handleChangeTeam} />

      <EmployeeTable
        teamId={selectedTeamId}
        tableWrapRef={scrollRef}
        onClickName={handleClickName}
      />

      <Drawer
        title="근무자 정보"
        extra={RenderExtra}
        closable={false}
        open={openEmployeeInfoDrawer}
        onClose={() => setOpenEmployeeInfoDrawer(false)}
      >
        {selectedEmployeeId ? <EmployeeInfoView employeeId={selectedEmployeeId} /> : null}
      </Drawer>
    </EmployeePageStyled>
  );
};

export default EmployeePage;
