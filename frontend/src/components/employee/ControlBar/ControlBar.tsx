import { useState } from 'react';
import { BsClockHistory, BsFilter } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';

import { Button, Drawer, Skeleton } from 'antd';

import HistoryView from '~/components/employee/HistoryView';
import TeamSelector from '~/components/employee/TeamSelector';
import { TeamData } from '~/types/team';

import DraftCreateView from '../DraftCreateView';
import { ControlBarStyled } from './styled';

interface ControlBarProps {
  selectedTeamId: string;
  teams: Array<TeamData>;
  onChangeTeam?: (id: string) => void;
}

const ControlBar = ({ selectedTeamId, teams, onChangeTeam }: ControlBarProps) => {
  const [openDraftDrawer, setOpenDraftDrawer] = useState<boolean>(false);
  const [openHistoryDrawer, setOpenHistoryDrawer] = useState<boolean>(false);

  const handleShowDraftDrawer = () => setOpenDraftDrawer(true);
  const handleCloseDraftDrawer = () => setOpenDraftDrawer(false);

  const handleShowHistoryDrawer = () => setOpenHistoryDrawer(true);
  const handleCloseHistoryDrawer = () => setOpenHistoryDrawer(false);

  const RenderDrawerExtra = (
    <Button
      type="text"
      icon={<BsClockHistory size="1.8rem" style={{ marginTop: 2 }} />}
      onClick={handleShowHistoryDrawer}
    />
  );

  return (
    <ControlBarStyled className="ControlBar">
      <TeamSelector teams={teams} selectedTeamId={selectedTeamId} onChange={onChangeTeam} />

      <div className="control-btn-wrap">
        <Button type="text">
          <BsFilter size="1.8rem" />
          필터
        </Button>
        <Button type="link" onClick={handleShowDraftDrawer}>
          <FiPlus size="1.8rem" />폼 생성
        </Button>
      </div>

      <Drawer
        title="계약서 폼 생성"
        closable={false}
        extra={RenderDrawerExtra}
        open={openDraftDrawer}
        onClose={handleCloseDraftDrawer}
      >
        {teams ? (
          <DraftCreateView teams={teams} selectedTeamId={selectedTeamId} />
        ) : (
          <Skeleton active />
        )}

        {/* 히스토리 Drawer */}
        <Drawer
          title="이전 기록"
          closable={false}
          open={openHistoryDrawer}
          onClose={handleCloseHistoryDrawer}
        >
          {drafts ? <HistoryView selectedTeamId={selectedTeamId} /> : <Skeleton active />}
        </Drawer>
      </Drawer>
    </ControlBarStyled>
  );
};

export default ControlBar;
