import { ForwardedRef, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { ImFileExcel } from 'react-icons/im';

import { Button, Table, Tooltip } from 'antd';

import Dock from '~/components/common/Dock';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { EmployeeData } from '~/types/employee';

import { EmployeeTableDataType, getColumns } from './config';
import { EmployeeTableWrapStyled } from './styled';

interface EmployeeTableProps {
  employees?: EmployeeData[];
  tableWrapRef?: ForwardedRef<HTMLDivElement>;
  isLoading?: boolean;
  onRemove: (ids: string[]) => void;
  onClickName: (id: string) => void;
  onCopy?: (data: string) => void;
}

const EmployeeTable = ({
  employees,
  tableWrapRef,
  isLoading,
  onRemove,
  onClickName,
  onCopy,
}: EmployeeTableProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const isSelected = selectedIds.length > 0;

  // Row 삭제 이벤트
  const handleDelete = () => {
    onRemove?.(selectedIds);
    setSelectedIds([]);
  };

  const columns = getColumns({
    employees: employees,
    onClickName: onClickName,
    onCopy: onCopy,
  });

  // Row 체크 핸들러
  const rowSelection = {
    onChange: (keys: React.Key[]) => setSelectedIds(keys.map(String)),
  };

  // 테이블 데이터 맵핑
  const dataSource: EmployeeTableDataType[] | undefined = employees?.map((employee, index) => {
    return {
      key: employee.id,
      name: employee.name,
      phone: employee.phone,
      ssn: employee.ssn,
      bank: employee.bank,
      bankNum: employee.bankNum,
      endPeriod: employee.endPeriod,
      position: employee.position,
    };
  });

  return (
    <EmployeeTableWrapStyled ref={tableWrapRef} className="EmployeeTable">
      <Table
        tableLayout="fixed"
        loading={isLoading}
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
      />

      <Dock open={isSelected}>
        <Tooltip title="엑셀로 저장" mouseEnterDelay={0.6}>
          <Button
            className="excel-btn"
            type="text"
            size="large"
            icon={<ImFileExcel size="2.1rem" />}
          />
        </Tooltip>

        <Tooltip title="삭제" mouseEnterDelay={0.6}>
          <Button
            danger
            type="text"
            size="large"
            icon={<FaTrashAlt size="2.1rem" />}
            onClick={handleDelete}
          />
        </Tooltip>
      </Dock>
    </EmployeeTableWrapStyled>
  );
};

export default EmployeeTable;
