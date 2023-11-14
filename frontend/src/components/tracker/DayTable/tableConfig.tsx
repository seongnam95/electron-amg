import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

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
  attendanceId?: string;
  includeMeal?: boolean;
  incentive?: number;
  deduct?: number;
}

export const AttendanceDayTableColumns: ColumnsType<TableDataType> = [
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
    render: (isInclude?: boolean) => {
      if (isInclude !== undefined) {
        const color = isInclude ? '#71B3F0' : '#F87B6A';
        const label = isInclude ? 'Y' : 'N';

        return <b style={{ color: color, marginInlineEnd: 0 }}>{label}</b>;
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
    render: (incentive?: number) => {
      if (incentive !== undefined) {
        return (
          <Button size="small" type="text" style={{ color: '#2DD329' }}>
            + {incentive.toLocaleString()}
          </Button>
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
    render: (deduct?: number) => {
      if (deduct !== undefined) {
        return (
          <Button type="text" size="small" style={{ color: '#EA3B3B', width: '100%' }}>
            - {deduct.toLocaleString()}
          </Button>
        );
      }
      return <>-</>;
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

export const AttendanceDayTableDataSource = (
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
        includeMeal: attendance.isMealIncluded ? attendance.isMealIncluded : false,
        incentive: attendance.incentive ? attendance.incentive : 0,
        deduct: attendance.deduct ? attendance.deduct : 0,
        total: totalPay,
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
    };
  });
};
