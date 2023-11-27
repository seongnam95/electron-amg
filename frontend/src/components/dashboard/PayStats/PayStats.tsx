import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { Flex, Descriptions } from 'antd';
import 'chart.js/auto';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';
import { AttendanceData } from '~/types/attendance';
import { generateDays } from '~/utils/commuteRange';

import { PayStatsStyled } from './styled';

export interface PayStatsProps {}
interface PaySumByDay {
  day: number;
  paySum: number;
  prePaySum: number;
}
const PayStats = ({}: PayStatsProps) => {
  const team = useRecoilValue(teamStore);
  const [date, setDate] = useState<Dayjs>(dayjs());

  const { attendances } = useAttendanceQuery({
    teamId: team.id,
    date: date ? date.format('YY-MM') : dayjs().format('YY-MM'),
    enabled: team.id !== '',
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
    <PayStatsStyled className="PayStats">
      <Flex style={{ height: '16rem' }}>
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: { display: false },
              },
              y: {
                beginAtZero: true,
                grid: { display: false },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </Flex>
      <Flex gap={8} justify="center">
        <Flex className="description-wrap">
          <p className="description-title">일당 합계</p>
          <p className="description-label">{paySum.toLocaleString()}원</p>
        </Flex>
        <Flex className="description-wrap">
          <p className="description-title">선지급</p>
          <p className="description-label">{prePaySum.toLocaleString()}원</p>
        </Flex>
        <Flex className="description-wrap">
          <p className="description-title">소득세 (3.3%)</p>
          <p className="description-label">{taxSum.toLocaleString()}원</p>
        </Flex>
        <Flex className="description-wrap">
          <p className="description-title">총 지급액</p>
          <p className="description-label">{pay.toLocaleString()}원</p>
        </Flex>
      </Flex>
    </PayStatsStyled>
  );
};

export default PayStats;
