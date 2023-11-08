import { ForwardedRef, useState } from 'react';

import { Table, Tag } from 'antd';
import { ColumnsType, Key } from 'antd/es/table/interface';

import { useEmployeeQuery, useEmployeeRemoveMutation } from '~/hooks/queryHooks/useEmployeeQuery';
import { POSITION_CODE, POSITION_COLORS, PositionType } from '~/types/position';
import { formatPhoneNumber } from '~/utils/formatData';

import Dock from './Dock';
import { EmployeeTableWrapStyled } from './styled';

interface EmployeeTableData {
  key: string;
  name: string;
  phone: string;
  position: PositionType;
  unitPay: number;
  attendance: string;
}

interface EmployeeTableProps {
  teamId?: string;

  tableWrapRef?: ForwardedRef<HTMLDivElement>;
  isLoading?: boolean;
  onClickName?: (id: string) => void;
}

const EmployeeTable = ({ teamId, tableWrapRef, isLoading, onClickName }: EmployeeTableProps) => {
  const [showToolModal, setShowToolModal] = useState<boolean>(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

  const { employees } = useEmployeeQuery({ teamId: teamId, enabled: !!teamId });
  const { removeEmployeeMutate } = useEmployeeRemoveMutation({ teamId: teamId });

  const columns: ColumnsType<EmployeeTableData> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '이름',
      width: 110,
      ellipsis: true,
      onCell: v => {
        return { onClick: () => handleNameClick(v.key.toString()) };
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string) => <b>{name}</b>,
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: '연락처',
      width: 150,
      align: 'center',
      render: (phone: string) => <>{formatPhoneNumber(phone)}</>,
    },
    {
      key: 'position',
      dataIndex: 'position',
      title: '직위',
      width: 90,
      align: 'center',
      sorter: (a, b) => a.position.toString().localeCompare(b.position.toString()),
      render: (position: PositionType) => {
        const label = POSITION_CODE[position];
        const color = POSITION_COLORS[position];
        return (
          <Tag style={{ width: '5rem', textAlign: 'center', marginInlineEnd: 0 }} color={color}>
            {label}
          </Tag>
        );
      },
    },
    {
      key: 'unitPay',
      dataIndex: 'unitPay',
      title: '단가',
      width: 130,
      align: 'center',
      render: (unitPay: number) => <>{unitPay.toLocaleString()}원</>,
    },
    {
      key: 'attendance',
      dataIndex: 'attendance',
      width: 76,
      title: '근무일',
      align: 'center',
      render: (attendance: string) => <>{attendance}</>,
    },
    {
      key: 'period',
      dataIndex: 'period',
      width: 120,
      title: '계약 만료일',
      align: 'center',
      render: (period: string) => (
        <Tag
          style={{ width: '8rem', textAlign: 'center', marginInlineEnd: 0 }}
          color={period === '계약 만료' ? 'red' : ''}
        >
          {period}
        </Tag>
      ),
    },
  ];

  // 테이블 데이터 맵핑
  const dataSource: Array<EmployeeTableData> | undefined = employees?.map(employee => {
    const { attendances, position } = employee;
    const attendance = attendances ? `${attendances.length.toString()}일` : '-';
    const period = employee ? employee.endPeriod : '계약 만료';

    return {
      key: employee.id,
      name: employee.name,
      phone: employee.phone,
      position: position.positionCode,
      unitPay: position.unitPay,
      attendance: attendance,
      period: period,
    };
  });

  // Row 이름 클릭 이벤트
  const handleNameClick = (employeeId: string) => onClickName?.(employeeId);

  // Row 선택 이벤트
  const handleSelectedChange = (keys: Key[]) => {
    setSelectedEmployeeIds(keys.map(String));
    setShowToolModal(keys.length > 0 ? true : false);
  };

  // Row 삭제 이벤트
  const handleDelete = () => {
    removeEmployeeMutate(selectedEmployeeIds);
    setShowToolModal(false);
  };

  return (
    <EmployeeTableWrapStyled ref={tableWrapRef} className="EmployeeTable">
      <Table
        loading={isLoading}
        prefixCls="employee-table"
        pagination={false}
        columns={columns}
        tableLayout="fixed"
        dataSource={dataSource}
        rowSelection={{
          type: 'checkbox',
          onChange: handleSelectedChange,
        }}
      />
      <Dock open={showToolModal} onDelete={handleDelete} />
    </EmployeeTableWrapStyled>
  );
};

export default EmployeeTable;
