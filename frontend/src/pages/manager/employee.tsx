import { useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';

import { Button, Flex } from 'antd';
import { useRecoilValue } from 'recoil';

import DraftCreateDrawer from '~/components/employee/DraftCreateDrawer';
import EmployeeInfoDrawer from '~/components/employee/EmployeeInfoDrawer';
import EmployeeTable from '~/components/employee/EmployeeTable';
import HistoryDrawer from '~/components/employee/HistoryDrawer';
import TeamSelector from '~/components/employee/TeamSelector';
import Header from '~/components/layouts/Header';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { useCopyText } from '~/hooks/useCopyText';
import { useDragScroll } from '~/hooks/useDragScroll';
import { useRemoveEmployee } from '~/hooks/useRemoveEmployee';
import { teamStore } from '~/stores/team';
import { userStore } from '~/stores/user';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';

const EmployeePage = () => {
  // State
  const { user } = useRecoilValue(userStore);

  const team = useRecoilValue(teamStore);
  const [employeeId, setEmployeeId] = useState<string>();
  const [openDraftDrawer, setOpenDraftDrawer] = useState<boolean>(false);

  const [openEmployeeInfoDrawer, setOpenEmployeeInfoDrawer] = useState<boolean>(false);
  const [openHistoryDrawer, setOpenHistoryDrawer] = useState<boolean>(false);

  // Hook
  const scrollRef = useDragScroll();
  const { copyText } = useCopyText();

  const { teams } = useTeamQuery({ userId: user.id });
  const { employees } = useEmployeeQuery({ teamId: team.id, enabled: team.id !== '' });

  const { removeEmployee } = useRemoveEmployee({
    teamId: team.id,
    onSuccess: () => {
      setOpenEmployeeInfoDrawer(false);
    },
  });

  const selectedEmployee = employees.find(employee => employee.id === employeeId);

  // 계약서 폼 Drawer 핸들러
  const handleShowDraftDrawer = () => setOpenDraftDrawer(true);
  const handleHideDraftDrawer = () => setOpenDraftDrawer(false);

  // 히스토리 Drawer 핸들러
  const handleClickHistory = () => setOpenHistoryDrawer(true);
  const handleCloseHistory = () => setOpenHistoryDrawer(false);

  // 근로자명 클릭 핸들러
  const handleClickName = (id: string) => {
    setEmployeeId(id);
    setOpenEmployeeInfoDrawer(true);
  };

  // 근로자 삭제
  const handleClickRemove = (ids: string | string[]) => {
    removeEmployee(ids);
  };

  return (
    <EmployeePageStyled className="EmployeePage">
      <Header>
        <TeamSelector teams={teams} />
        <Flex>
          <Button type="text" icon={<BsFilter size="1.8rem" />}>
            필터
          </Button>
          <Button type="link" icon={<FiPlus size="1.8rem" />} onClick={handleShowDraftDrawer}>
            폼 생성
          </Button>
        </Flex>
      </Header>

      {/* 근무자 테이블 */}
      <EmployeeTable
        employees={employees}
        tableWrapRef={scrollRef}
        onCopy={copyText}
        onRemove={handleClickRemove}
        onClickName={handleClickName}
      />

      {/* 근무자 정보 Drawer */}
      <EmployeeInfoDrawer
        open={openEmployeeInfoDrawer}
        employee={selectedEmployee}
        onRemove={handleClickRemove}
        onClose={() => setOpenEmployeeInfoDrawer(false)}
      />

      {/* 계약서 폼 생성 Drawer */}
      <DraftCreateDrawer
        open={openDraftDrawer}
        onCopy={copyText}
        onHistory={handleClickHistory}
        onClose={handleHideDraftDrawer}
      />

      {/* 계약서 폼 히스토리 Drawer */}
      {team && (
        <HistoryDrawer open={openHistoryDrawer} onCopy={copyText} onClose={handleCloseHistory} />
      )}
    </EmployeePageStyled>
  );
};

export default EmployeePage;
