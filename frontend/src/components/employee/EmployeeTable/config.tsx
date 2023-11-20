import { Button, TableColumnsType, Tag } from 'antd';

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
  onClickName: (id: string) => void;
}

export const getColumns = ({
  onClickName,
}: ColumnProps): TableColumnsType<EmployeeTableDataType> => {
  return [
    {
      key: 'name',
      dataIndex: 'name',
      title: '이름',
      width: 110,
      ellipsis: true,
      fixed: 'left',
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
      key: 'phone',
      dataIndex: 'phone',
      title: '연락처',
      width: 140,
      align: 'center',
      render: (_, { phone }) => <>{formatPhoneNumber(phone)}</>,
    },
    {
      key: 'ssn',
      dataIndex: 'ssn',
      title: '주민등록번호',
      width: 140,
      align: 'center',
      render: (_, { ssn }) => <>{formatSSN(ssn)}</>,
    },
    {
      key: 'bank',
      dataIndex: 'bank',
      title: '계좌번호',
      width: 220,
      align: 'right',
      render: (_, { bank, bankNum }) => (
        <>
          <Tag>{bank}</Tag> {bankNum}
        </>
      ),
    },
    {
      key: 'position',
      dataIndex: 'position',
      title: '직위',
      width: 80,
      align: 'center',
      sorter: (a, b) => a.position.toString().localeCompare(b.position.toString()),
      render: (_, { position }) => {
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
      key: 'salary',
      dataIndex: 'salary',
      title: '기준 수당',
      width: 180,
      render: (_, { position }) => (
        <>
          <Tag>{SALARY[position.salaryCode]}</Tag>
          {position.standardPay.toLocaleString()}원
        </>
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
