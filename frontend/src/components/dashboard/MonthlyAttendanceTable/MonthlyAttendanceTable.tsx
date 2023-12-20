import { Table, TableProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
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

/** 월별 출근 통계 테이블 */
const MonthlyAttendanceTable = ({ attendances }: MonthlyAttendanceTableProps) => {
  const team = useRecoilValue(teamStore);

  const reports: ReportData<PositionData>[] = team.positions.map(position => {
    const filteredAttendances = attendances.filter(
      attendance => attendance.positionId === position.id,
    );
    const stats = getAttendanceStats(team, position.standardPay, filteredAttendances);
    return { ...stats, target: position };
  });

  const tableProps: TableProps<ReportData<PositionData>> = {
    columns: getColumns(),
    dataSource: reports.map(report => {
      return { key: report.target.id, ...report };
    }),
  };

  return (
    <MonthlyAttendanceTableStyled className="MonthAttendanceTable">
      <Table pagination={false} {...tableProps} />
    </MonthlyAttendanceTableStyled>
  );
};

export default MonthlyAttendanceTable;
