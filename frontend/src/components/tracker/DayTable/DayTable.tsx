import { MouseEvent, useState } from 'react';

import { Button, Flex, Input, InputNumber, Popover, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Dayjs } from 'dayjs';

import InputButton from '~/components/common/InputButton';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { PositionData, SALARY, SalaryType } from '~/types/position';

import { DayTableStyled } from './styled';

export interface DayTableProps {
  teamId?: string;
  date?: Dayjs;
}

interface TableDataType {
  key: string;
  name: string;
  position: PositionData;
  salary: {
    salaryCode: SalaryType;
    pay: number;
  };
  includeMeal: boolean;
  incentive: number;
  deduct: number;
}

const DayTable = ({ teamId, date }: DayTableProps) => {
  const { employees } = useEmployeeQuery({ teamId: teamId, enabled: !!teamId });

  const handleSetIncentive = (incentive: number) => {
    console.log('incentive', incentive);
  };

  const RenderIncentivePopover = (incentive: number) => (
    <Flex vertical gap={12} style={{ marginTop: 14 }}>
      <InputNumber
        style={{ width: '100%' }}
        defaultValue={incentive}
        formatter={value => `+ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => Number(value?.replace(/\$\s?|(,*)/g, ''))}
      />
      <Flex justify="end" gap={8}>
        <Button type="primary" size="small" onClick={() => handleSetIncentive(incentive)}>
          저장
        </Button>
      </Flex>
    </Flex>
  );

  const columns: ColumnsType<TableDataType> = [
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
      title: '급여',
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
      render: (isInclude: boolean) => {
        const color = isInclude ? '#71B3F0' : '#F87B6A';
        const label = isInclude ? 'Y' : 'N';

        return <b style={{ color: color, marginInlineEnd: 0 }}>{label}</b>;
      },
    },
    {
      key: 'incentive',
      dataIndex: 'incentive',
      title: '인센티브',
      width: 110,
      align: 'center',
      render: (incentive: number) => (
        <Popover
          title="인센티브 설정"
          trigger="click"
          placement="bottom"
          content={RenderIncentivePopover(incentive)}
        >
          <Button size="small" type="text" style={{ color: '#2DD329' }}>
            + {incentive.toLocaleString()}
          </Button>
        </Popover>
      ),
    },
    {
      key: 'deduct',
      dataIndex: 'deduct',
      title: '페널티',
      width: 100,
      align: 'center',
      render: (deduct: number) => (
        <Button type="text" size="small" style={{ color: '#EA3B3B', width: '100%' }}>
          - {deduct.toLocaleString()}
        </Button>
      ),
    },
    {
      key: 'total',
      dataIndex: 'total',
      title: '결정 급여',
      width: 120,
      align: 'center',
      render: (total: number) => <b style={{ color: '#5855F5' }}>{total.toLocaleString()}원</b>,
    },
  ];

  const dataSource: TableDataType[] | undefined = employees.map(employee => {
    const { attendances, position } = employee;
    const attendance = attendances?.find(data => data.workingDate === date?.format('YY-MM-DD'));

    if (attendance)
      return {
        key: employee.id,
        name: employee.name,
        position: position,
        salary: {
          salaryCode: position.salaryCode,
          pay: position.pay,
        },
        includeMeal: attendance.isMealIncluded ? attendance.isMealIncluded : false,
        incentive: attendance.incentive ? attendance.incentive : 0,
        deduct: attendance.deduct ? attendance.deduct : 0,
        total: 1,
      };

    return {
      key: employee.id,
      name: employee.name,
      position: position,
      salary: {
        salaryCode: position.salaryCode,
        pay: position.pay,
      },
      includeMeal: false,
      incentive: 18000,
      deduct: 0,
      total: 0,
    };
  });

  return (
    <DayTableStyled>
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          type: 'checkbox',
          onChange: () => {},
        }}
      />
    </DayTableStyled>
  );
};

export default DayTable;
