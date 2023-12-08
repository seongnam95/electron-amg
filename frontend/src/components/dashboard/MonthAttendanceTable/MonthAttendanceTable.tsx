import { Flex, Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';

import { mappingAttendances, transformAttendanceData } from '../AttendanceDoughnut/util';
import { MonthAttendanceTableData, getColumns } from './config';
import { MonthAttendanceTableStyled } from './styled';

export interface MonthAttendanceTableProps {
  date?: Dayjs;
}

// 월 출근 통계
const MonthAttendanceTable = ({ date = dayjs() }: MonthAttendanceTableProps) => {
  const team = useRecoilValue(teamStore);

  const { attendances, isEmpty } = useAttendanceQuery({
    teamId: team.id,
    date: date.format('YY-MM'),
    enabled: team.existTeam,
  });

  const positionAttendance = mappingAttendances(team, attendances);
  const columns = getColumns();
  console.log(positionAttendance);

  const dataSource: MonthAttendanceTableData[] = positionAttendance.map(value => {
    return {
      key: value.position.id,
      team: team,
      ...value,
    };
  });

  return (
    <MonthAttendanceTableStyled className="MonthAttendanceTable">
      <Table pagination={false} columns={columns} dataSource={dataSource} />

      {/* <table>
        <thead>
          <tr>
            <th align="left">직위</th>
            <th align="right">일일 수당</th>
            <th align="right">식대</th>
            <th align="right">OT</th>
            <th align="right">선지급</th>
            <th align="right">총 출근일</th>
            <th align="right">총 합계액</th>
          </tr>
        </thead>
        <tbody>
          {positions?.map(data => {
            const {
              position,
              stats: { includeMealCost, mealExcluded, total },
            } = data;

            return (
              <tr key={position.name}>
                <td width={30}>
                  <Flex align="center" gap={6}>
                    <div className="color-box" style={{ background: position.color }} />
                    {position.name}
                  </Flex>
                </td>
                <td align="right">
                  {position.standardPay.toLocaleString()}
                  <span className="hint-text">원</span>
                </td>
                <td align="right">
                  {includeMealCost.count}
                  <span className="hint-text">개</span>
                </td>
                <td align="right">
                  {total.count}
                  <span className="hint-text">타임</span>
                </td>
                <td align="right">
                  {total.count}
                  <span className="hint-text">일</span>
                </td>
                <td align="right">
                  {total.count}
                  <span className="hint-text">일</span>
                </td>
                <td align="right" className="total-cell">
                  {total.sumPay.toLocaleString()}
                  <span className="hint-text">원</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </MonthAttendanceTableStyled>
  );
};

export default MonthAttendanceTable;
