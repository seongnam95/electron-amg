import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';

import { Empty, Flex, Space } from 'antd';
import 'chart.js/auto';
import { ChartData } from 'chart.js/auto';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import DescriptionsBox from '~/components/common/DescriptionsBox';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';
import { calculateReportTotal, getAttendanceStats } from '~/utils/statistics/report';

import getChartOptions from './chartConfig';
import { MonthlyPayChartStyled } from './styled';

export interface MonthPayrollBarProps {
  day?: Dayjs;
}

/** 월 수당 통계 차트 */
const MonthlyPayChart = ({ day = dayjs() }: MonthPayrollBarProps) => {
  const team = useRecoilValue(teamStore);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dates = Array.from({ length: day.daysInMonth() }, (_, index) => index + 1);

  const { attendances, isEmpty } = useAttendanceQuery({
    teamId: team.id,
    day: day,
    dayType: 'month',
    enabled: team.existTeam,
  });

  /** 월 통계 */
  const reports = team.positions.map(position => {
    const filteredAttendances = attendances.filter(
      attendance => attendance.positionId === position.id,
    );
    const stats = getAttendanceStats(team, position.standardPay, filteredAttendances);
    return { ...stats, target: position };
  });

  const { dailyPay, attendanceCount } = calculateReportTotal(reports);

  /** 일일 통계 차트 */
  const statsData = team.positions.map(position => {
    const dates = Array.from({ length: day.daysInMonth() }, (_, index) => {
      const filteredAttendances = attendances.filter(
        attendance =>
          attendance.positionId === position.id &&
          index + 1 === parseInt(attendance.workingDate.split('-')[2], 10),
      );
      const { attendanceCount, totalPaySum } = getAttendanceStats(
        team,
        position.standardPay,
        filteredAttendances,
      );
      return { attendanceCount, totalPaySum };
    });

    return {
      positionName: position.name,
      positionColor: position.color,
      attendanceCounts: dates.map(date => date.attendanceCount),
      dailyPaySums: dates.map(date => date.totalPaySum),
    };
  });

  const dataset = statsData.map(stats => ({
    label: stats.positionName,
    data: stats.dailyPaySums,
    backgroundColor: 'rgba(54, 162, 235, 0.6)',
    borderWidth: 0,
  }));

  const chartData: ChartData<'bar'> = {
    labels: dates,
    datasets: dataset,
  };

  const getAverage = (total: number, length: number) => {
    return Math.round(total / length);
  };

  const chartOptions = getChartOptions(day, statsData);
  return (
    <MonthlyPayChartStyled className="PayStats" ref={wrapRef}>
      <Flex className="bar-wrap">
        <Bar data={chartData} options={chartOptions} />
        {isEmpty && (
          <div className="empty-attendance">
            <Empty description={false} />
          </div>
        )}
      </Flex>
      <Flex gap={8} justify="center">
        <DescriptionsBox
          justify="end"
          title="평균 수당"
          info="ddd"
          children={`${getAverage(dailyPay, dates.length).toLocaleString()}원`}
        />
        <DescriptionsBox
          justify="end"
          title="평균 출근 인원"
          info="ddd"
          children={`${getAverage(attendanceCount, dates.length).toLocaleString()}명`}
        />
      </Flex>
    </MonthlyPayChartStyled>
  );
};

export default MonthlyPayChart;
