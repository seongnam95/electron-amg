import { useMemo } from 'react';

import { Typography, Flex, Skeleton, Empty } from 'antd';

import ColorBar from '~/components/employee/ColorBar';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { TeamData } from '~/types/team';

import { DailyAttendanceStatsStyled } from './styled';

export interface DailyAttendanceStatsProps {
  team?: TeamData;
  employees?: EmployeeData[];
  attendances?: AttendanceData[];
  loading?: boolean;
}

const { Text } = Typography;
const DailyAttendanceStats = ({
  team,
  employees,
  attendances,
  loading,
}: DailyAttendanceStatsProps) => {
  if (loading) return <Skeleton active />;
  else if (!team || !employees || !attendances) return <Empty />;
  const filteredEmployees = employees.filter(employee => !employee.isVirtual);

  const stats = useMemo(() => {
    /**
     * Attendance 기록에 따라 포지션 변경
     * : 근무자의 기존 포지션과 출근 당일 포지션이 다를 경우를 대비
     */
    const todayEmployees = filteredEmployees.reduce((acc, employee) => {
      const filteredAttendances = attendances.find(
        attendance => attendance.employeeId === employee.id,
      );

      const newPosition = filteredAttendances ? filteredAttendances.position : employee.position;
      acc.push({
        ...employee,
        positionId: newPosition.id,
        position: newPosition,
      });
      return acc;
    }, [] as EmployeeData[]);

    return team.positions.map(position => {
      const totalCount = todayEmployees.filter(
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
  }, [filteredEmployees, attendances]);

  return (
    <DailyAttendanceStatsStyled className="AttendanceDoughnut">
      <Flex vertical style={{ width: '100%' }}>
        {stats.map(report => {
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
            <Text strong>{filteredEmployees.length}</Text>
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
