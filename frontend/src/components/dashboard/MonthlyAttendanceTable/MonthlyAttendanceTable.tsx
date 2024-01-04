import { Table, TableProps } from 'antd';
import { useRecoilValue } from 'recoil';

import { teamStore } from '~/stores/team';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { ReportData } from '~/types/statistics';
import { getAttendanceStats, getReportByPositions } from '~/utils/statistics/report';

import { getColumns } from './config';
import { MonthlyAttendanceTableStyled } from './styled';

export interface MonthlyAttendanceTableProps {
  employees: EmployeeData[];
  attendances: AttendanceData[];
}

/** 월별 출근 통계 테이블 */
const MonthlyAttendanceTable = ({ employees, attendances }: MonthlyAttendanceTableProps) => {
  const team = useRecoilValue(teamStore);

  const reports = getReportByPositions(team, employees, attendances);

  const tableProps: TableProps<ReportData> = {
    columns: getColumns(),
    dataSource: reports.map(report => {
      return { key: report.target ? report.target.id : '', ...report };
    }),
  };

  return (
    <MonthlyAttendanceTableStyled className="MonthAttendanceTable">
      <Table pagination={false} {...tableProps} />
    </MonthlyAttendanceTableStyled>
  );
};

export default MonthlyAttendanceTable;
