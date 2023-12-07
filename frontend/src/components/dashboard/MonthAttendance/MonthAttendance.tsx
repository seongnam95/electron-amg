import { Flex } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';

import { transformAttendanceData } from '../AttendanceDoughnut/util';
import { MonthAttendanceStyled } from './styled';

export interface MonthAttendanceProps {
  date?: Dayjs;
}

// 월 출근 통계
const MonthAttendance = ({ date = dayjs() }: MonthAttendanceProps) => {
  const team = useRecoilValue(teamStore);

  const { attendances, isEmpty } = useAttendanceQuery({
    teamId: team.id,
    date: date.format('YY-MM'),
    enabled: team.existTeam,
  });

  const positions = transformAttendanceData(team, attendances);

  return (
    <MonthAttendanceStyled className="MonthAttendance">
      <table>
        <thead>
          <tr>
            <th rowSpan={2} align="left">
              직위
            </th>
            <th colSpan={4} align="center">
              식대
            </th>
            <th rowSpan={2} align="right">
              총 출근일
            </th>
            <th rowSpan={2} align="right">
              총 합계액
            </th>
          </tr>
          <tr>
            <th align="right">포함</th>
            <th align="right">합계</th>
            <th align="right">미포함</th>
            <th align="right">합계</th>
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
                  {includeMealCost.count}
                  <span className="hint-text">일</span>
                </td>
                <td align="right">
                  {includeMealCost.sumPay.toLocaleString()}
                  <span className="hint-text">원</span>
                </td>
                <td align="right">
                  {mealExcluded.count}
                  <span className="hint-text">일</span>
                </td>
                <td align="right">
                  {mealExcluded.sumPay.toLocaleString()}
                  <span className="hint-text">원</span>
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
      </table>
    </MonthAttendanceStyled>
  );
};

export default MonthAttendance;
