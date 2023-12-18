import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { StatisticalReport } from '~/types/statistics';
import { TeamData } from '~/types/team';

/**
 * 직위별 출석 통계
 * @param team - 대상 팀 데이터
 * @param attendances - 대상 Attendance Array 데이터
 * @returns {StatisticalReport<EmployeeData>[]} Employee 별 출석 통계통계
 */
export const attendanceReportByEmployee = (
  team: TeamData,
  employees: EmployeeData[],
  attendances: AttendanceData[],
): StatisticalReport<EmployeeData>[] => {
  const { mealCost, otPay } = team;

  return employees.map(employee => {
    const { position } = employee;

    const employeeAttendances = attendances.filter(
      attendance => attendance.employeeId === employee.id,
    );

    // 인센 포함 합계
    const earnsIncentiveCount = employeeAttendances.filter(
      attendance => attendance.earnsIncentive,
    ).length;

    // 총 출근일 수
    const attendanceCount = employeeAttendances.length;

    // 식대 포함 합계
    const mealCostCount = employeeAttendances.filter(
      attendance => attendance.includeMealCost,
    ).length;

    // OT 총 합계
    const otCount = employeeAttendances
      .map(attendance => attendance.otCount)
      .reduce((total, value) => (total += value), 0);

    // 선지급일 합계
    const paidCount = employeeAttendances.filter(attendance => attendance.isPrepaid).length;

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
      target: employee,

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
