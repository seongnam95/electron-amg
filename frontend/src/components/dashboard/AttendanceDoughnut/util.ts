import { AttendanceData } from '~/types/attendance';
import { PositionData } from '~/types/position';
import { TeamData } from '~/types/team';

export interface MappingAttendanceData {
  position: PositionData;
  mealCostCount: number;
  prepaidCount: number;
  otCount: number;
  attendanceCount: number;

  dailyPay: number;
  mealCost: number;
  otPay: number;
  prepay: number;
  taxAmount: number;
  totalPaySum: number;
  finalPay: number;
}

export const mappingAttendances = (
  team: TeamData,
  attendances: AttendanceData[],
): MappingAttendanceData[] => {
  const { positions } = team;

  return positions.map(position => {
    const positionAttendances = attendances.filter(
      attendance => attendance.positionId === position.id,
    );

    const attendanceCount = positionAttendances.length;

    // includeMealCost가 True인 데이터의 수
    const mealCostCount = positionAttendances.filter(
      attendance => attendance.includeMealCost,
    ).length;

    // OT 총 합계
    const otCount = positionAttendances
      .map(attendance => attendance.otCount)
      .reduce((total, value) => (total += value), 0);

    // isPaid True인 데이터의 수
    const paidCount = positionAttendances.filter(attendance => attendance.isPaid).length;

    // 합계액
    const dailyPaySum = attendanceCount * position.standardPay;
    const mealCostSum = mealCostCount * team.mealCost;
    const otPaySum = otCount * team.otPay;
    const prepaySum = paidCount * position.standardPay;

    // 일일 수당 합계액 + 식대 합계액 + OT 합계액 - 선지급액
    const totalPaySum = dailyPaySum + mealCostSum + otPaySum - prepaySum;
    const taxSum = totalPaySum * 0.033;
    const finalPay = totalPaySum - taxSum;

    return {
      position: position,

      attendanceCount: attendanceCount,
      mealCostCount: mealCostCount,
      otCount: otCount,
      prepaidCount: paidCount,

      dailyPay: dailyPaySum,
      mealCost: mealCostSum,
      otPay: otPaySum,
      prepay: prepaySum,

      totalPaySum: totalPaySum,
      taxAmount: taxSum,
      finalPay: finalPay,
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
