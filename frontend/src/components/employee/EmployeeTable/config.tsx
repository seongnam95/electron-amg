import { Button, TableColumnsType, Tag } from 'antd';

import { PositionData, SALARY } from '~/types/position';
import { formatPhoneNumber } from '~/utils/formatData';

export interface EmployeeTableDataType {
  key: string;
  name: string;
  phone: string;
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
      width: 150,
      align: 'center',
      render: (_, { phone }) => <>{formatPhoneNumber(phone)}</>,
    },
    {
      key: 'position',
      dataIndex: 'position',
      title: '직위',
      width: 90,
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
      width: 200,
      align: 'center',
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
      width: 120,
      title: '계약 만료일',
      align: 'center',
      render: (_, { endPeriod }) => (
        <Tag style={{ width: '8rem', textAlign: 'center', marginInlineEnd: 0 }}>{endPeriod}</Tag>
      ),
    },
  ];
};
