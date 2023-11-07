import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsClockHistory, BsFilter } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';

import { Button, Drawer, Flex, Skeleton, Space, Typography } from 'antd';

import HistoryView from '~/components/employee/HistoryView';
import TeamSelector from '~/components/employee/TeamSelector';
import { useCopyLink } from '~/hooks/useCopyLink';
import { TeamData } from '~/types/team';

import DraftCreateView from '../DraftCreateView';
import { ControlBarStyled } from './styled';

interface ControlBarProps {
  teams?: Array<TeamData>;
  selectedTeamId?: string;
  onChangeTeam?: (id: string) => void;
}

const ControlBar = ({ teams, selectedTeamId, onChangeTeam }: ControlBarProps) => {
  const { contextHolder, copyInputLink } = useCopyLink();

  const [openDraftDrawer, setOpenDraftDrawer] = useState<boolean>(false);
  const [openHistoryDrawer, setOpenHistoryDrawer] = useState<boolean>(false);

  const selectedTeam = teams?.find(team => team.id === selectedTeamId);

  // Draft Drawer Show/Hide Handle
  const handleShowDraftDrawer = () => setOpenDraftDrawer(true);
  const handleHideDraftDrawer = () => setOpenDraftDrawer(false);

  // History Drawer Handle
  const handleShowHistoryDrawer = () => setOpenHistoryDrawer(true);
  const handleHideHistoryDrawer = () => setOpenHistoryDrawer(false);

  const handleCopyFromHistory = (id: string) => {
    setOpenHistoryDrawer(false);
    copyInputLink(id);
  };

  const RenderDraftExtra = (
    <Button
      type="text"
      icon={<BsClockHistory size="1.8rem" style={{ marginTop: 2 }} />}
      onClick={handleShowHistoryDrawer}
    />
  );

  const RenderHistoryExtra = (
    <Button
      type="text"
      icon={<AiOutlineClose size="1.8rem" style={{ marginTop: 2 }} />}
      onClick={handleHideHistoryDrawer}
    />
  );

  const TeamNameRender = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <span
        style={{
          width: '0.7rem',
          height: '1.5rem',
          borderRadius: '0.2rem',
          backgroundColor: selectedTeam?.color,
        }}
      />
      {selectedTeam?.name}
    </div>
  );

  return (
    <ControlBarStyled className="ControlBar">
      <TeamSelector teams={teams} selectedId={selectedTeamId} onSelect={onChangeTeam} />

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
        closable={false}
        extra={RenderDraftExtra}
        title={TeamNameRender}
        open={openDraftDrawer}
        onClose={handleHideDraftDrawer}
      >
        <DraftCreateView team={openDraftDrawer ? selectedTeam : undefined} onCopy={copyInputLink} />
        <Drawer
          closable={false}
          extra={RenderHistoryExtra}
          title={TeamNameRender}
          open={openHistoryDrawer}
          onClose={handleHideHistoryDrawer}
        >
          <Typography.Title level={5}>히스토리</Typography.Title>
          <HistoryView selectedTeamId={selectedTeam?.id} onCopy={handleCopyFromHistory} />
        </Drawer>
      </Drawer>

      {contextHolder}
    </ControlBarStyled>
  );
};

export default ControlBar;
