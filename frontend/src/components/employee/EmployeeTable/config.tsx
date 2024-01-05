import { Button, Flex, TableColumnsType, Tag } from 'antd';

import { EmployeeData, SALARY } from '~/types/employee';
import { formatPhoneNumber, formatSSN } from '~/utils/formatData';

/** [ EmployeeTable ] 데이터 인터페이스 */
export interface EmployeeTableData {
  key: string;
  employee: EmployeeData;
}

/** [ EmployeeTable ] 컬럼 인터페이스 */
interface ColumnProps {
  employees?: EmployeeData[];
  onClickName: (employee: EmployeeData) => void;
  onCopy?: (data: string) => void;
}

/**
 * [ EmployeeTable ] 컬럼 데이터를 반환합니다.
 * @param ColumnProps 대상 근무자 데이터, 핸들러
 */
export const getColumns = ({
  employees,
  onClickName,
  onCopy,
}: ColumnProps): TableColumnsType<EmployeeTableData> => {
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

  const salaryFilters = [...new Set(employees?.map(employee => employee.salaryCode))].map(
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
      fixed: 'left',
      sorter: (a, b) => a.employee.name.localeCompare(b.employee.name),
      render: (_, { employee }) => {
        const handleClick = () => onClickName(employee);

        return (
          <Button size="small" type="text" onClick={handleClick}>
            <b>{employee.name}</b>
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
      onFilter: (value, record) => record.employee.position.name === value,
      render: (_, { employee: { position } }) => {
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
      render: (_, { employee: { phone } }) => (
        <Button size="small" type="text" onContextMenu={() => onCopy?.(phone)}>
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
      render: (_, { employee: { ssn } }) => (
        <Button size="small" type="text" onContextMenu={() => onCopy?.(ssn)}>
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
      onFilter: (value, record) => record.employee.bank === value,
      render: (_, { employee: { bank, bankNum } }) => (
        <Button size="small" type="text" onContextMenu={() => onCopy?.(`${bank} ${bankNum}`)}>
          <Flex justify="space-between" style={{ width: 180, maxWidth: 180 }}>
            <Tag style={{ width: 50, textAlign: 'center' }}>{bank}</Tag>
            <span>{bankNum}</span>
          </Flex>
        </Button>
      ),
    },
    {
      key: 'salary',
      dataIndex: 'salary',
      title: '기준 수당',
      width: 160,
      align: 'center',
      filters: salaryFilters,
      onFilter: (value, record) => record.employee.salaryCode === value,
      render: (_, { employee: { position, salaryCode } }) => (
        <Flex justify="center">
          <Flex justify="space-between" style={{ width: 130, maxWidth: 130 }}>
            <Tag>{SALARY[salaryCode]}</Tag>
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
      render: (_, { employee: { endPeriod } }) => (
        <Tag style={{ width: '8rem', textAlign: 'center', marginInlineEnd: 0 }}>{endPeriod}</Tag>
      ),
    },
  ];
};
