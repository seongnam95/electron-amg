import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';

import { Empty, Flex } from 'antd';
import 'chart.js/auto';
import { ChartData } from 'chart.js/auto';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import DescriptionsBox from '~/components/common/DescriptionsBox';
import { teamStore } from '~/stores/team';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';
import { calculateReportTotal, getAttendanceStats } from '~/utils/statistics/report';

import getChartOptions from './chartConfig';
import { MonthlyPayChartStyled } from './styled';

export interface MonthPayrollBarProps {
  employees: EmployeeData[];
  attendances: AttendanceData[];
  day?: Dayjs;
}

/** 월 수당 통계 차트 */
const MonthlyPayChart = ({ day = dayjs(), employees, attendances }: MonthPayrollBarProps) => {
  const team = useRecoilValue(teamStore);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dates = Array.from({ length: day.daysInMonth() }, (_, index) => index + 1);
  const isEmpty = attendances === undefined || attendances.length === 0;

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

      const { attendanceCount } = getAttendanceStats(
        team,
        position.standardPay,
        filteredAttendances,
      );

      return { attendanceCount };
    });

    return {
      positionName: position.name,
      positionColor: position.color,
      attendanceCounts: dates.map(date => date.attendanceCount),
    };
  });

  /** Chart Bar Props */
  const dataset = statsData.map(stats => ({
    label: stats.positionName,
    data: stats.attendanceCounts,
    backgroundColor: 'rgba(54, 162, 235, 0.6)',
    borderWidth: 0,
  }));

  const chartData: ChartData<'bar'> = {
    labels: dates,
    datasets: dataset,
  };

  // ! 평균 데이터 수정해야함
  const attendanceAverage = employees.length;
  console.log(attendanceAverage);

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
          justify="center"
          title="평균 출근율"
          info="일일 수당 합계 평균"
          children={`${Math.round(dailyPay / dates.length).toLocaleString()}원`}
        />
        <DescriptionsBox
          justify="center"
          title="평균 출근 인원"
          info="일일 출근 인원 평균"
          children={`${Math.round(attendanceCount / dates.length).toLocaleString()}명`}
        />
      </Flex>
    </MonthlyPayChartStyled>
  );
};

export default MonthlyPayChart;
