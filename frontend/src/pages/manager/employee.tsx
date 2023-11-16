import { useEffect, useState } from 'react';
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
import { useEmployeeRemoveMutation } from '~/hooks/queryHooks/useEmployeeQuery';
import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { useCopyLink } from '~/hooks/useCopyLink';
import { useDragScroll } from '~/hooks/useDragScroll';
import { useSoundApp } from '~/hooks/useSoundApp';
import { userState } from '~/stores/user';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';

const EmployeePage = () => {
  // State
  const { user } = useRecoilValue(userState);

  const [teamId, setTeamId] = useState<string>();
  const [employeeId, setEmployeeId] = useState<string>();
  const [openDraftDrawer, setOpenDraftDrawer] = useState<boolean>(false);

  const [openEmployeeInfoDrawer, setOpenEmployeeInfoDrawer] = useState<boolean>(false);
  const [openHistoryDrawer, setOpenHistoryDrawer] = useState<boolean>(false);

  // Hook
  const { soundMessage, soundModal } = useSoundApp();
  const scrollRef = useDragScroll();
  const { contextHolder, copyInputLink } = useCopyLink();
  const { teams } = useTeamQuery({ userId: user.id });

  const { removeEmployeeMutate } = useEmployeeRemoveMutation({
    teamId: teamId,
    onError: msg => soundMessage.error(msg),
  });

  // selectedTeamId가 없을 때 teams가 불려왔을 경우 teams 첫 항목 ID 저장
  useEffect(() => {
    if (!teamId && teams.length > 0) setTeamId(teams[0].id);
  }, [teams]);

  const selectedTeam = teams?.find(team => team.id === teamId);

  // 계약서 폼 Drawer 핸들러
  const handleShowDraftDrawer = () => setOpenDraftDrawer(true);
  const handleHideDraftDrawer = () => setOpenDraftDrawer(false);

  // 히스토리 Drawer 핸들러
  const handleClickHistory = () => setOpenHistoryDrawer(true);
  const handleCloseHistory = () => setOpenHistoryDrawer(false);

  // 팀 변경 핸들러
  const handleChangeTeam = (id: string) => setTeamId(id);

  // 근로자명 클릭 핸들러
  const handleClickName = (id: string) => {
    setEmployeeId(id);
    setOpenEmployeeInfoDrawer(true);
  };

  // 근로자 삭제
  const removeEmployee = (ids: string[]) => {
    removeEmployeeMutate(ids);
    setOpenEmployeeInfoDrawer(false);
  };

  // 삭제 확인 모달
  const showRemoveConfirm = (ids: string[]) => {
    soundModal({
      type: 'warning',
      title: '해당 근로자를 삭제하시겠습니까?',
      content: '휴지통으로 이동되며, 30일 후 완전히 삭제됩니다.',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      centered: true,
      onOk: () => removeEmployee(ids),
    });
  };

  return (
    <EmployeePageStyled className="EmployeePage">
      <Header>
        <TeamSelector teams={teams} selectedId={teamId} onSelect={handleChangeTeam} />
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
        teamId={teamId}
        tableWrapRef={scrollRef}
        onRemove={showRemoveConfirm}
        onClickName={handleClickName}
      />

      {/* 근무자 정보 Drawer */}
      <EmployeeInfoDrawer
        open={openEmployeeInfoDrawer}
        team={selectedTeam}
        employeeId={employeeId}
        onRemove={showRemoveConfirm}
        onClose={() => setOpenEmployeeInfoDrawer(false)}
      />

      {/* 계약서 폼 생성 Drawer */}
      <DraftCreateDrawer
        open={openDraftDrawer}
        team={selectedTeam}
        onCopy={copyInputLink}
        onHistory={handleClickHistory}
        onClose={handleHideDraftDrawer}
      />

      {/* 계약서 폼 히스토리 Drawer */}
      {teamId && (
        <HistoryDrawer
          teamId={teamId}
          open={openHistoryDrawer}
          onCopy={copyInputLink}
          onClose={handleCloseHistory}
        />
      )}

      {/* Copy Input */}
      {contextHolder}
    </EmployeePageStyled>
  );
};

export default EmployeePage;
