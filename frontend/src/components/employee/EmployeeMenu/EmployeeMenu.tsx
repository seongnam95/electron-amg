import { ReactNode } from 'react';
import { FiPlus } from 'react-icons/fi';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { VscRefresh } from 'react-icons/vsc';

import { Button, Dropdown, Flex, Typography } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import { EmployeeMenuStyled } from './styled';

export interface EmployeeMenuProps {
  onDraft?: () => void;
  onRefetch?: () => void;
}

const EmployeeMenu = ({ onDraft, onRefetch }: EmployeeMenuProps) => {
  const items: ItemType[] = [
    {
      key: 'create-draft',
      label: <MenuItem label="계약서 초안 생성" icon={<FiPlus size={18} />} color="#1677FF" />,
      onClick: onDraft,
    },
    {
      key: 'refetch',
      label: <MenuItem label="새로고침" icon={<VscRefresh size={17} />} />,
      onClick: onRefetch,
    },
  ];

  return (
    <EmployeeMenuStyled>
      <Dropdown placement="bottomRight" trigger={['click']} arrow menu={{ items }}>
        <Button
          type="text"
          shape="circle"
          icon={<HiOutlineDotsVertical size={18} style={{ marginBottom: 1 }} />}
        />
      </Dropdown>
    </EmployeeMenuStyled>
  );
};

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  color?: string;
  hint?: string;
}

const MenuItem = ({ icon, label, color, hint }: MenuItemProps) => {
  const { Text } = Typography;
  return (
    <Flex align="center" style={{ color }} gap={16}>
      <Flex align="center" justify="center" style={{ width: 24 }}>
        {icon}
      </Flex>
      <Flex gap={6}>
        <Text style={{ color }}>{label}</Text>
        <Text type="secondary">{hint ? `[${hint}]` : null}</Text>
      </Flex>
    </Flex>
  );
};

export default EmployeeMenu;
