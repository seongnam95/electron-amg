import { FiPlus } from 'react-icons/fi';
import { HiOutlineDotsVertical } from 'react-icons/hi';

import { Button, Dropdown, Flex, Drawer } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import clsx from 'clsx';

import { EmployeeMenuStyled } from './styled';

export interface EmployeeMenuProps {}

const EmployeeMenu = ({}: EmployeeMenuProps) => {
  const items: ItemType[] = [
    {
      key: 'create-draft',
      label: (
        <Flex align="center" gap={18} style={{ color: '#1677FF' }}>
          <FiPlus size={18} />
          계약서 초안 생성
        </Flex>
      ),
      onClick: () => {},
    },
  ];

  return (
    <EmployeeMenuStyled>
      <Dropdown placement="bottomRight" trigger={['click']} arrow menu={{ items }}>
        <Button
          type="text"
          shape="circle"
          icon={<HiOutlineDotsVertical size={18} style={{ marginBottom: 1 }} />}
          onClick={() => {}}
        />
      </Dropdown>
    </EmployeeMenuStyled>
  );
};

export default EmployeeMenu;
