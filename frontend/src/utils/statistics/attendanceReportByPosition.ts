import { AttendanceData } from '~/types/attendance';
import { PositionData } from '~/types/position';
import { TeamData } from '~/types/team';

export interface AttendanceReportData {
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

/**
 * 직위별 출석 통계
 * @param team
 * @param attendances
 * @returns MappingAttendanceData[]
 */
export const attendanceReportByPosition = (
  team: TeamData,
  attendances: AttendanceData[],
): AttendanceReportData[] => {
  const { positions, mealCost, otPay } = team;

  return positions.map(position => {
    const positionAttendances = attendances.filter(
      attendance => attendance.positionId === position.id,
    );

    // 총 출근일 수
    const attendanceCount = positionAttendances.length;

    // 식대 포함 합계
    const mealCostCount = positionAttendances.filter(
      attendance => attendance.includeMealCost,
    ).length;

    // OT 총 합계
    const otCount = positionAttendances
      .map(attendance => attendance.otCount)
      .reduce((total, value) => (total += value), 0);

    // 선지급일 합계
    const paidCount = positionAttendances.filter(attendance => attendance.isPaid).length;

    // ------------------------------

    // 일일 수당 합계 [ 출근일 * 일일 수당 ]
    const dailyPaySum = attendanceCount * position.standardPay;

    // 식대 비용 합계 [ 식대 포함일 * 식대 ]
    const mealCostSum = mealCostCount * mealCost;

    // OT 합계 [ OT 시간 * OT 시급 ]
    const otPaySum = otCount * otPay;

    // 선지급 합계 [ 선지급 수 * 일일 수당 ]
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
