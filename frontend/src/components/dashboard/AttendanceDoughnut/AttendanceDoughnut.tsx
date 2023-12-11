import { Doughnut } from 'react-chartjs-2';

import { Typography, Flex } from 'antd';
import 'chart.js/auto';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { teamStore } from '~/stores/team';

import { AttendanceDoughnutStyled } from './styled';
import { countAttendanceByPosition } from './util';

export interface AttendanceDoughnutProps {
  date?: Dayjs;
}

const { Text } = Typography;
const AttendanceDoughnut = ({ date = dayjs() }: AttendanceDoughnutProps) => {
  const team = useRecoilValue(teamStore);

  const { employees } = useEmployeeQuery({ teamId: team.id, enabled: team.existTeam });
  const { attendances } = useAttendanceQuery({
    teamId: team.id,
    dateStr: date.format('YY-MM-DD'),
    enabled: team.existTeam,
  });

  const positions = team.existTeam ? countAttendanceByPosition(team, attendances) : [];
  const nonAttendanceCount = employees.length - attendances.length;
  const isEmpty = positions.reduce((sum, item) => sum + item.count.total, 0) === 0;

  const dataSource = {
    labels: [...positions.map(position => position.name), '미출근'],
    datasets: [
      {
        data: [...positions.map(position => position.count.total), nonAttendanceCount],
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

  return (
    <AttendanceDoughnutStyled className="AttendanceDoughnut">
      <Flex className="chart-wrap" justify="space-between">
        <Doughnut
          data={isEmpty ? EmptyDoughnutData : dataSource}
          options={{
            cutout: '50%',
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  title: () => date.format('YY년 MM월 DD일'),
                  label: item => ` ${item.label} : ${item.formattedValue}명`,
                },
              },
            },
          }}
        />
      </Flex>

      <Flex vertical gap={4} style={{ width: '100%' }}>
        <Flex flex={1} justify="space-between">
          <Text type="secondary">총 인원</Text>
          <Flex gap={4} align="center">
            <Text strong>{employees.length}</Text>
            <Text type="secondary">명</Text>
          </Flex>
        </Flex>
        <Flex flex={1} justify="space-between">
          <Text type="secondary">출근</Text>
          <Flex gap={4} align="center">
            <Text strong>{attendances.length}</Text>
            <Text type="secondary">명</Text>
          </Flex>
        </Flex>
      </Flex>
    </AttendanceDoughnutStyled>
  );
};

export default AttendanceDoughnut;
