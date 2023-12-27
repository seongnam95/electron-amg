import { Table, TableProps } from 'antd';
import { useRecoilValue } from 'recoil';

import { teamStore } from '~/stores/team';
import { AttendanceData } from '~/types/attendance';
import { PositionData } from '~/types/position';
import { ReportData } from '~/types/statistics';
import { getAttendanceStats } from '~/utils/statistics/report';

import { getColumns } from './config';
import { MonthlyAttendanceTableStyled } from './styled';

export interface MonthlyAttendanceTableProps {
  attendances: AttendanceData[];
}

// TODO : 월급 받는 포지션은 별도로 처리해야함. (급여 합계 부분)
/** 월별 출근 통계 테이블 */
const MonthlyAttendanceTable = ({ attendances }: MonthlyAttendanceTableProps) => {
  const team = useRecoilValue(teamStore);

  const reports: ReportData<PositionData>[] = team.positions.map(position => {
    const filteredAttendances = attendances.filter(
      attendance => attendance.positionId === position.id,
    );
    const stats = getAttendanceStats(team, filteredAttendances);
    return { ...stats, target: position };
  });

  const tableProps: TableProps<ReportData<PositionData>> = {
    pagination: false,
    columns: getColumns(),
    dataSource: reports.map(report => {
      return { key: report.target.id, ...report };
    }),
  };

  return (
    <MonthlyAttendanceTableStyled className="MonthAttendanceTable">
      <Table {...tableProps} />
    </MonthlyAttendanceTableStyled>
  );
};

export default MonthlyAttendanceTable;
