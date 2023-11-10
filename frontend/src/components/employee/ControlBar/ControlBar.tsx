import { BsFilter } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';

import { Button } from 'antd';

import TeamSelector from '~/components/employee/TeamSelector';
import { TeamData } from '~/types/team';

import { ControlBarStyled } from './styled';

interface ControlBarProps {
  teams?: Array<TeamData>;
  selectedTeamId?: string;
  onCreateDraft?: () => void;
  onChangeTeam?: (id: string) => void;
}

const ControlBar = ({ teams, selectedTeamId, onCreateDraft, onChangeTeam }: ControlBarProps) => {
  return (
    <ControlBarStyled className="ControlBar">
      <TeamSelector teams={teams} selectedId={selectedTeamId} onSelect={onChangeTeam} />

      <div className="control-btn-wrap">
        <Button type="text">
          <BsFilter size="1.8rem" />
          필터
        </Button>
        <Button type="link" onClick={onCreateDraft}>
          <FiPlus size="1.8rem" />폼 생성
        </Button>
      </div>
    </ControlBarStyled>
  );
};

export default ControlBar;
