import { AttendanceData } from '~/types/attendance';
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

export const getDataSource = (team: TeamData, attendances: AttendanceData[]): UnitListData[] => {
  const { units, mealCost, otPay } = team;

  const reports: ReportData<UnitData>[] = units.map(unit => {
    const attendancesByUnit = attendances.filter(
      attendance => attendance.position.unitId === unit.id,
    );
    const report = getAttendanceStats(team, unit.unitPay, attendancesByUnit);
    return { ...report, target: unit };
  });

  const unitDatas: UnitListData[] = reports.map(report => ({
    key: report.target.id,
    name: report.target.name,
    unitPay: report.target.unitPay,
    count: report.attendanceCount,
    totalPay: report.dailyPay,
  }));

  const totalReport: ReportData<UnitData> = calculateReportTotal(reports);

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
