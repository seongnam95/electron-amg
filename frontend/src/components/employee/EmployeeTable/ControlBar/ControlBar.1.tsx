import { BsFilter, BsSearch } from 'react-icons/bs';
import { FiChevronDown, FiPlus } from 'react-icons/fi';

import { Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import Button from '~/components/common/Button';
import Input from '~/components/common/Input';

import DraftCreateModal from '../../DraftCreateModal';
import { ControlBarProps } from './ControlBar';
import { ControlBarStyled } from './styled';

export const ControlBar = ({ selectedTeam, teams, onChangeTeam, onSearch }: ControlBarProps) => {
  const [] = useState<boolean>(false);
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
          <DraftCreateModal />
        </Button>
      </div>
    </ControlBarStyled>
  );
};
