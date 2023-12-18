import { Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';
import { ReportData } from '~/types/statistics';
import { getStats } from '~/utils/statistics/report';

import { getColumns } from './config';
import { MonthAttendanceTableStyled } from './styled';

export interface MonthAttendanceTableProps {
  day?: Dayjs;
}

/**
 * 직위별 출근 통계 테이블 ( Monthly )
 */
const MonthAttendanceTable = ({ day = dayjs() }: MonthAttendanceTableProps) => {
  const team = useRecoilValue(teamStore);

  const { attendances } = useAttendanceQuery({
    teamId: team.id,
    day: day,
    dayType: 'month',
    enabled: team.existTeam,
  });

  const reportsByPosition = team.positions.map(position => {
    const filteredAttendances = attendances.filter(
      attendance => attendance.positionId === position.id,
    );
    const stats = getStats(team, position.standardPay, filteredAttendances);
    return { target: position, ...stats };
  });

  const columns = getColumns();
  const dataSource: ReportData[] = reportsByPosition.map(report => {
    return { key: report.target.id, ...report };
  });

  return (
    <MonthAttendanceTableStyled className="MonthAttendanceTable">
      <Table pagination={false} columns={columns} dataSource={dataSource} />
    </MonthAttendanceTableStyled>
  );
};

export default MonthAttendanceTable;
