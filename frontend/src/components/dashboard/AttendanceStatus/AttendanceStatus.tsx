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

export interface AttendanceStatusProps {
  date?: string;
  className?: string;
  children?: ReactNode;
}

const { Text } = Typography;
const AttendanceStatus = ({ date }: AttendanceStatusProps) => {
  const team = useRecoilValue(teamStore);

  const { employees } = useEmployeeQuery({ teamId: team.id, enabled: team.id !== '' });
  const { attendances } = useAttendanceQuery({
    teamId: team.id,
    date: date ? date : dayjs().format('YY-MM-DD'),
    enabled: team.id !== '',
  });

  // 직위별 출근 카운팅
  const countAttendanceByPosition = () => {
    const positionCounts = team.positions.map(position => ({
      positionId: position.id,
      name: position.name,
      count: 0,
    }));

    attendances.forEach(attendance => {
      const { positionId } = attendance;
      const positionCount = positionCounts.find(count => count.positionId === positionId);
      if (positionCount) positionCount.count += 1;
    });

    return positionCounts;
  };

  const counts = countAttendanceByPosition();
  const nonAttendanceCount = employees.length - attendances.length;

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

  return (
    <AttendanceStatusStyled className="AttendanceStatus">
      <Flex className="chart-wrap">
        <Doughnut
          data={dataSource}
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
