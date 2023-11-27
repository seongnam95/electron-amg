import { ReactNode } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Typography, Flex } from 'antd';
import 'chart.js/auto';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { teamStore } from '~/stores/team';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { PositionData } from '~/types/position';

import { AttendanceStatusStyled } from './styled';

export interface AttendanceStatusProps {
  className?: string;
  children?: ReactNode;
}

const { Text } = Typography;
const AttendanceStatus = ({}: AttendanceStatusProps) => {
  const team = useRecoilValue(teamStore);

  const { employees } = useEmployeeQuery({ teamId: team.id, enabled: team.id !== '' });
  const { attendances } = useAttendanceQuery({
    teamId: team.id,
    date: '23-11-27',
    enabled: team.id !== '',
  });

  const countAttendanceByPosition = (
    employees: EmployeeData[],
    attendances: AttendanceData[],
    positions: PositionData[],
  ) => {
    // 포지션별 출근 횟수를 초기화합니다.
    const attendanceCounts = positions.map(position => ({
      positionId: position.id,
      position: position.name,
      count: 0,
    }));

    // 직원별 포지션 ID를 매핑합니다.
    const positionIdMap = employees.reduce((acc, employee) => {
      acc[employee.id] = employee.position.id;
      return acc;
    }, {} as { [employeeId: string]: string });

    // 출근 데이터를 순회하며 포지션별 출근 횟수를 계산합니다.
    attendances.forEach(attendance => {
      const positionId = positionIdMap[attendance.employeeId];
      if (positionId) {
        const positionCount = attendanceCounts.find(count => count.position === positionId);
        if (positionCount) {
          positionCount.count += 1;
        }
      }
    });

    return attendanceCounts;
  };

  console.log(countAttendanceByPosition(employees, attendances, team.positions));
  const dataSource = {
    labels: [...team.positions.map(position => position.name), '미출근'],
    datasets: [
      {
        label: '',
        data: [1, 2, 20, 5, 1, 3, 14],
        backgroundColor: [...team.positions.map(position => position.color), '#e8e8e8'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <AttendanceStatusStyled className="AttendanceStatus">
      <Doughnut
        className="chart"
        data={dataSource}
        options={{
          cutout: '50%',
          plugins: { legend: { display: false } },
        }}
      />

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
