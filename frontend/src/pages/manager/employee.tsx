import { useState } from 'react';

import { Flex, Segmented } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
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
import { useSoundApp } from '~/hooks/useSoundApp';
import { teamStore } from '~/stores/team';
import { userStore } from '~/stores/user';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';

type ViewType = 'all' | 'valid' | 'invalid';

const EmployeePage = () => {
  // ---- State
  const { user } = useRecoilValue(userStore);
  const team = useRecoilValue(teamStore);

  const [employeeId, setEmployeeId] = useState<string>();
  const [viewType, setViewType] = useState<ViewType>('all');

  const [openEmployeeInfoDrawer, setOpenEmployeeInfoDrawer] = useState<boolean>(false);
  const [openDraftDrawer, setOpenDraftDrawer] = useState<boolean>(false);
  const [openHistoryDrawer, setOpenHistoryDrawer] = useState<boolean>(false);

  // ---- Hook
  const tableWrapRef = useDragScroll();
  const { copyText } = useCopyText();
  const { soundMessage } = useSoundApp();

  const { teams } = useTeamQuery({ userId: user.id });
  const { employees, isLoading, refetch } = useEmployeeQuery({
    teamId: team.id,
    valid: viewType === 'valid' ? true : viewType === 'invalid' ? false : undefined,
    enabled: team.id !== '',
  });

  const { removeEmployee } = useRemoveEmployee({
    teamId: team.id,
    onSuccess: () => {
      setOpenEmployeeInfoDrawer(false);
    },
  });

  // ---- Handler
  const handleChangeView = (view: SegmentedValue) => {
    setViewType(view as ViewType);
    if (tableWrapRef.current) tableWrapRef.current.scrollTo({ top: 0 });
  };

  const handleClickName = (id: string) => {
    setEmployeeId(id);
    setOpenEmployeeInfoDrawer(true);
  };

  const handleRefetch = () => {
    refetch().then(() => {
      soundMessage.info('새로고침 되었습니다.');
      if (tableWrapRef.current) tableWrapRef.current.scrollTo({ top: 0 });
    });
  };

  const selectedEmployee = employees.find(employee => employee.id === employeeId);
  return (
    <EmployeePageStyled className="EmployeePage">
      <Header>
        <TeamSelector teams={teams} />
        <Flex gap={14}>
          <Segmented
            defaultValue={viewType}
            options={[
              { label: '전체', value: 'all' },
              { label: '계약중', value: 'valid' },
              { label: '계약종료', value: 'invalid' },
            ]}
            onChange={handleChangeView}
          />
          <EmployeeMenu onDraft={() => setOpenDraftDrawer(true)} onRefetch={handleRefetch} />
        </Flex>
      </Header>

      {/* 근무자 테이블 */}
      <EmployeeTable
        isLoading={isLoading}
        employees={employees}
        tableWrapRef={tableWrapRef}
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
