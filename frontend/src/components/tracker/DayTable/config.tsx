import { MdEditNote } from 'react-icons/md';

import { Button, Flex, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';

import InputPopover from '~/components/common/InputPopover';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { PositionData, SALARY } from '~/types/position';

export interface DayTableData {
  key: string;
  name: string;
  position: PositionData;
  attendance?: AttendanceData;
}

export type ChangeValueType<T> = {
  id: string;
  value: T | null;
};

interface ColumnProps {
  employees?: EmployeeData[];
  onClickName: (id: string) => void;
  onClickMealInclude: (v: ChangeValueType<boolean>) => void;
  onChangeIncentive: (v: ChangeValueType<number>) => void;
  onChangeDeduct: (v: ChangeValueType<number>) => void;
  onChangeMemo: (v: ChangeValueType<string>) => void;
}

export const getColumns = ({
  employees,
  onClickName,
  onClickMealInclude,
  onChangeIncentive,
  onChangeDeduct,
  onChangeMemo,
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
      key: 'isMealIncluded',
      dataIndex: 'isMealIncluded',
      title: '식대 포함',
      width: 84,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined) return '-';
        const { id, isMealIncluded } = attendance;

        const color = isMealIncluded ? '#71B3F0' : '#F87B6A';
        const label = isMealIncluded ? 'Y' : 'N';

        const handleClick = () => {
          onClickMealInclude({ id: id, value: !isMealIncluded });
        };

        return (
          <Button size="small" type="text" style={{ color: color }} onClick={handleClick}>
            {label}
          </Button>
        );
      },
    },
    {
      key: 'incentive',
      dataIndex: 'incentive',
      title: '인센티브',
      width: 100,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined) return '-';
        const { id, incentive } = attendance;

        return (
          <InputPopover
            title="인센티브"
            inputType="number"
            placeholder={incentive}
            onSubmit={v => onChangeIncentive({ id: id, value: v as number })}
          >
            <Button size="small" type="text" style={{ color: '#2DD329' }}>
              + {incentive.toLocaleString()}
            </Button>
          </InputPopover>
        );
      },
    },
    {
      key: 'deduct',
      dataIndex: 'deduct',
      title: '공제',
      width: 100,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined) return '-';
        const { id, deduct } = attendance;

        return (
          <InputPopover
            title="공제"
            inputType="number"
            placeholder={deduct}
            onSubmit={v => onChangeDeduct({ id: id, value: v as number })}
          >
            <Button type="text" size="small" style={{ color: '#EA3B3B' }}>
              - {deduct.toLocaleString()}
            </Button>
          </InputPopover>
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
        if (attendance === undefined) return '-';
        const { id, memo } = attendance;

        return (
          <InputPopover
            title="메모"
            inputType="text"
            placeholder={memo}
            onSubmit={v => onChangeMemo({ id: id, value: v as string })}
          >
            <Flex justify="center">
              <Tooltip title={memo}>
                <Button type="text" size="small" icon={<MdEditNote size={20} color="#767676" />} />
              </Tooltip>
            </Flex>
          </InputPopover>
        );
      },
    },
    {
      key: 'total',
      dataIndex: 'total',
      title: '결정 수당',
      width: 110,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined) return <Tag style={{ marginInlineEnd: 0 }}>미출근</Tag>;
        const { pay } = attendance;
        return <b style={{ color: '#5855F5' }}>{pay.toLocaleString()}원</b>;
      },
    },
  ];
};
