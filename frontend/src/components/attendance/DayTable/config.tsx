import { FaCircleCheck } from 'react-icons/fa6';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MdEditNote } from 'react-icons/md';

import { Button, Dropdown, Flex, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';

import DropdownItem from '~/components/common/DropdownItem';
import { HintText } from '~/components/dashboard/MonthAttendanceTable/styled';
import { colors } from '~/styles/themes';
import { AttendanceData, AttendanceUpdateBody } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { PositionData, SALARY } from '~/types/position';

export interface DayTableData {
  key: string;
  name: string;
  position: PositionData;
  attendance?: AttendanceData;
}

export type ChangeValueType = {
  key: keyof AttendanceUpdateBody;
  id: string;
  value: any;
};

interface ColumnProps {
  employees?: EmployeeData[];
  onClick?: (id: string) => void;
  onCreate?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export const getColumns = ({
  employees,
  onClick,
  onCreate,
  onCancel,
}: ColumnProps): ColumnsType<DayTableData> => {
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
        const handleClick = () => onClick?.(key.toString());

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
      key: 'salary',
      dataIndex: 'salary',
      title: '일일 수당',
      width: 160,
      align: 'center',
      filters: salaryFilters,
      onFilter: (value, record) => record.position.salaryCode === value,
      render: (_, { position }) => (
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
      render: (_, { attendance, position }) => {
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
      render: (_, { key, attendance }) => {
        if (attendance === undefined)
          return (
            <Tag
              onContextMenu={() => onCreate?.(key.toString())}
              style={{ width: '100%', textAlign: 'center', marginInlineEnd: 0 }}
            >
              미출근
            </Tag>
          );

        return (
          <Tag
            color="#5855F5"
            onContextMenu={() => onCancel?.(attendance.id)}
            style={{ width: '100%', textAlign: 'center', marginInlineEnd: 0 }}
          >
            출근
          </Tag>
        );
      },
    },
    {
      key: 'menu',
      dataIndex: 'menu',
      title: '',
      width: 42,
      align: 'center',
      render: (_, { attendance, position }) => {
        const menuItems = [
          {
            key: 'create-draft',
            label: <DropdownItem label="출근 처리" icon={<div />} color="#1677FF" />,
            onClick: () => {},
          },
          {
            key: 'refetch',
            label: <DropdownItem label="식대 포함" icon={<div />} />,
            onClick: () => {},
          },
          {
            key: 'refetch',
            label: <DropdownItem label="선지급" icon={<div />} />,
            onClick: () => {},
          },
          {
            key: 'refetch',
            label: <DropdownItem label="OT 추가" icon={<div />} />,
            onClick: () => {},
          },
        ];
        return (
          <Dropdown placement="bottomRight" trigger={['click']} arrow menu={{ items: menuItems }}>
            <Button size="small" type="text" icon={<HiOutlineDotsVertical />} />
          </Dropdown>
        );
      },
    },
  ];
};
