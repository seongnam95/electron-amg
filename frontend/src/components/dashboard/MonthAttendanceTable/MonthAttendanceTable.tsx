import { Flex, Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';
import { attendanceReportByPosition } from '~/utils/statistics/attendanceReportByPosition';

import { MonthAttendanceTableData, getColumns } from './config';
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

  const attendanceReports = attendanceReportByPosition(team, attendances);

  const columns = getColumns();
  const dataSource: MonthAttendanceTableData[] = attendanceReports.map(report => {
    return {
      key: report.position.id,
      team: team,
      ...report,
    };
  });

  return (
    <MonthAttendanceTableStyled className="MonthAttendanceTable">
      <Table pagination={false} columns={columns} dataSource={dataSource} />
    </MonthAttendanceTableStyled>
  );
};

export default MonthAttendanceTable;
