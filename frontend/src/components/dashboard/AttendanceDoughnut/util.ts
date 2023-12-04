import { AttendanceData } from '~/types/attendance';
import { TeamData } from '~/types/team';

// 직위별 출근 카운팅
export const countAttendanceByPosition = (team: TeamData, attendances: AttendanceData[]) => {
  const positions = team.positions.map(position => ({
    ...position,
    count: {
      includeMeal: 0,
      excludeMeal: 0,
      total: 0,
    },
  }));

  attendances.forEach(attendance => {
    const { positionId, mealIncluded } = attendance;
    const attendanceSum = positions.find(position => position.id === positionId);

    if (attendanceSum) {
      attendanceSum.count.includeMeal += mealIncluded ? 1 : 0;
      attendanceSum.count.excludeMeal += mealIncluded ? 0 : 1;
      attendanceSum.count.total += 1;
    }
  });

  return positions;
};
