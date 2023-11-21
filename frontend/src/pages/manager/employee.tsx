import { useState } from 'react';

import { Flex, Segmented } from 'antd';
import { useRecoilValue } from 'recoil';

import DraftCreateDrawer from '~/components/employee/DraftCreateDrawer';
import EmployeeInfoDrawer from '~/components/employee/EmployeeInfoDrawer';
import EmployeeMenu from '~/components/employee/EmployeeMenu';
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
  // ---- State
  const { user } = useRecoilValue(userStore);

  const team = useRecoilValue(teamStore);
  const [employeeId, setEmployeeId] = useState<string>();

  const [openEmployeeInfoDrawer, setOpenEmployeeInfoDrawer] = useState<boolean>(false);
  const [openDraftDrawer, setOpenDraftDrawer] = useState<boolean>(false);
  const [openHistoryDrawer, setOpenHistoryDrawer] = useState<boolean>(false);

  // ---- Hook
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

  // ---- Handler
  const handleClickName = (id: string) => {
    setEmployeeId(id);
    setOpenEmployeeInfoDrawer(true);
  };

  const selectedEmployee = employees.find(employee => employee.id === employeeId);

  return (
    <EmployeePageStyled className="EmployeePage">
      <Header>
        <TeamSelector teams={teams} />
        <Flex gap={14}>
          <Segmented
            options={[
              { label: '계약중', value: 'ing' },
              { label: '계약종료', value: 'end' },
            ]}
            onChange={() => {}}
          />
          <EmployeeMenu />
        </Flex>
      </Header>

      {/* 근무자 테이블 */}
      <EmployeeTable
        employees={employees}
        tableWrapRef={scrollRef}
        onCopy={copyText}
        onRemove={removeEmployee}
        onClickName={handleClickName}
      />

      {/* 근로자 정보 Drawer */}
      <EmployeeInfoDrawer
        open={openEmployeeInfoDrawer}
        employee={selectedEmployee}
        onRemove={removeEmployee}
        onClose={() => setOpenEmployeeInfoDrawer(false)}
      />

      {/* 계약서 폼 생성 Drawer */}
      <DraftCreateDrawer
        open={openDraftDrawer}
        onCopy={copyText}
        onHistory={() => setOpenHistoryDrawer(true)}
        onClose={() => setOpenDraftDrawer(false)}
      />

      {/* 계약서 폼 히스토리 Drawer */}
      {team && (
        <HistoryDrawer
          open={openHistoryDrawer}
          onCopy={copyText}
          onClose={() => setOpenHistoryDrawer(false)}
        />
      )}
    </EmployeePageStyled>
  );
};

export default EmployeePage;
