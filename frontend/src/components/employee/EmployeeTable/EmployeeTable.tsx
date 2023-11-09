import { ForwardedRef, useState } from 'react';

import { Table, Tag, message } from 'antd';
import { ColumnsType, Key } from 'antd/es/table/interface';

import { useEmployeeQuery, useEmployeeRemoveMutation } from '~/hooks/queryHooks/useEmployeeQuery';
import { PositionData } from '~/types/position';
import { formatPhoneNumber } from '~/utils/formatData';

import ExcelDrawer from '../ExcelDrawer';
import Dock from './Dock';
import { EmployeeTableWrapStyled } from './styled';

interface EmployeeTableData {
  key: string;
  name: string;
  phone: string;
  position: PositionData;
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
  const [openExcelDrawer, setOpenExcelDrawer] = useState<boolean>(false);

  const { employees } = useEmployeeQuery({ teamId: teamId, enabled: !!teamId });
  const { removeEmployeeMutate } = useEmployeeRemoveMutation({
    teamId: teamId,
    onError: msg => message.error(msg),
  });

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
      render: (position: PositionData) => {
        return (
          <Tag
            style={{ width: '5rem', textAlign: 'center', marginInlineEnd: 0 }}
            color={position.color}
          >
            {position.name}
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
      position: position,
      unitPay: position.pay,
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

  // Excel 이벤트
  const handleExcelClose = () => setOpenExcelDrawer(false);
  const handleExcel = () => {
    setShowToolModal(false);
    setOpenExcelDrawer(true);
  };

  // Row 삭제 이벤트
  const handleDelete = () => {
    setShowToolModal(false);
    removeEmployeeMutate(selectedEmployeeIds);
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
      <Dock open={showToolModal} onExcel={handleExcel} onDelete={handleDelete} />
      <ExcelDrawer employees={employees} open={openExcelDrawer} onClose={handleExcelClose} />
    </EmployeeTableWrapStyled>
  );
};

export default EmployeeTable;
