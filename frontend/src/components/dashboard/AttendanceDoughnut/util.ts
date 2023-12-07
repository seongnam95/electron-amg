import { AttendanceData } from '~/types/attendance';
import { PositionData } from '~/types/position';
import { TeamData } from '~/types/team';

interface TransformAttendance {
  position: PositionData;
  stats: {
    includeMealCost: {
      count: number;
      sumPay: number;
    };
    mealExcluded: {
      count: number;
      sumPay: number;
    };
    total: {
      count: number;
      sumPay: number;
    };
  };
}

export const transformAttendanceData = (
  team: TeamData,
  attendances: AttendanceData[],
): TransformAttendance[] => {
  const { positions, mealCost } = team;
  if (!positions || positions.length === 0) return [];

  return positions.map(position => {
    const targetAttendance = attendances.filter(
      attendance => attendance.positionId === position.id,
    );

    const stats = targetAttendance.reduce(
      (acc, attendance) => {
        if (attendance.includeMealCost) {
          acc.includeMealCost.count += 1;
          acc.includeMealCost.sumPay += position.standardPay + mealCost;
          acc.total.count += 1;
          acc.total.sumPay += position.standardPay + mealCost;
        } else {
          acc.mealExcluded.count += 1;
          acc.mealExcluded.sumPay += position.standardPay;
          acc.total.count += 1;
          acc.total.sumPay += position.standardPay;
        }
        return acc;
      },
      {
        includeMealCost: { count: 0, sumPay: 0 },
        mealExcluded: { count: 0, sumPay: 0 },
        total: { count: 0, sumPay: 0 },
      },
    );

    return {
      position: position,
      stats: stats,
    };
  });
};

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
