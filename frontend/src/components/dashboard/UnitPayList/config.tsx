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

export const getDataSource = (team: TeamData, attendances: AttendanceData[]): UnitListData[] => {
  const { units, mealCost, otPay, positions } = team;

  // 직위별 리포트
  const reportsByPosition: ReportData<PositionData>[] = positions.map(position => {
    const filteredAttendances = attendances.filter(
      attendance => attendance.positionId === position.id,
    );

    const preset = position.salaryCode === 3 ? position.preset : undefined;
    const report = getAttendanceStats(team, filteredAttendances, preset);
    return { ...report, target: position };
  });

  // 단가별 리포트
  const reportsByUnit = units.map(unit => {
    const filteredReports = reportsByPosition.filter(report => report.target.unitId === unit.id);
    const unitCount = filteredReports.reduce((total, report) => total + report.attendanceCount, 0);
    const unitPaySum = unitCount * unit.unitPay;

    return {
      unit: unit,
      unitCount,
      unitPaySum,
    };
  });

  const unitDatas: UnitListData[] = reportsByUnit.map(report => ({
    key: report.unit.id,
    name: report.unit.name,
    unitPay: report.unit.unitPay,
    count: report.unitCount,
    totalPay: report.unitPaySum,
  }));

  const totalReport: ReportData<UnitData> = calculateReportTotal(reportsByPosition);

  return [
    ...unitDatas,
    {
      key: 'mealCost',
      name: '식대',
      unitPay: mealCost,
      count: totalReport.mealCostCount,
      totalPay: totalReport.mealCostSum,
    },
    {
      key: 'ot',
      name: 'OT',
      unitPay: otPay,
      count: totalReport.otCount,
      totalPay: totalReport.otPaySum,
    },
    {
      key: 'total',
      name: '총 합계액',
      unitPay: 0,
      count: 0,
      totalPay: totalReport.paySum,
    },
  ];
};
