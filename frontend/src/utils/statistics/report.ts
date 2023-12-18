import { AttendanceData } from '~/types/attendance';
import { PositionData } from '~/types/position';
import { ReportData } from '~/types/statistics';
import { TeamData } from '~/types/team';
import { UnitData } from '~/types/unit';

export const getStats = (team: TeamData, pay: number, attendances: AttendanceData[]) => {
  const { mealCost, otPay } = team;

  // 인센 포함 합계
  const earnsIncentiveCount = attendances.filter(attendance => attendance.earnsIncentive).length;

  // 총 출근일 수
  const attendanceCount = attendances.length;

  // 식대 포함 합계
  const mealCostCount = attendances.filter(attendance => attendance.includeMealCost).length;

  // OT 총 합계
  const otCount = attendances
    .map(attendance => attendance.otCount)
    .reduce((total, value) => (total += value), 0);

  // 선지급일 합계
  const paidCount = attendances.filter(attendance => attendance.isPrepaid).length;

  // 일일 수당 합계 [ 출근일 * 일일 수당 ]
  const dailyPaySum = attendanceCount * pay;

  // 식대 비용 합계 [ 식대 포함일 * 식대 ]
  const mealCostSum = mealCostCount * mealCost;

  // OT 합계 [ OT 시간 * OT 시급 ]
  const otPaySum = otCount * otPay;

  // 선지급 합계 [ 선지급 수 * 일일 수당 ]
  const prepaySum = paidCount * pay;

  // 일일 수당 합계액 + 식대 합계액 + OT 합계액 - 선지급액
  const totalPaySum = dailyPaySum + mealCostSum + otPaySum - prepaySum;
  const taxSum = totalPaySum * 0.033;
  const finalPay = totalPaySum - taxSum;

  return {
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
};

export const calculateReportTotal = (reports: ReportData[]) => {
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
