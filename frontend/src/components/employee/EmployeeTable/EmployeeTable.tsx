import { ForwardedRef, useRef, useState } from 'react';
import { FaFileContract, FaImages } from 'react-icons/fa';

import { Table, Tag } from 'antd';
import { ColumnsType, Key } from 'antd/es/table/interface';

import Button from '~/components/common/Button';
import EmployeeInfoDrawer from '~/components/employee/EmployeeInfoDrawer';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { EmployeeData } from '~/types/employee';
import { POSITION_CODE, POSITION_COLORS, PositionType } from '~/types/position';
import { formatPhoneNumber } from '~/utils/formatData';

import Dock from './Dock';
import { EmployeeTableWrapStyled } from './styled';

interface EmployeeTableProps {
  selectedTeamId: string;
  searchTerm: string;
  tableWrapRef?: ForwardedRef<HTMLDivElement>;
  onClickEmployee?: (id: string) => void;
}

interface EmployeeTableData {
  key: string;
  name: string;
  phone: string;
  position: PositionType;
  unitPay: number;
  attendance: string;
  tool: string | null;
}

const EmployeeTable = ({ selectedTeamId, tableWrapRef, onClickEmployee }: EmployeeTableProps) => {
  const [showToolModal, setShowToolModal] = useState<boolean>(false);
  const { employees, isLoading } = useEmployeeQuery({ teamId: selectedTeamId });
  const [employee, setEmployee] = useState<EmployeeData>();
  const [openEmployeeInfoDrawer, setOpenEmployeeInfoDrawer] = useState<boolean>(false);

  const columns: ColumnsType<EmployeeTableData> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '이름',
      width: 110,
      ellipsis: true,
      onCell: v => {
        return { onClick: () => handleNameClick(v.key) };
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string) => <b>{name}</b>,
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: '연락처',
      width: 120,
      align: 'center',
      render: (phone: string) => <>{formatPhoneNumber(phone)}</>,
    },
    {
      key: 'position',
      dataIndex: 'position',
      title: '직위',
      width: 70,
      align: 'center',
      sorter: (a, b) => a.position.toString().localeCompare(b.position.toString()),
      render: (position: PositionType) => {
        const label = POSITION_CODE[position];
        const color = POSITION_COLORS[position];
        return (
          <Tag style={{ width: '5rem', textAlign: 'center', marginRight: '1.2rem' }} color={color}>
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
      width: 60,
      title: '근무일',
      align: 'center',
      render: (attendance: string) => <>{attendance}</>,
    },
    {
      key: 'period',
      dataIndex: 'period',
      width: 110,
      title: '계약 만료일',
      align: 'center',
      render: (period: string) => (
        <Tag
          style={{ width: '8rem', textAlign: 'center' }}
          color={period === '계약 만료' ? 'red' : ''}
        >
          {period}
        </Tag>
      ),
    },
    {
      key: 'tool',
      dataIndex: 'tool',
      width: 100,
      title: '문서',
      align: 'center',
      render: (id: string) => {
        if (!id) return <></>;
        return (
          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
            <Button $btnSize="small">
              <FaImages />
            </Button>
            <Button $btnSize="small">
              <FaFileContract />
            </Button>
          </div>
        );
      },
    },
  ];

  // 테이블 데이터 맵핑
  const dataSource: Array<EmployeeTableData> = employees.map((employee, i) => {
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
      tool: employee.id,
    };
  });

  // 근무자 클릭 이벤트
  const handleNameClick = (employeeId: string) => {
    const employee = employees.find(employee => employee.id === employeeId);
    setEmployee(employee);
    setOpenEmployeeInfoDrawer(true);
  };

  // 근무자 선택 이벤트
  const handleSelectedChange = (selectedIds: Key[]) => {
    setShowToolModal(selectedIds.length > 0 ? true : false);
  };

  const handleDelete = () => {
    console.log('삭제');
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
      {employee ? (
        <EmployeeInfoDrawer
          open={openEmployeeInfoDrawer}
          onClose={() => setOpenEmployeeInfoDrawer(false)}
          employee={employee}
        />
      ) : null}
    </EmployeeTableWrapStyled>
  );
};

export default EmployeeTable;
