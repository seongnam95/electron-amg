import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { ReportData } from '~/types/statistics';
import { TeamData } from '~/types/team';

const initStats: ReportData = {
  earnsIncentiveCount: 0,
  mealCostCount: 0,
  prepaidCount: 0,
  otCount: 0,
  attendanceCount: 0,
  paySum: 0,
  mealCostSum: 0,
  otPaySum: 0,
  prepaySum: 0,
  taxAmount: 0,
  totalPaySum: 0,
  finalPay: 0,
};

/**
 * 출근 데이터의 통계를 구합니다.
 * @param team - 팀 데이터 입니다. 식대 비용, OT 시급을 필요로 합니다.
 * @param attendances - 통계할 출근 데이터 입니다.
 * @param preset - preset이 있을 경우 출근일을 preset으로 지정 후 결과 산출
 * @returns {ReportData}
 */
export const getAttendanceStats = (
  team: TeamData,
  attendances: AttendanceData[],
  preset?: number,
): ReportData => {
  if (!team.existTeam || !attendances || attendances.length === 0) return initStats;
  const { mealCost, otPay } = team;

  // 인센 포함 합계
  const earnsIncentiveCount = attendances.filter(attendance => attendance.earnsIncentive).length;

  // 총 출근일 수
  const attendanceCount = preset ? preset : attendances.length;

  // 식대 포함 합계
  const mealCostCount = attendances.filter(attendance => attendance.includeMealCost).length;

  // OT 총 합계
  const otCount = attendances
    .map(attendance => attendance.otCount)
    .reduce((total, value) => (total += value), 0);

  // 선지급일 합계
  const paidCount = attendances.filter(attendance => attendance.isPrepaid).length;

  // 일일 수당 합계 [ 출근일 * 일일 수당 ]
  let dailyPaySum;
  dailyPaySum = attendances.reduce(
    (total, attendance) => total + attendance.position.standardPay,
    0,
  );

  // 식대 비용 합계 [ 식대 포함일 * 식대 ]
  const mealCostSum = mealCostCount * mealCost;

  // OT 합계 [ OT 시간 * OT 시급 ]
  const otPaySum = otCount * otPay;

  // 선지급 합계 [ 선지급 수 * 일일 수당 ]
  const prepaySum = attendances.reduce((total, attendance) => {
    if (attendance.isPrepaid) return total + attendance.position.standardPay;
    return total;
  }, 0);

  // 일일 수당 합계액 + 식대 합계액 + OT 합계액 - 선지급액
  const totalPaySum = dailyPaySum + mealCostSum + otPaySum - prepaySum;
  const taxSum = totalPaySum * 0.033;
  const finalPay = totalPaySum - taxSum;

  return {
    attendanceCount: attendanceCount,
    earnsIncentiveCount: earnsIncentiveCount,
    mealCostCount: mealCostCount,
    otCount: otCount,
    prepaidCount: paidCount,

    paySum: dailyPaySum,
    mealCostSum: mealCostSum,
    otPaySum: otPaySum,
    prepaySum: prepaySum,

    totalPaySum: totalPaySum,
    taxAmount: taxSum,
    finalPay: finalPay,
  };
};

/**
 * 리포트 리스트의 통계를 모두 합산합니다.
 * @param reports 합산할 리포트 데이터 리스트입니다.
 * @returns {ReportData}
 */
export const calculateReportTotal = (reports: ReportData[]): ReportData => {
  return reports.reduce((totals, data) => {
    return {
      target: undefined,
      earnsIncentiveCount: totals.earnsIncentiveCount + data.earnsIncentiveCount,
      mealCostCount: totals.mealCostCount + data.mealCostCount,
      prepaidCount: totals.prepaidCount + data.prepaidCount,
      otCount: totals.otCount + data.otCount,
      attendanceCount: totals.attendanceCount + data.attendanceCount,
      paySum: totals.paySum + data.paySum,
      mealCostSum: totals.mealCostSum + data.mealCostSum,
      otPaySum: totals.otPaySum + data.otPaySum,
      prepaySum: totals.prepaySum + data.prepaySum,
      taxAmount: totals.taxAmount + data.taxAmount,
      totalPaySum: totals.totalPaySum + data.totalPaySum,
      finalPay: totals.finalPay + data.finalPay,
    };
  }, initStats);
};

export const getStatsByEmployee = (
  team: TeamData,
  employees: EmployeeData[],
  attendances: AttendanceData[],
): {
  employee: EmployeeData;
  attendances: AttendanceData[];
  report: ReportData;
}[] => {
  const { otPay, mealCost } = team;

  return employees.map(employee => {
    const isMonthlyPay = employee.salaryCode === 3;

    const filteredAttendances = attendances.filter(
      attendance => attendance.employeeId === employee.id,
    );

    // 인센 포함 합계
    const earnsIncentiveCount = filteredAttendances.filter(
      attendance => attendance.earnsIncentive,
    ).length;

    // 총 출근일 수
    const attendanceCount = filteredAttendances.length;

    // 식대 포함 합계
    const mealCostCount = filteredAttendances.filter(
      attendance => attendance.includeMealCost,
    ).length;

    // OT 총 합계
    const otCount = filteredAttendances
      .map(attendance => attendance.otCount)
      .reduce((total, value) => (total += value), 0);

    // 선지급일 합계
    const paidCount = filteredAttendances.filter(attendance => attendance.isPrepaid).length;

    // 월급일 경우 월급 * preset, 나머지는 attendance의 position.standardPay 합
    const dailyPaySum = isMonthlyPay
      ? employee.position.standardPay * employee.preset
      : filteredAttendances.reduce(
          (total, attendance) => total + attendance.position.standardPay,
          0,
        );

    // 식대 비용 합계 [ 식대 포함일 * 식대 ]
    const mealCostSum = mealCostCount * mealCost;

    // OT 합계 [ OT 시간 * OT 시급 ]
    const otPaySum = otCount * otPay;

    // 선지급 합계 [ 선지급 수 * 일일 수당 ]
    const prepaySum = filteredAttendances.reduce((total, attendance) => {
      if (attendance.isPrepaid) return total + attendance.position.standardPay;
      return total;
    }, 0);

    // 일일 수당 합계액 + 식대 합계액 + OT 합계액 - 선지급액
    const totalPaySum = dailyPaySum + mealCostSum + otPaySum - prepaySum;
    const taxSum = totalPaySum * 0.033;
    const finalPay = totalPaySum - taxSum;

    return {
      employee: employee,
      attendances: filteredAttendances,
      report: {
        attendanceCount: attendanceCount,
        earnsIncentiveCount: earnsIncentiveCount,
        mealCostCount: mealCostCount,
        otCount: otCount,
        prepaidCount: paidCount,

        paySum: dailyPaySum,
        mealCostSum: mealCostSum,
        otPaySum: otPaySum,
        prepaySum: prepaySum,

        totalPaySum: totalPaySum,
        taxAmount: taxSum,
        finalPay: finalPay,
      },
    };
  });
};

export const getStatsByAttendance = (team: TeamData, attendances: AttendanceData[]) => {};
