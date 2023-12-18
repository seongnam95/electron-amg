import { AttendanceData } from '~/types/attendance';
import { PositionData } from '~/types/position';
import { StatisticalReport } from '~/types/statistics';
import { TeamData } from '~/types/team';

/**
 * 직위별 출석 통계
 * @param team - 대상 팀 데이터
 * @param attendances - 대상 Attendance Array 데이터
 * @returns {AttendanceReportData[]} Position 별 출석 통계통계
 */
export const attendanceReportByPosition = (
  team: TeamData,
  attendances: AttendanceData[],
): StatisticalReport<PositionData>[] => {
  const { positions, mealCost, otPay } = team;

  return positions.map(position => {
    const positionAttendances = attendances.filter(
      attendance => attendance.positionId === position.id,
    );

    // 인센 포함 합계
    const earnsIncentiveCount = positionAttendances.filter(
      attendance => attendance.earnsIncentive,
    ).length;

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
    const paidCount = positionAttendances.filter(attendance => attendance.isPrepaid).length;

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
      target: position,

      earnsIncentiveCount: earnsIncentiveCount,
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

export const calculateReportTotal = (reports: StatisticalReport<PositionData>[]) => {
  return reports.reduce(
    (totals, data) => {
      return {
        earnsIncentiveCount: totals.earnsIncentiveCount + data.earnsIncentiveCount,
        mealCostCount: totals.mealCostCount + data.mealCostCount,
        prepaidCount: totals.prepaidCount + data.prepaidCount,
        otCount: totals.otCount + data.otCount,
        attendanceCount: totals.attendanceCount + data.attendanceCount,
        dailyPay: totals.dailyPay + data.dailyPay,
        mealCost: totals.mealCost + data.mealCost,
        otPay: totals.otPay + data.otPay,
        prepay: totals.prepay + data.prepay,
        taxAmount: totals.taxAmount + data.taxAmount,
        totalPaySum: totals.totalPaySum + data.totalPaySum,
        finalPay: totals.finalPay + data.finalPay,
      };
    },
    {
      earnsIncentiveCount: 0,
      mealCostCount: 0,
      prepaidCount: 0,
      otCount: 0,
      attendanceCount: 0,
      dailyPay: 0,
      mealCost: 0,
      otPay: 0,
      prepay: 0,
      taxAmount: 0,
      totalPaySum: 0,
      finalPay: 0,
    },
  );
};
