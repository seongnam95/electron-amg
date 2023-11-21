import { MdEditNote } from 'react-icons/md';

import { Button, Flex, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';

import InputPopover from '~/components/common/InputPopover';
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
  onClickName?: (id: string) => void;
  onChangeValue?: (v: ChangeValueType) => void;
}

export const getColumns = ({
  employees,
  onClickName,
  onChangeValue,
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
        const handleClick = () => onClickName?.(key.toString());

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
      width: 160,
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
          onChangeValue?.({
            key: 'isMealIncluded',
            id: id,
            value: !isMealIncluded,
          });
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
            key="incentive"
            title="인센티브"
            inputType="number"
            placeholder={incentive}
            onSubmit={(key, value) =>
              onChangeValue?.({ key: key as keyof AttendanceUpdateBody, id: id, value: value })
            }
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
            key="deduct"
            title="공제"
            inputType="number"
            placeholder={deduct}
            onSubmit={(key, value) =>
              onChangeValue?.({ key: key as keyof AttendanceUpdateBody, id: id, value: value })
            }
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
            key="memo"
            title="메모"
            inputType="text"
            placeholder={memo}
            onSubmit={(key, value) =>
              onChangeValue?.({ key: key as keyof AttendanceUpdateBody, id: id, value: value })
            }
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
