import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';

import { Empty, Flex } from 'antd';
import 'chart.js/auto';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import DescriptionsBox from '~/components/common/DescriptionsBox';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';
import { attendanceReportByPosition } from '~/utils/statistics/attendanceReportByPosition';

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

  const attendanceReports = attendanceReportByPosition(team, attendances);

  const { dailyPaySum, prePaySum, taxSum, totalPaySum } = attendanceReports.reduce(
    (record, value) => ({
      dailyPaySum: record.dailyPaySum + value.dailyPay,
      prePaySum: record.prePaySum + value.prepay,
      taxSum: record.taxSum + value.taxAmount,
      totalPaySum: record.totalPaySum + value.finalPay,
    }),
    {
      dailyPaySum: 0,
      prePaySum: 0,
      taxSum: 0,
      totalPaySum: 0,
    },
  );

  const sumPayDays = sumPayByDay(attendances);

  const chartData = {
    labels: sumPayDays.map(day => day.day),
    datasets: [
      {
        data: sumPayDays.map(day => day.paySum),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderWidth: 0,
      },
    ],
  };

  return (
    <MonthPayrollBarStyled className="PayStats" ref={wrapRef}>
      <Flex className="bar-wrap">
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: { grid: { display: false } },
              y: {
                beginAtZero: true,
                grid: { display: false },
                ticks: { display: false },
                border: { display: false },
                stacked: true,
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  title: item => `${day.format('YY년 MM월')} ${item[0].label}일`,
                  label: item => ` 일당 합계액: ${item.formattedValue}원`,
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
          children={`${dailyPaySum.toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="소득세 (3.3%)"
          children={`${taxSum.toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="선지급"
          children={`${prePaySum.toLocaleString()}원`}
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
