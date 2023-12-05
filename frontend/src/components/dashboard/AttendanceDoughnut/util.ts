import { AttendanceData } from '~/types/attendance';
import { PositionData } from '~/types/position';
import { TeamData } from '~/types/team';

interface Position {
  position: PositionData;
  mealIncluded: {
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
}
export const transformAttendanceData = (team: TeamData, attendances: AttendanceData[]) => {
  const { positions, mealCost } = team;
  if (!positions) return;
  return positions.map(position => {
    const targetAttendance = attendances.filter(
      attendance => attendance.positionId === position.id,
    );

    const stats = targetAttendance.reduce(
      (acc, attendance) => {
        if (attendance.mealIncluded) {
          acc.mealIncluded.count += 1;
          acc.mealIncluded.sumPay += attendance.pay + mealCost;
          acc.total.count += 1;
          acc.total.sumPay += attendance.pay + mealCost;
        } else {
          acc.mealExcluded.count += 1;
          acc.mealExcluded.sumPay += attendance.pay;
          acc.total.count += 1;
          acc.total.sumPay += attendance.pay;
        }
        return acc;
      },
      {
        mealIncluded: { count: 0, sumPay: 0 },
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
  const positions = team.positions.map(position => {
    const { included, excluded } = attendances.reduce(
      (total, { pay, mealIncluded }) => {
        if (mealIncluded) {
          return {
            included: total.included + pay + team.mealCost,
            excluded: total.excluded,
          };
        } else {
          return {
            included: total.included,
            excluded: total.excluded + pay,
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
        mealIncluded: included,
        mealExcluded: excluded,
      },
    };
  });

  attendances.forEach(attendance => {
    const { positionId, mealIncluded } = attendance;
    const position = positions.find(position => position.id === positionId);

    if (position) {
      position.count.includeMeal += mealIncluded ? 1 : 0;
      position.count.excludeMeal += mealIncluded ? 0 : 1;
      position.count.total += 1;
    }
  });

  return positions;
};
