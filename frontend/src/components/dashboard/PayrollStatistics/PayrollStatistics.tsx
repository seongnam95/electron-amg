import { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { Empty, Flex } from 'antd';
import 'chart.js/auto';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import DescriptionsBox from '~/components/common/DescriptionsBox';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';
import { AttendanceData } from '~/types/attendance';

import { PayrollStatisticsStyled } from './styled';

interface PaySumByDay {
  day: number;
  paySum: number;
  prePaySum: number;
}

export interface PayrollStatisticsProps {}

const PayrollStatistics = ({}: PayrollStatisticsProps) => {
  const team = useRecoilValue(teamStore);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState<Dayjs>(dayjs());

  const { attendances, isLoading, isEmpty } = useAttendanceQuery({
    teamId: team.id,
    date: date ? date.format('YY-MM') : dayjs().format('YY-MM'),
    enabled: team.existTeam,
  });

  const sumPayByDay = (attendances: AttendanceData[]): PaySumByDay[] => {
    const sumsByDay: { [day: string]: PaySumByDay } = {};

    attendances.forEach(({ workingDate, pay, prePay }) => {
      const day = parseInt(workingDate.split('-')[2], 10); // 'YY-MM-DD' 형식에서 DD 추출
      if (!sumsByDay[day]) {
        sumsByDay[day] = { day, paySum: 0, prePaySum: 0 };
      }
      sumsByDay[day].paySum += pay;
      sumsByDay[day].prePaySum += prePay;
    });

    return Object.values(sumsByDay);
  };

  const sumPayDays = sumPayByDay(attendances);

  const chartData = {
    labels: sumPayDays.map(day => day.day),
    datasets: [
      {
        label: ' 일일 합계액',
        data: sumPayDays.map(day => day.paySum),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderWidth: 0,
      },
    ],
  };

  const paySum = sumPayDays.reduce((total, value) => (total += value.paySum), 0);
  const prePaySum = sumPayDays.reduce((total, value) => (total += value.prePaySum), 0);
  const taxSum = Math.round(paySum * 0.033);
  const pay = paySum - prePaySum - taxSum;

  return (
    <PayrollStatisticsStyled className="PayStats" ref={wrapRef}>
      <Flex className="bar-wrap">
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: { grid: { display: false } },
              y: { beginAtZero: true, grid: { display: false } },
            },
            plugins: { legend: { display: false } },
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
          children={`${paySum.toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="소득세 (3.3%)"
          children={`${prePaySum.toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="일당 합계"
          children={`${taxSum.toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="총 지급액"
          children={`${pay.toLocaleString()}원`}
        />
      </Flex>
    </PayrollStatisticsStyled>
  );
};

export default PayrollStatistics;
