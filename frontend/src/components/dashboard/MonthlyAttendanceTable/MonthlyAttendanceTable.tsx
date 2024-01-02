import { Table, TableProps } from 'antd';
import { useRecoilValue } from 'recoil';

import { teamStore } from '~/stores/team';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { ReportData } from '~/types/statistics';
import { getAttendanceStats } from '~/utils/statistics/report';

import { getColumns } from './config';
import { MonthlyAttendanceTableStyled } from './styled';

export interface MonthlyAttendanceTableProps {
  employees: EmployeeData[];
  attendances: AttendanceData[];
}

/** 월별 출근 통계 테이블 */
const MonthlyAttendanceTable = ({ employees, attendances }: MonthlyAttendanceTableProps) => {
  const team = useRecoilValue(teamStore);

  const reports = employees.map(employee => {
    return {};
  });

  const report2s: ReportData[] = team.positions.map(position => {
    const filteredAttendances = attendances.filter(
      attendance => attendance.positionId === position.id,
    );
    const stats = getAttendanceStats(team, filteredAttendances);
    return { ...stats, target: position };
  });

  const tableProps: TableProps<ReportData> = {
    columns: getColumns(),
    // dataSource: reports.map(report => {
    //   return { key: report.target.id, ...report };
    // }),
  };

  return (
    <MonthlyAttendanceTableStyled className="MonthAttendanceTable">
      <Table pagination={false} {...tableProps} />
    </MonthlyAttendanceTableStyled>
  );
};

export default MonthlyAttendanceTable;
