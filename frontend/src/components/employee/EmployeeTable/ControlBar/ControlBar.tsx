import { ChangeEvent, useState } from 'react';
import { BsFilter, BsSearch } from 'react-icons/bs';
import { FiChevronDown, FiPlus } from 'react-icons/fi';

import { Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import Button from '~/components/common/Button';
import Input from '~/components/common/Input';
import { TeamData, TeamWithEmployee } from '~/types/team';

import DraftCreateModal from '../../DraftCreateModal';
import { ControlBarStyled } from './styled';

interface ControlBarProps {
  selectedTeam?: TeamWithEmployee;
  teams: Array<TeamData>;
  onChangeTeam?: (id: string) => void;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ControlBar = ({ selectedTeam, teams, onChangeTeam, onSearch }: ControlBarProps) => {
  const [showDraftCreateModal, setShowDraftCreateModal] = useState<boolean>(true);
  const items: Array<ItemType> = teams.map(team => {
    const isSelected = selectedTeam?.id === team.id;

    return {
      key: team.id,
      label: (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: team.color,
              borderRadius: '50%',
            }}
          />
          <span style={{ fontSize: '15px', fontWeight: isSelected ? 'bold' : 'normal' }}>
            {team.name}
          </span>
        </div>
      ),
      onClick: () => onChangeTeam?.(team.id),
    };
  });

  return (
    <ControlBarStyled className="ControlBar">
      {teams.length > 1 ? (
        <Dropdown menu={{ items }} trigger={['click']}>
          <label className="team-label">
            <span className="color-bar" style={{ backgroundColor: selectedTeam?.color }} />
            {selectedTeam?.name}
            <FiChevronDown style={{ marginLeft: '8px' }} />
          </label>
        </Dropdown>
      ) : (
        <label className="team-label">
          <span className="color-bar" style={{ backgroundColor: selectedTeam?.color }} />
          {selectedTeam?.name}
        </label>
      )}

      <div className="control-wrap">
        <Input className="search-input" icon={<BsSearch />} variations="fill" onChange={onSearch} />

        <Button $variations="link" $btnSize="small">
          <BsFilter size="1.8rem" />
          필터
        </Button>
        <Button $variations="link" $btnSize="small" $primary>
          <FiPlus size="1.8rem" />폼 생성
          {selectedTeam && <DraftCreateModal team={selectedTeam} open={showDraftCreateModal} />}
        </Button>
      </div>
    </ControlBarStyled>
  );
};

export default ControlBar;
