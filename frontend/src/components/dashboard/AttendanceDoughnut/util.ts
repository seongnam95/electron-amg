import { AttendanceData } from '~/types/attendance';
import { TeamData } from '~/types/team';

// 직위별 출근 카운팅
export const countAttendanceByPosition = (team: TeamData, attendances: AttendanceData[]) => {
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
