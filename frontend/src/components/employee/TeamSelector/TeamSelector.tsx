import { FiChevronDown } from 'react-icons/fi';

import { Dropdown, Skeleton } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import { TeamData } from '~/types/team';

import { TeamSelectorStyled } from './styled';

export interface TeamSelectorProps {
  teams?: Array<TeamData>;
  selectedId?: string;
  onSelect?: (id: string) => void;
}

/**
 * 팀 선택 드롭다운 Selector
 */
const TeamSelector = ({ teams, selectedId, onSelect }: TeamSelectorProps) => {
  const selectedTeam = teams?.find(team => team.id == selectedId);
  const isMulti = teams ? (teams.length > 1 ? true : false) : false;

  const items: Array<ItemType> | undefined = teams?.map(team => {
    const isSelected = team.id == selectedId;

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
      onClick: () => onSelect?.(team.id),
    };
  });

  /**
   * 선택 된 팀이 없을 경우 [ 스켈레톤 ]
   * 팀이 여러개일 경우 [ 드롭다운 ]
   * 팀이 하나일 경우 일반 [ 레이블 ]
   */
  return (
    <TeamSelectorStyled className="TeamSelector">
      {!selectedTeam ? (
        <Skeleton.Button active size="small" style={{ width: '16rem' }} />
      ) : isMulti ? (
        <Dropdown menu={{ items }} trigger={['click']}>
          <label className="team-label selector">
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
