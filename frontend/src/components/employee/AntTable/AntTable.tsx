import { ForwardedRef, useRef, useState } from 'react';
import { FaFileContract, FaImages } from 'react-icons/fa';

import { Table, Tag } from 'antd';
import { ColumnsType, Key } from 'antd/es/table/interface';

import { Button } from '~/components/common';
import { POSITION_CODE, POSITION_COLORS, PositionType, SALARY_CODE } from '~/types/contract';
import { EmployeeData } from '~/types/employee';
import { formatPhoneNumber } from '~/utils/formatData';

import Dock from './Dock';
import { EmployeeTableWrapStyled } from './styled';

interface AntTableProps {
  tableWrapRef?: ForwardedRef<HTMLDivElement>;
  isLoading?: boolean;
  employees: Array<EmployeeData>;
}

interface EmployeeTableData {
  key: number;
  name: string;
  phone: string;
  position: PositionType;
  groupName: string;
  wage: { salary: string; wage: string };
  attendance: string;
  tool: string | null;
}

const AntTable = ({ tableWrapRef, isLoading, employees }: AntTableProps) => {
  const [showToolModal, setShowToolModal] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);

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
      width: 140,
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
      render: (positionCode: PositionType) => {
        const label = positionCode ? POSITION_CODE[positionCode] : '기타';
        const color = positionCode ? POSITION_COLORS[positionCode] : '';

        return (
          <Tag style={{ width: '5rem', textAlign: 'center', marginRight: '1.2rem' }} color={color}>
            {label}
          </Tag>
        );
      },
    },
    {
      key: 'groupName',
      dataIndex: 'groupName',
      title: '소속',
      width: 170,
      ellipsis: true,
      sorter: (a, b) => a.groupName.localeCompare(b.groupName),
      render: (groupName: string) => <>{groupName}</>,
    },
    {
      key: 'wage',
      dataIndex: 'wage',
      title: '기본 급여',
      width: 150,
      render: (wage: { wage: number; salary: string }) => (
        <>
          <Tag style={{ marginRight: '0.6rem' }}>{wage.salary}</Tag>
          {wage.wage}
        </>
      ),
    },
    {
      key: 'attendance',
      dataIndex: 'attendance',
      width: 70,
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
    const { contract, attendances, hasContract } = employee;

    const groupName = contract ? contract.groupName : '소속 없음';
    const wage = contract ? `${contract.defaultWage.toLocaleString()}원` : '-';
    const attendance = contract && attendances ? `${attendances.length.toString()}일` : '-';
    const salaryText = contract ? SALARY_CODE[contract.salary] : '없음';

    const period = contract ? contract.endPeriod : '계약 만료';

    return {
      key: i,
      name: employee.name,
      phone: employee.phone,
      position: contract ? contract.positionCode : 6,
      groupName: groupName,
      wage: { salary: salaryText, wage: wage },
      attendance: attendance,
      period: period,
      tool: contract ? contract.id : null,
    };
  });

  // 근무자 클릭 이벤트
  const handleNameClick = (employeeId: number) => {
    console.log(employeeId);
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
        ref={tableRef}
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
      <Dock open={showToolModal} parentElement={tableRef.current} onDelete={handleDelete} />
    </EmployeeTableWrapStyled>
  );
};

export default AntTable;
