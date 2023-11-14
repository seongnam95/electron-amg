import { MdEditNote } from 'react-icons/md';

import { Button, Flex, Form, Input, InputNumber, Popover, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';

import InputPopover from '~/components/common/InputPopover';
import { EmployeeAttendanceData } from '~/types/attendance';
import { PositionData, SALARY, SalaryType } from '~/types/position';

export interface TableDataType {
  key: string;
  name: string;
  position: PositionData;
  salary: {
    salaryCode: SalaryType;
    pay: number;
  };
  attendanceId: string;
  includeMeal?: boolean;
  incentive?: number;
  deduct?: number;
  memo?: string;
}

export type ChangeValueType<T> = {
  id: string;
  value: T | null;
};

interface ColumnProps {
  onClickMealInclude?: (v: ChangeValueType<boolean>) => void;

  onChangeIncentive?: (v: ChangeValueType<number>) => void;
  onChangeDeduct?: (v: ChangeValueType<number>) => void;
  onChangeMemo?: (v: ChangeValueType<string>) => void;
}

export const getColumns = ({
  onClickMealInclude,
  onChangeIncentive,
  onChangeDeduct,
  onChangeMemo,
}: ColumnProps = {}): ColumnsType<TableDataType> => {
  return [
    {
      key: 'name',
      dataIndex: 'name',
      title: '이름',
      width: 110,
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string) => <b>{name}</b>,
    },
    {
      key: 'position',
      dataIndex: 'position',
      title: '직위',
      width: 90,
      align: 'center',
      sorter: (a, b) => a.position.toString().localeCompare(b.position.toString()),
      render: (position: PositionData) => {
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
      render: ({ salaryCode, pay }: { salaryCode: SalaryType; pay: number }) => (
        <>
          <Tag>{SALARY[salaryCode]}</Tag>
          {pay.toLocaleString()}원
        </>
      ),
    },
    {
      key: 'includeMeal',
      dataIndex: 'includeMeal',
      title: '식대 포함',
      width: 94,
      align: 'center',
      render: (isInclude, data) => {
        if (isInclude !== undefined) {
          const color = isInclude ? '#71B3F0' : '#F87B6A';
          const label = isInclude ? 'Y' : 'N';

          const handleClick = () =>
            onClickMealInclude?.({ id: data.attendanceId, value: !isInclude });

          return (
            <Button size="small" type="text" style={{ color: color }} onClick={handleClick}>
              {label}
            </Button>
          );
        }
        return <>-</>;
      },
    },
    {
      key: 'incentive',
      dataIndex: 'incentive',
      title: '인센티브',
      width: 110,
      align: 'center',
      render: (incentive, data) => {
        if (incentive !== undefined) {
          return (
            <InputPopover
              title="인센티브"
              inputType="number"
              placeholder={incentive}
              onSubmit={v => onChangeIncentive?.({ id: data.attendanceId, value: v as number })}
            >
              <Button size="small" type="text" style={{ color: '#2DD329' }}>
                + {incentive.toLocaleString()}
              </Button>
            </InputPopover>
          );
        }
        return <>-</>;
      },
    },
    {
      key: 'deduct',
      dataIndex: 'deduct',
      title: '페널티',
      width: 100,
      align: 'center',
      render: (deduct, data) => {
        if (deduct !== undefined) {
          return (
            <InputPopover
              title="패널티"
              inputType="number"
              placeholder={deduct}
              onSubmit={v => onChangeDeduct?.({ id: data.attendanceId, value: v as number })}
            >
              <Button type="text" size="small" style={{ color: '#EA3B3B' }}>
                - {deduct.toLocaleString()}
              </Button>
            </InputPopover>
          );
        }
        return <>-</>;
      },
    },
    {
      key: 'memo',
      dataIndex: 'memo',
      title: '메모',
      width: 70,
      align: 'center',

      render: (memo, data) => {
        if (memo) {
          return (
            <InputPopover
              title="메모"
              inputType="text"
              placeholder={memo}
              onSubmit={v => onChangeMemo?.({ id: data.attendanceId, value: v as string })}
            >
              <Flex>
                <Tooltip title={memo}>
                  <Button
                    type="text"
                    size="small"
                    icon={<MdEditNote size={20} color="#767676" />}
                  />
                </Tooltip>
              </Flex>
            </InputPopover>
          );
        }
        return <></>;
      },
    },
    {
      key: 'total',
      dataIndex: 'total',
      title: '결정 수당',
      width: 120,
      align: 'center',
      render: (total?: number) => {
        if (total !== undefined) {
          return <b style={{ color: '#5855F5' }}>{total.toLocaleString()}원</b>;
        }
        return <Tag>미출근</Tag>;
      },
    },
  ];
};

export const getDataSource = (
  employees?: EmployeeAttendanceData[],
): TableDataType[] | undefined => {
  if (!employees) return;

  return employees.map(employee => {
    const { attendances, position } = employee;
    const attendance = attendances?.[0];

    if (attendance) {
      const { incentive, deduct, isMealIncluded } = attendance;
      const totalPay =
        position.pay - Number(deduct) + Number(incentive) - (isMealIncluded ? 7000 : 0);

      return {
        key: employee.id,
        name: employee.name,
        position: position,
        salary: {
          salaryCode: position.salaryCode,
          pay: position.pay,
        },
        attendanceId: attendance.id,
        includeMeal: attendance.isMealIncluded,
        incentive: attendance.incentive,
        deduct: attendance.deduct,
        total: totalPay,
        memo: attendance.memo,
      };
    }

    return {
      key: employee.id,
      name: employee.name,
      position: position,
      salary: {
        salaryCode: position.salaryCode,
        pay: position.pay,
      },
      attendanceId: '',
    };
  });
};
