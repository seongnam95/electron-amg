import { FiChevronDown } from 'react-icons/fi';

import { Dropdown, Skeleton } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { teamStore } from '~/stores/team';
import { userStore } from '~/stores/user';
import { TeamData } from '~/types/team';

import { TeamSelectorStyled } from './styled';

/**
 * 팀 선택 드롭다운 Selector
 */
const TeamSelector = () => {
  const { user, isLogin } = useRecoilValue(userStore);
  const [team, setTeam] = useRecoilState(teamStore);
  const { teams } = useTeamQuery({ userId: user.id, enabled: isLogin });

  const isLoading = team.id === '' || teams === undefined;
  if (isLoading) return <Skeleton.Button active size="small" style={{ width: '16rem' }} />;

  const isMulti = teams ? (teams.length > 1 ? true : false) : false;

  const handleChangeTeam = (item: ItemType) => {
    const selectedTeam = teams.find(t => t.id === item?.key?.toString());
    if (selectedTeam) setTeam(selectedTeam);
  };

  const items: Array<ItemType> | undefined = teams?.map(item => {
    const isSelected = item.id == team.id;

    return {
      key: item.id,
      label: (
        <div style={{ display: 'flex', padding: '1px 0', gap: '14px', alignItems: 'center' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: item.color,
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
            {item.name}
          </span>
        </div>
      ),
      onClick: handleChangeTeam,
    };
  });

  return (
    <TeamSelectorStyled className="TeamSelector">
      {isMulti ? (
        <Dropdown menu={{ items }} trigger={['click']} placement="bottomLeft">
          <div className="btn-wrap">
            <label className="team-label selector">
              <FiChevronDown style={{ marginLeft: '8px' }} />
              {team.name}
              <span className="color-bar" style={{ backgroundColor: team.color }} />
            </label>
          </div>
        </Dropdown>
      ) : (
        <label className="team-label">
          <span className="color-bar" style={{ backgroundColor: team.color }} />
          {team.name}
        </label>
      )}
    </TeamSelectorStyled>
  );
};

export default TeamSelector;
