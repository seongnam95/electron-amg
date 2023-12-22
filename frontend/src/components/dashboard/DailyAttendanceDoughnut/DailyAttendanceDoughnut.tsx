import { Doughnut } from 'react-chartjs-2';

import { Typography, Flex } from 'antd';
import 'chart.js/auto';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { teamStore } from '~/stores/team';
import { colors } from '~/styles/themes';
import { getAttendanceStats } from '~/utils/statistics/report';

import { PositionColorBox } from '../MonthlyAttendanceTable/styled';
import { DailyAttendanceDoughnutStyled } from './styled';

export interface DailyAttendanceDoughnutProps {
  day?: Dayjs;
}

const { Text } = Typography;
const DailyAttendanceDoughnut = ({ day = dayjs() }: DailyAttendanceDoughnutProps) => {
  const team = useRecoilValue(teamStore);

  const { employees } = useEmployeeQuery({ teamId: team.id, enabled: team.existTeam });
  const { attendances } = useAttendanceQuery({
    teamId: team.id,
    day: day,
    dayType: 'date',
    enabled: team.existTeam,
  });

  const reports = team.positions.map(position => {
    const filteredAttendances = attendances.filter(
      attendance => attendance.positionId === position.id,
    );
    const stats = getAttendanceStats(team, position.standardPay, filteredAttendances);
    return { ...stats, target: position };
  });

  return (
    <DailyAttendanceDoughnutStyled className="AttendanceDoughnut">
      <Flex vertical style={{ width: '100%' }}>
        {reports.map(report => {
          const totalEmployeeCount = employees.filter(
            employee => employee.position.id === report.target.id,
          ).length;

          return (
            <Flex justify="space-between">
              <Flex className="position-label-wrap" align="center" gap={6}>
                <PositionColorBox color={report.target.color} />
                {report.target.name}
              </Flex>
              <Flex gap={4} align="center">
                <Text type="secondary">{totalEmployeeCount} / </Text>
                <Text strong>{report.attendanceCount}</Text>
                <Text type="secondary">명</Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>

      <Flex vertical gap={4} style={{ width: '100%' }}>
        <Flex flex={1} gap={24} justify="space-between">
          <Text type="secondary">전체 인원</Text>
          <Flex gap={4} align="center">
            <Text strong>{employees.length}</Text>
            <Text type="secondary">명</Text>
          </Flex>
        </Flex>
        <Flex flex={1} gap={24} justify="space-between">
          <Text type="secondary">총 출근 인원</Text>
          <Flex gap={4} align="center">
            <Text strong>{attendances.length}</Text>
            <Text type="secondary">명</Text>
          </Flex>
        </Flex>
      </Flex>
    </DailyAttendanceDoughnutStyled>
  );
};

export default DailyAttendanceDoughnut;
