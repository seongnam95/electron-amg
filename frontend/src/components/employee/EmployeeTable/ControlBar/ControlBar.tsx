import { ChangeEvent, useState } from 'react';
import { BsFilter, BsSearch } from 'react-icons/bs';
import { FiChevronDown, FiPlus } from 'react-icons/fi';

import { Dropdown } from 'antd';

import Button from '~/components/common/Button';
import Input from '~/components/common/Input';
import DraftCreateDrawer from '~/components/employee/DraftCreateDrawer';
import TeamSelector from '~/components/employee/TeamSelector';
import { TeamData, TeamWithEmployee } from '~/types/team';

import { ControlBarStyled } from './styled';

interface ControlBarProps {
  selectedTeamID?: string;
  teams: Array<TeamData>;
  onChangeTeam?: (id: string) => void;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ControlBar = ({ selectedTeamID, teams, onChangeTeam, onSearch }: ControlBarProps) => {
  const [openDraftDrawer, setOpenDraftDrawer] = useState<boolean>(false);

  const handleShowDraftDrawer = () => setOpenDraftDrawer(true);
  const handleCloseDraftDrawer = () => setOpenDraftDrawer(false);

  return (
    <ControlBarStyled className="ControlBar">
      <TeamSelector teams={teams} selectedTeamID={selectedTeamID} onChange={onChangeTeam} />

      <div className="control-wrap">
        <Input className="search-input" icon={<BsSearch />} variations="fill" onChange={onSearch} />
        <Button $variations="link" $btnSize="small">
          <BsFilter size="1.8rem" />
          필터
        </Button>
        <Button $variations="link" $btnSize="small" $primary onClick={handleShowDraftDrawer}>
          <FiPlus size="1.8rem" />폼 생성
        </Button>
      </div>

      <DraftCreateDrawer
        title="계약서 폼 생성"
        open={openDraftDrawer}
        teams={teams}
        selectedTeamID={selectedTeamID}
        onClose={handleCloseDraftDrawer}
      />
    </ControlBarStyled>
  );
};

export default ControlBar;
