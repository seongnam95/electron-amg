import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { Table, DrawerProps, Drawer, Button, Tag, Space, Flex } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';

import { EmployeeDetailData } from '~/types/employee';

import ExcelTable from '../ExcelTable';

interface ColumnData {
  key: string;
  title: string;
  sequence: number;
}

const initColumns: ColumnData[] = [
  { key: 'name', title: '이름', sequence: 1 },
  { key: 'phone', title: '연락처', sequence: 2 },
  { key: 'position', title: '직위', sequence: 3 },
];

interface ExcelDrawerProps extends DrawerProps {
  open?: boolean;
  employees?: EmployeeDetailData[];
  onCopy?: (id: string) => void;
  onClose?: () => void;
}

const ExcelDrawer = ({ onCopy, onClose, employees, ...props }: ExcelDrawerProps) => {
  const [selectedColumns, setSelectedColumns] = useState<ColumnData[]>(initColumns);

  const columns = selectedColumns.map(column => {
    const { key, title } = column;
    return { key: key, title: title };
  });

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
      height="90%"
      title="액셀 다운로드"
      closable={false}
      onClose={onClose}
      extra={RenderExtra}
      {...props}
    >
      <Flex vertical>
        <ExcelTable columns={columns} employees={employees} />
      </Flex>
    </Drawer>
  );
};

export default ExcelDrawer;
