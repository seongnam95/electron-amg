import { ReactNode } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Typography, Flex } from 'antd';
import 'chart.js/auto';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { teamStore } from '~/stores/team';

import { AttendanceStatusStyled } from './styled';
import { countAttendanceByPosition } from './util';

export interface AttendanceStatusProps {
  date?: string;
  className?: string;
  children?: ReactNode;
}

const { Text } = Typography;
const AttendanceStatus = ({ date }: AttendanceStatusProps) => {
  const team = useRecoilValue(teamStore);

  const { employees } = useEmployeeQuery({ teamId: team.id, enabled: team.existTeam });
  const { attendances } = useAttendanceQuery({
    teamId: team.id,
    date: date ? date : dayjs().format('YY-MM-DD'),
    enabled: team.existTeam,
  });

  const counts = countAttendanceByPosition(team, attendances);
  const nonAttendanceCount = employees.length - attendances.length;
  const isEmpty = counts.reduce((sum, item) => sum + item.count, 0) === 0;

  const dataSource = {
    labels: [...counts.map(position => position.name), '미출근'],
    datasets: [
      {
        data: [...counts.map(pos => pos.count), nonAttendanceCount],
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
    <AttendanceStatusStyled className="AttendanceStatus">
      <Flex className="chart-wrap">
        <Doughnut
          data={isEmpty ? EmptyDoughnutData : dataSource}
          options={{
            cutout: '50%',

            plugins: { legend: { display: false } },
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
    </AttendanceStatusStyled>
  );
};

export default AttendanceStatus;
