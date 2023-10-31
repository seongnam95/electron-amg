import { FiChevronDown } from 'react-icons/fi';

import { Dropdown } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';

import { TeamData } from '~/types/team';

import { TeamSelectorStyled } from './styled';

export interface TeamSelectorProps {
  teams: Array<TeamData>;
  selectedTeamID?: string;
  onChange?: (id: string) => void;
}

const TeamSelector = ({ selectedTeamID, teams, onChange }: TeamSelectorProps) => {
  const selectedTeam = teams.find(team => team.id == selectedTeamID);

  const handleChangeTeam = ({ key }: MenuItemType) => onChange?.(key.toLocaleString());

  const items: Array<ItemType> = teams.map(team => {
    const isSelected = team.id == selectedTeamID;

    return {
      key: team.id,
      label: (
        <div style={{ display: 'flex', padding: '1px 0', gap: '14px', alignItems: 'center' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: team.color,
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              fontSize: '15px',
              color: isSelected ? '#326CF9' : '#767676',
              fontWeight: isSelected ? 'bold' : 'normal',
            }}
          >
            {team.name}
          </span>
        </div>
      ),
      onClick: handleChangeTeam,
    };
  });

  return (
    <TeamSelectorStyled className="TeamSelector">
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
    </TeamSelectorStyled>
  );
};

export default TeamSelector;
