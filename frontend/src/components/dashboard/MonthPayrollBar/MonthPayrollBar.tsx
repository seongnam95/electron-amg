import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';

import { Empty, Flex } from 'antd';
import 'chart.js/auto';
import { ChartData } from 'chart.js/auto';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import DescriptionsBox from '~/components/common/DescriptionsBox';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';
import { calculateReportTotal, getAttendanceStats } from '~/utils/statistics/report';

import { MonthPayrollBarStyled } from './styled';
import { sumPayByDay } from './utils';

export interface MonthPayrollBarProps {
  day?: Dayjs;
}

const MonthPayrollBar = ({ day = dayjs() }: MonthPayrollBarProps) => {
  const team = useRecoilValue(teamStore);
  const wrapRef = useRef<HTMLDivElement>(null);

  const { attendances, isEmpty } = useAttendanceQuery({
    teamId: team.id,
    day: day,
    dayType: 'month',
    enabled: team.existTeam,
  });

  /** 월 통계 */
  const reportsByPosition = team.positions.map(position => {
    const filteredAttendances = attendances.filter(
      attendance => attendance.positionId === position.id,
    );
    const stats = getAttendanceStats(team, position.standardPay, filteredAttendances);
    return { target: position, ...stats };
  });

  const { dailyPay, prepay, taxAmount, totalPaySum } = calculateReportTotal(reportsByPosition);

  /** 일일 통계 차트 */
  const sumPayDays = sumPayByDay(attendances);

  const positionData = team.positions.map(position => {
    const data = Array.from({ length: day.daysInMonth() }, (_, index) => {
      const filteredAttendances = attendances.filter(
        attendance =>
          attendance.positionId === position.id &&
          index + 1 === parseInt(attendance.workingDate.split('-')[2], 10),
      );
      const { totalPaySum } = getAttendanceStats(team, position.standardPay, filteredAttendances);
      return totalPaySum;
    });

    return {
      name: position.name,
      color: position.color,
      totals: data,
    };
  });

  const dataset = positionData.map(position => ({
    label: position.name,
    data: position.totals,
    backgroundColor: 'rgba(54, 162, 235, 0.6)',
    borderWidth: 0,
  }));

  const chartData: ChartData<'bar'> = {
    labels: sumPayDays.map(day => day.day),
    datasets: dataset,
  };

  return (
    <MonthPayrollBarStyled className="PayStats" ref={wrapRef}>
      <Flex className="bar-wrap">
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: { grid: { display: false }, stacked: true },
              y: {
                beginAtZero: true,
                grid: { display: false },
                ticks: { display: false },
                border: { display: false },
                stacked: true,
              },
            },
            datasets: {
              bar: {
                backgroundColor: 'red',
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                  title: items => {
                    return `${day.format('YY년 MM월')} ${items[0].label}일`;
                  },
                  labelColor: item => {
                    const datasetIndex = item.datasetIndex;
                    const color = positionData[datasetIndex].color;
                    return { backgroundColor: color, borderColor: color };
                  },
                  label: item => {
                    const label = item.dataset.label || '';
                    const value = item.formattedValue || '';
                    return ` ${label} : ${value} 원`;
                  },
                  afterBody: item => {
                    const dayIndex = parseInt(item[0].label, 10) - 1;
                    const totalAmount = sumPayDays[dayIndex].paySum;
                    return `\n📌 일일 합계액: ${totalAmount.toLocaleString()}원`;
                  },
                },
              },
            },
          }}
        />
        {isEmpty && (
          <div className="empty-attendance">
            <Empty description={false} />
          </div>
        )}
      </Flex>
      <Flex gap={8} justify="center">
        <DescriptionsBox
          fullWidth
          justify="center"
          title="일당 합계"
          children={`${dailyPay.toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="소득세 (3.3%)"
          children={`${taxAmount.toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="선지급"
          children={`${prepay.toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="총 지급액"
          children={`${totalPaySum.toLocaleString()}원`}
        />
      </Flex>
    </MonthPayrollBarStyled>
  );
};

export default MonthPayrollBar;
