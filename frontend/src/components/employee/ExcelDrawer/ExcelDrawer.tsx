import { AiOutlineClose } from 'react-icons/ai';

import { Transfer, DrawerProps, Drawer, Button, Flex } from 'antd';

import { EmployeeDocument } from '~/types/employee';

interface ExcelDrawerProps extends DrawerProps {
  open?: boolean;
  employees?: EmployeeDocument[];
  onCopy?: (id: string) => void;
  onClose?: () => void;
}

const ExcelDrawer = ({ onCopy, onClose, employees, ...props }: ExcelDrawerProps) => {
  const RenderExtra = (
    <Button
      type="text"
      icon={<AiOutlineClose size="1.8rem" style={{ marginTop: 2 }} />}
      onClick={onClose}
    />
  );

  return (
    <Drawer
      placement="bottom"
      title="액셀 다운로드"
      closable={false}
      onClose={onClose}
      extra={RenderExtra}
      {...props}
    >
      <Flex justify="center">
        <Transfer />
      </Flex>
    </Drawer>
  );
};

export default ExcelDrawer;
