import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { PositionData } from '~/types/position';
import { ReportData } from '~/types/statistics';
import { TeamData } from '~/types/team';
import { UnitData } from '~/types/unit';
import { calculateReportTotal, getAttendanceStats } from '~/utils/statistics/report';

export interface UnitListData {
  key: string;
  name: string;
  unitPay: number;
  count: number;
  totalPay: number;
}

export const getDataSource = (
  team: TeamData,
  attendances: AttendanceData[],
  employees: EmployeeData[],
): UnitListData[] => {
  const { units, mealCost, otPay } = team;

  // 근로자별 리포트
  const reportsByEmployee: ReportData<EmployeeData>[] = employees.map(employee => {
    const attendancesByEmployee = attendances.filter(
      attendance => attendance.employeeId === employee.id,
    );
    const preset = employee.position.salaryCode === 3 ? employee.position.preset : undefined;
    const report = getAttendanceStats(
      team,
      employee.position.standardPay,
      attendancesByEmployee,
      preset,
    );
    return { ...report, target: employee };
  });

  // 단가별 리포트
  const reportsByUnit: ReportData<UnitData>[] = units.map(unit => {
    const reports = reportsByEmployee.filter(report => report.target.position.unitId === unit.id);
    return { ...calculateReportTotal(reports), target: unit };
  });

  const unitDatas: UnitListData[] = reportsByUnit.map(report => ({
    key: report.target.id,
    name: report.target.name,
    unitPay: report.target.unitPay,
    count: report.attendanceCount,
    totalPay: report.dailyPay,
  }));

  const totalReport: ReportData<UnitData> = calculateReportTotal(reportsByUnit);

  return [
    ...unitDatas,
    {
      key: 'mealCost',
      name: '식대',
      unitPay: mealCost,
      count: totalReport.mealCostCount,
      totalPay: totalReport.mealCost,
    },
    {
      key: 'ot',
      name: 'OT',
      unitPay: otPay,
      count: totalReport.otCount,
      totalPay: totalReport.otPay,
    },
    {
      key: 'total',
      name: '총 합계액',
      unitPay: 0,
      count: 0,
      totalPay: totalReport.dailyPay,
    },
  ];
};
