import { Table, Pagination, Tag } from 'antd';
import { TableRowSelection, ColumnsType } from 'antd/es/table/interface';

import { EmployeeData } from '~/types/employee';
import { formatPhoneNumber } from '~/utils/formatData';

import { EmployeeTableWrapStyled } from './styled';

interface AntTableProps {
  employees: Array<EmployeeData>;
}

interface EmployeeTableData {
  name: string;
  phone: string;
  groupName: string;
  wage: {
    salary: string;
    wage: string;
  };
  attendance: string;
  state: boolean;
}

const AntTable = ({ employees }: AntTableProps) => {
  const columns: ColumnsType<EmployeeTableData> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '이름',
      render: (name: string) => <a>{name}</a>,
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: '연락처',
      align: 'center',
      render: (phone: string) => <p>{formatPhoneNumber(phone)}</p>,
    },
    {
      key: 'groupName',
      dataIndex: 'groupName',
      title: '소속',
      render: (text: string) => <p>{text}</p>,
    },
    {
      key: 'wage',
      dataIndex: 'wage',
      title: '기본 급여',
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
      title: '근무일',
      align: 'center',
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: '상태',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      render: (hasContract: boolean) => {
        const text = hasContract ? '정상' : '계약만료';
        const color = hasContract ? '' : 'red';
        return (
          <Tag color={color} style={{ width: '100%', textAlign: 'center' }}>
            {text}
          </Tag>
        );
      },
    },
  ];

  const data: Array<EmployeeTableData> = employees.map((employee, i) => {
    const { contract, attendances, hasContract } = employee;
    const wage = contract ? `${contract.defaultWage.toLocaleString()}원` : '-';
    const salaryText = contract
      ? contract.salary === 'daily'
        ? '일급'
        : contract.salary === 'weekly'
        ? '주급'
        : '월급'
      : '없음';

    return {
      key: i,
      name: employee.name,
      phone: employee.phone,
      groupName: contract ? contract.groupName : '소속 없음',
      wage: {
        salary: salaryText,
        wage: wage,
      },
      attendance: contract && attendances ? attendances.length.toString() : '-',
      state: hasContract,
    };
  });

  const rowSelection: TableRowSelection<EmployeeTableData> = {
    type: 'checkbox',
    onChange: v => console.log(v),
  };

  return (
    <EmployeeTableWrapStyled className="EmployeeTable">
      <Table
        prefixCls="employee-table"
        pagination={false}
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
      />
      <Pagination />
    </EmployeeTableWrapStyled>
  );
};

export default AntTable;
