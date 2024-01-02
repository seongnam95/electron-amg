import { AttendanceData } from '~/types/attendance';
import { TeamData } from '~/types/team';

// 직위별 출근 카운팅
export const countAttendanceByPosition = (team: TeamData, attendances: AttendanceData[]) => {
  if (!team.positions || team.positions.length === 0) return [];

  const positions = team.positions.map(position => {
    const { included, excluded } = attendances.reduce(
      (total, { includeMealCost }) => {
        if (includeMealCost) {
          return {
            included: total.included + position.standardPay + team.mealCost,
            excluded: total.excluded,
          };
        } else {
          return {
            included: total.included,
            excluded: total.excluded + position.standardPay,
          };
        }
      },
      { included: 0, excluded: 0 },
    );

    return {
      ...position,
      count: {
        includeMeal: 0,
        excludeMeal: 0,
        total: 0,
      },
      sum: {
        includeMealCost: included,
        mealExcluded: excluded,
      },
    };
  });

  attendances.forEach(attendance => {
    const { positionId, includeMealCost } = attendance;
    const position = positions.find(position => position.id === positionId);

    if (position) {
      position.count.includeMeal += includeMealCost ? 1 : 0;
      position.count.excludeMeal += includeMealCost ? 0 : 1;
      position.count.total += 1;
    }
  });

  return positions;
};
