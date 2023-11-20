import { Button, Flex, TableColumnsType, Tag } from 'antd';

import { EmployeeData } from '~/types/employee';
import { PositionData, SALARY } from '~/types/position';
import { formatPhoneNumber, formatSSN } from '~/utils/formatData';

export interface EmployeeTableDataType {
  key: string;
  name: string;
  phone: string;
  ssn: string;
  bank: string;
  bankNum: string;
  endPeriod: string;
  position: PositionData;
}

interface ColumnProps {
  employees?: EmployeeData[];
  onClickName: (id: string) => void;
  onCopy?: (data: string) => void;
}

export const getColumns = ({
  employees,
  onClickName,
  onCopy,
}: ColumnProps): TableColumnsType<EmployeeTableDataType> => {
  const bankFilters = [...new Set(employees?.map(employee => employee.bank))].map(bank => {
    return {
      value: bank,
      text: bank,
    };
  });

  const positionFilters = [...new Set(employees?.map(employee => employee.position.name))].map(
    position => {
      return {
        value: position,
        text: position,
      };
    },
  );

  const salaryFilters = [...new Set(employees?.map(employee => employee.position.salaryCode))].map(
    salary => {
      return {
        value: salary,
        text: SALARY[salary],
      };
    },
  );

  return [
    {
      key: 'name',
      dataIndex: 'name',
      title: '이름',
      width: 90,
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, { key, name }) => {
        const handleClick = () => onClickName(key.toString());

        return (
          <Button size="small" type="text" onClick={handleClick}>
            <b>{name}</b>
          </Button>
        );
      },
    },
    {
      key: 'position',
      dataIndex: 'position',
      title: '직위',
      width: 90,
      align: 'center',
      filters: positionFilters,
      onFilter: (value, record) => record.position.name === value,
      render: (_, { position }) => {
        return (
          <Tag
            style={{ width: 64, textAlign: 'center', marginInlineEnd: 0 }}
            color={position.color}
          >
            {position.name}
          </Tag>
        );
      },
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: '연락처',
      width: 140,
      align: 'center',
      render: (_, { phone }) => (
        <Button size="small" type="text" onDoubleClick={() => onCopy?.(phone)}>
          {formatPhoneNumber(phone)}
        </Button>
      ),
    },
    {
      key: 'ssn',
      dataIndex: 'ssn',
      title: '주민등록번호',
      width: 150,
      align: 'center',
      render: (_, { ssn }) => (
        <Button size="small" type="text" onDoubleClick={() => onCopy?.(ssn)}>
          {formatSSN(ssn)}
        </Button>
      ),
    },
    {
      key: 'bank',
      dataIndex: 'bank',
      title: '계좌번호',
      width: 210,
      align: 'center',
      filters: bankFilters,
      onFilter: (value, record) => record.bank === value,
      render: (_, { bank, bankNum }) => (
        <Button size="small" type="text" onDoubleClick={() => onCopy?.(`${bank} ${bankNum}`)}>
          <Flex>
            <Tag style={{ width: 50, textAlign: 'center' }}>{bank}</Tag> <span>{bankNum}</span>
          </Flex>
        </Button>
      ),
    },

    {
      key: 'salary',
      dataIndex: 'salary',
      title: '기준 수당',
      width: 130,
      align: 'center',
      filters: salaryFilters,
      onFilter: (value, record) => record.position.salaryCode === value,
      render: (_, { position }) => (
        <Flex justify="center">
          <Flex justify="space-between" style={{ width: 130, maxWidth: 130 }}>
            <Tag>{SALARY[position.salaryCode]}</Tag>
            <span>{position.standardPay.toLocaleString()}원</span>
          </Flex>
        </Flex>
      ),
    },
    {
      key: 'period',
      dataIndex: 'period',
      width: 110,
      title: '계약 만료일',
      align: 'center',
      render: (_, { endPeriod }) => (
        <Tag style={{ width: '8rem', textAlign: 'center', marginInlineEnd: 0 }}>{endPeriod}</Tag>
      ),
    },
  ];
};
