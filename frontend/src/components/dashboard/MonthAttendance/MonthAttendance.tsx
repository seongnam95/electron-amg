import { Bar } from 'react-chartjs-2';

import { Flex } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';

import { countAttendanceByPosition } from '../AttendanceDoughnut/util';
import { MonthAttendanceStyled } from './styled';

export interface MonthAttendanceProps {
  date?: Dayjs;
}

const MonthAttendance = ({ date = dayjs() }: MonthAttendanceProps) => {
  const team = useRecoilValue(teamStore);
  const { attendances, isEmpty } = useAttendanceQuery({
    teamId: team.id,
    date: date.format('YY-MM'),
    enabled: team.existTeam,
  });

  const datas = countAttendanceByPosition(team, attendances);

  const chartData = {
    labels: datas.map(data => data.name),
    datasets: [
      {
        data: datas.map(data => data.count),
        backgroundColor: team.positions.map(position => position.color),
        borderWidth: 0,
      },
    ],
  };

  return (
    <MonthAttendanceStyled className="MonthAttendance">
      <table>
        <thead>
          <tr>
            <th rowSpan={2} align="left">
              직위
            </th>
            <th colSpan={2}>식대</th>
            <th rowSpan={2} align="right">
              합계
            </th>
          </tr>
          <tr>
            <th>포함</th>
            <th>미포함</th>
          </tr>
        </thead>
        <tbody>
          {datas.map(data => {
            const {
              count: { includeMeal, excludeMeal, total },
            } = data;
            return (
              <tr key={data.name}>
                <td width={30}>
                  <Flex align="center" gap={6}>
                    <div className="color-box" style={{ background: data.color }} />
                    {data.name}
                  </Flex>
                </td>
                <td align="center">{includeMeal}</td>
                <td align="center"> {excludeMeal}</td>
                <td align="right" className="total-cell">
                  {total}
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
