import { FaCircleCheck } from 'react-icons/fa6';
import { MdEditNote } from 'react-icons/md';

import { Button, Flex, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { HintText } from '~/components/dashboard/MonthAttendanceTable/styled';
import { colors } from '~/styles/themes';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { SALARY } from '~/types/position';

export interface DayTableData {
  key: string;
  employee: EmployeeData;
  attendance?: AttendanceData;
}

interface ColumnProps {
  employees?: EmployeeData[];
  onClickName?: (employee: EmployeeData) => void;
}

export const getColumns = ({ employees, onClickName }: ColumnProps): ColumnsType<DayTableData> => {
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
      sorter: (a, b) => a.employee.name.localeCompare(b.employee.name),
      render: (_, { employee }) => (
        <Button size="small" type="text" onClick={() => onClickName?.(employee)}>
          <b>{employee.name}</b>
        </Button>
      ),
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
      key: 'salary',
      dataIndex: 'salary',
      title: '일일 수당',
      width: 160,
      align: 'center',
      filters: salaryFilters,
      onFilter: (value, record) => record.employee.position.salaryCode === value,
      render: (_, { employee: { position } }) => (
        <Flex justify="center">
          <Flex justify="space-between" style={{ width: 120, maxWidth: 120 }}>
            <Tag>{SALARY[position.salaryCode]}</Tag>
            <span>{position.standardPay.toLocaleString()}원</span>
          </Flex>
        </Flex>
      ),
    },
    {
      key: 'mealIncluded',
      dataIndex: 'mealIncluded',
      title: '식대 포함',
      width: 80,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined || !attendance.includeMealCost) return null;
        return (
          <Flex align="center" justify="center">
            <FaCircleCheck color={colors.success} />
          </Flex>
        );
      },
    },
    {
      key: 'prePay',
      dataIndex: 'prePay',
      title: '선지급',
      width: 70,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined || !attendance.isPaid) return null;
        return (
          <Flex align="center" justify="center">
            <FaCircleCheck color={colors.success} />
          </Flex>
        );
      },
    },
    {
      key: 'otCount',
      dataIndex: 'otCount',
      title: 'OT',
      width: 90,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined || attendance.otCount === 0) return null;
        return (
          <Flex align="center" justify="center">
            {attendance.otCount}
            <HintText>T</HintText>
          </Flex>
        );
      },
    },
    {
      key: 'memo',
      dataIndex: 'memo',
      title: '메모',
      width: 50,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined || !attendance.memo) return null;
        return (
          <Flex justify="center">
            <Tooltip title={attendance.memo}>
              <Button type="text" size="small" icon={<MdEditNote size={20} color="#767676" />} />
            </Tooltip>
          </Flex>
        );
      },
    },
    {
      key: 'total',
      dataIndex: 'total',
      title: '지급액',
      width: 110,
      align: 'center',
      render: (_, { attendance, employee: { position } }) => {
        if (attendance === undefined) return null;

        const {} = attendance;
        return <b style={{ color: '#5855F5' }}>{position.standardPay.toLocaleString()}원</b>;
      },
    },
    {
      key: 'state',
      dataIndex: 'state',
      title: '상태',
      width: 80,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined)
          return (
            <Tag style={{ width: '100%', textAlign: 'center', marginInlineEnd: 0 }}>미출근</Tag>
          );
        return (
          <Tag color="#5855F5" style={{ width: '100%', textAlign: 'center', marginInlineEnd: 0 }}>
            출근
          </Tag>
        );
      },
    },
  ];
};
