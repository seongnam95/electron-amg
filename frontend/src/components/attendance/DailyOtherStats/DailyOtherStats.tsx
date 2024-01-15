import { Descriptions, Empty, Skeleton } from 'antd';

import { HintText } from '~/components/dashboard/MonthlyAttendanceTable/styled';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { TeamData } from '~/types/team';
import { getAttendanceStats } from '~/utils/statistics/report';

import { DailyOtherStatsStyled } from './styled';

export interface DailyOtherStatsProps {
  team?: TeamData;
  employees?: EmployeeData[];
  attendances?: AttendanceData[];
  loading?: boolean;
}

const DailyOtherStats = ({ team, employees, attendances, loading }: DailyOtherStatsProps) => {
  if (loading) return <Skeleton active />;
  else if (!team || !employees || !attendances) return <Empty />;

  const report = getAttendanceStats(team, attendances);

  return (
    <DailyOtherStatsStyled>
      <Descriptions
        column={1}
        colon={false}
        contentStyle={{ display: 'inline-block', textAlign: 'right' }}
      >
        <Descriptions.Item label="식대">
          {report.mealCostCount}
          <HintText>개</HintText>
        </Descriptions.Item>

        <Descriptions.Item label="OT">
          {report.otCount}
          <HintText>시간</HintText>
        </Descriptions.Item>

        <Descriptions.Item label="선지급">
          {report.prepaySum.toLocaleString()}
          <HintText>원</HintText>
        </Descriptions.Item>

        <Descriptions.Item label="인센티브">
          {report.incentiveSum.toLocaleString()}
          <HintText>원</HintText>
        </Descriptions.Item>

        <Descriptions.Item label="일일 수당">
          {report.paySum.toLocaleString()}
          <HintText>원</HintText>
        </Descriptions.Item>
      </Descriptions>
    </DailyOtherStatsStyled>
  );
};

export default DailyOtherStats;
