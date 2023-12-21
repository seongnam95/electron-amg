import { Doughnut } from 'react-chartjs-2';

import { Typography, Flex } from 'antd';
import 'chart.js/auto';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { teamStore } from '~/stores/team';
import { getAttendanceStats } from '~/utils/statistics/report';

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

  const nonAttendanceCount = employees.length - attendances.length;

  const dataSource = {
    labels: [...reports.map(report => report.target.name), '미출근'],
    datasets: [
      {
        data: [...reports.map(report => report.attendanceCount), nonAttendanceCount],
        backgroundColor: [...team.positions.map(position => position.color), '#e8e8e8'],
        borderWidth: 0,
      },
    ],
  };

  const EmptyDoughnutData = {
    labels: ['데이터 없음'],
    datasets: [
      {
        data: [100],
        backgroundColor: ['#e8e8e8'],
        borderWidth: 0,
      },
    ],
  };

  const isEmptyAttendance =
    reports.reduce((total, value) => (total += value.attendanceCount), 0) === 0;

  return (
    <DailyAttendanceDoughnutStyled className="AttendanceDoughnut">
      <Flex className="chart-wrap" justify="space-between">
        <Doughnut
          data={isEmptyAttendance ? EmptyDoughnutData : dataSource}
          options={{
            cutout: '50%',
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  title: () => day.format('YY년 MM월 DD일'),
                  label: item => ` ${item.label} : ${item.formattedValue}명`,
                },
              },
            },
          }}
        />
      </Flex>

      <Flex vertical gap={4} style={{ width: '100%' }}>
        <Flex flex={1} gap={24} justify="space-between">
          <Text type="secondary">출근 예상 인원</Text>
          <Flex gap={4} align="center">
            <Text strong>{employees.length}</Text>
            <Text type="secondary">명</Text>
          </Flex>
        </Flex>
        <Flex flex={1} gap={24} justify="space-between">
          <Text type="secondary">출근 인원</Text>
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
