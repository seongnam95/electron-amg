import { useMemo } from 'react';

import { Typography, Flex } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import ColorBar from '~/components/employee/ColorBar';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployee } from '~/hooks/queryHooks/useEmployeeQuery';
import { teamStore } from '~/stores/team';
import { EmployeeData } from '~/types/employee';

import { DailyAttendanceStatsStyled } from './styled';

export interface DailyAttendanceStatsProps {
  day?: Dayjs;
}

const { Text } = Typography;
const DailyAttendanceStats = ({ day = dayjs() }: DailyAttendanceStatsProps) => {
  const team = useRecoilValue(teamStore);

  const { employees } = useEmployee({ teamId: team.id, enabled: team.existTeam });
  const { attendances } = useAttendanceQuery({
    teamId: team.id,
    day: day,
    dayType: 'date',
    enabled: team.existTeam,
  });

  const reports = useMemo(() => {
    const newEmployees = employees.reduce((acc, employee) => {
      const attendancePosition = attendances.find(
        attendance => attendance.employeeId === employee.id,
      );
      const newPosition = attendancePosition ? attendancePosition.position : employee.position;
      acc.push({
        ...employee,
        positionId: newPosition.id,
        position: newPosition,
      });
      return acc;
    }, [] as EmployeeData[]);

    const report = team.positions.map(position => {
      const totalCount = newEmployees.filter(
        employee => employee.positionId === position.id,
      ).length;

      const attendanceCount = attendances.filter(
        attendance => attendance.positionId === position.id,
      ).length;

      return {
        position: position,
        totalCount: totalCount,
        attendanceCount: attendanceCount,
      };
    });

    return report;
  }, [employees, attendances]);

  return (
    <DailyAttendanceStatsStyled className="AttendanceDoughnut">
      <Flex vertical style={{ width: '100%' }}>
        {reports.map(report => {
          return (
            <Flex justify="space-between" key={report.position.id}>
              <Flex className="position-label-wrap" align="center" gap={6}>
                <ColorBar color={report.position.color} height="1.4rem" />
                {report.position.name}
              </Flex>
              <Flex gap={4} align="center">
                <Text type="secondary">{report.totalCount} / </Text>
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
    </DailyAttendanceStatsStyled>
  );
};

export default DailyAttendanceStats;
