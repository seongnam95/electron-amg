import { Flex, TableColumnsType } from 'antd';

import { colors } from '~/styles/themes';
import { AttendanceData } from '~/types/attendance';
import { TeamData } from '~/types/team';
import { UnitData } from '~/types/unit';
import { getStats } from '~/utils/statistics/report';

import { HintText } from '../MonthAttendanceTable/styled';

export interface UnitTableData {
  key: string;
  name: string;
  unitPay: number;
  count: number;
  totalPay: number;
}

export const getDataSource = (team: TeamData, attendances: AttendanceData[]): UnitTableData[] => {
  const { units, mealCost, otPay } = team;
  const {
    otCount,
    otPay: otPaySum,
    mealCostCount,
    mealCost: mealCostSum,
  } = getStats(team, 0, attendances);

  const unitData: UnitTableData[] = units.map(unit => {
    const attendancesByUnit = attendances.filter(
      attendance => attendance.position.unitId === unit.id,
    );
    const stats = getStats(team, unit.unitPay, attendancesByUnit);

    return {
      key: unit.id,
      name: unit.name,
      unitPay: unit.unitPay,
      count: stats.attendanceCount,
      totalPay: stats.dailyPay,
    };
  });

  return [
    ...unitData,
    {
      key: 'mealCost',
      name: '식대',
      unitPay: mealCost,
      count: mealCostCount,
      totalPay: mealCostSum,
    },
    {
      key: 'ot',
      name: 'OT',
      unitPay: otPay,
      count: otCount,
      totalPay: otPaySum,
    },
  ];
};

export const getColumns = (): TableColumnsType<UnitTableData> => {
  return [
    {
      key: 'unitName',
      dataIndex: 'unitName',
      title: '명칭',
      width: 70,
      align: 'left',
      render: (_, { name }) => name,
    },
    {
      key: 'unitPay',
      dataIndex: 'unitPay',
      title: '단가',
      width: 100,
      align: 'right',
      render: (_, { unitPay }) => (
        <>
          {unitPay.toLocaleString()}
          <HintText>원</HintText>
        </>
      ),
    },
    {
      key: 'count',
      dataIndex: 'count',
      title: '수',
      width: 70,
      align: 'right',
      render: (_, { count }) => <b style={{ color: colors.primary }}>{count}</b>,
    },
    {
      key: 'total',
      dataIndex: 'total',
      title: '합계',
      width: 100,
      align: 'right',
      render: (_, { totalPay }) => (
        <>
          {totalPay.toLocaleString()}
          <HintText>원</HintText>
        </>
      ),
    },
  ];
};
