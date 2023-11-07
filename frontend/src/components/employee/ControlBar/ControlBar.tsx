import { useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';

import { Button } from 'antd';

import TeamSelector from '~/components/employee/TeamSelector';
import { useCopyLink } from '~/hooks/useCopyLink';
import { TeamData } from '~/types/team';

import DraftCreateDrawer from '../DraftCreateDrawer';
import { ControlBarStyled } from './styled';

interface ControlBarProps {
  teams?: Array<TeamData>;
  selectedTeamId?: string;
  onChangeTeam?: (id: string) => void;
}

const ControlBar = ({ teams, selectedTeamId, onChangeTeam }: ControlBarProps) => {
  const [openDraftDrawer, setOpenDraftDrawer] = useState<boolean>(false);
  const [openHistoryDrawer, setOpenHistoryDrawer] = useState<boolean>(false);

  const selectedTeam = teams?.find(team => team.id === selectedTeamId);

  // Draft Drawer Show/Hide Handle
  const handleShowDraftDrawer = () => setOpenDraftDrawer(true);
  const handleHideDraftDrawer = () => setOpenDraftDrawer(false);

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

      <DraftCreateDrawer
        open={openDraftDrawer}
        team={selectedTeam}
        onClose={handleHideDraftDrawer}
      />
    </ControlBarStyled>
  );
};

export default ControlBar;
