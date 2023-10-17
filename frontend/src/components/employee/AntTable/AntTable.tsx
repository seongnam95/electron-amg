import { ForwardedRef, useRef, useState } from 'react';

import { Table, Tag } from 'antd';
import { ColumnsType, Key } from 'antd/es/table/interface';

import { POSITION_CODE, POSITION_COLORS, SALARY_CODE } from '~/types/contract';
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
  profile: { name: string; position: string; tagColor: string };
  phone: string;
  groupName: string;
  wage: {
    salary: string;
    wage: string;
  };
  attendance: string;
}

const AntTable = ({ tableWrapRef, isLoading, employees }: AntTableProps) => {
  const [showToolModal, setShowToolModal] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const columns: ColumnsType<EmployeeTableData> = [
    {
      key: 'profile',
      dataIndex: 'profile',
      title: '이름',
      width: 150,
      ellipsis: true,
      onCell: v => {
        return { onClick: () => handleNameClick(v.key) };
      },
      sorter: (a, b) => a.profile.name.localeCompare(b.profile.name),
      render: (profile: { name: string; position: string; tagColor: string }) => (
        <>
          <Tag style={{ marginRight: '1.2rem' }} color={profile.tagColor}>
            {profile.position}
          </Tag>
          {profile.name}
        </>
      ),
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
      key: 'groupName',
      dataIndex: 'groupName',
      title: '소속',
      width: 160,
      ellipsis: true,
      sorter: (a, b) => a.groupName.localeCompare(b.groupName),
      render: (text: string) => <>{text}</>,
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
      render: (text: string) => <>{text}</>,
    },
    {
      key: 'period',
      dataIndex: 'period',
      width: 110,
      title: '계약 만료일',
      align: 'center',
      render: (period: string) => (
        <Tag
          style={{ width: '7.2rem', textAlign: 'center' }}
          color={period === '계약 만료' ? 'red' : ''}
        >
          {period}
        </Tag>
      ),
    },
  ];

  // 테이블 데이터 맵핑
  const dataSource: Array<EmployeeTableData> = employees.map((employee, i) => {
    const { contract, attendances, hasContract } = employee;

    const groupName = contract ? contract.groupName : '소속 없음';
    const wage = contract ? `${contract.defaultWage.toLocaleString()}원` : '-';
    const attendance = contract && attendances ? `${attendances.length.toString()}일` : '-';
    const salaryText = contract ? SALARY_CODE[contract.salary] : '없음';

    const endPeriod = contract?.endPeriod.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$2월 $3일');
    const period = contract ? endPeriod : '계약 만료';

    return {
      key: i,
      profile: {
        name: employee.name,
        position: contract ? POSITION_CODE[contract.positionCode] : '없음',
        tagColor: contract ? POSITION_COLORS[contract.positionCode] : '',
      },
      phone: employee.phone,
      groupName: groupName,
      wage: { salary: salaryText, wage: wage },
      attendance: attendance,
      period: period,
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
