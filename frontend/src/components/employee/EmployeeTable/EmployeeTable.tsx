import { ForwardedRef, useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { ImFileExcel } from 'react-icons/im';

import { Button, Table, Tag, Tooltip, message } from 'antd';
import { ColumnsType, Key } from 'antd/es/table/interface';

import Dock from '~/components/common/Dock';
import { useEmployeeQuery, useEmployeeRemoveMutation } from '~/hooks/queryHooks/useEmployeeQuery';
import { EmployeeData } from '~/types/employee';
import { PositionData, SALARY, SalaryType } from '~/types/position';
import { formatPhoneNumber } from '~/utils/formatData';

import { EmployeeTableDataType, getColumns } from './config';
import { EmployeeTableWrapStyled } from './styled';

interface EmployeeTableProps {
  teamId?: string;
  tableWrapRef?: ForwardedRef<HTMLDivElement>;
  isLoading?: boolean;
  onRemove: (ids: string[]) => void;
  onClickName: (id: string) => void;
}

const EmployeeTable = ({
  teamId,
  tableWrapRef,
  isLoading,
  onRemove,
  onClickName,
}: EmployeeTableProps) => {
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const isSelected = selectedEmployeeIds.length > 0;

  const { employees } = useEmployeeQuery({ teamId: teamId, enabled: !!teamId });

  // Row 삭제 이벤트
  const handleDelete = () => {
    onRemove?.(selectedEmployeeIds);
    setSelectedEmployeeIds([]);
  };

  const columns = getColumns({
    onClickName: onClickName,
  });

  // Row 체크 핸들러
  const rowSelection = {
    onChange: (keys: React.Key[]) => setSelectedEmployeeIds(keys.map(String)),
  };

  // 테이블 데이터 맵핑
  const dataSource: EmployeeTableDataType[] = employees.map((employee, index) => {
    return {
      key: employee.id,
      name: employee.name,
      phone: employee.phone,
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
