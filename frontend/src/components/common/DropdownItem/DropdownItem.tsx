import { ReactNode } from 'react';

import { Flex, Typography } from 'antd';

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  color?: string;
  hint?: string;
}

export const DropdownItem = ({ icon, label, color, hint }: MenuItemProps) => {
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

export default DropdownItem;
