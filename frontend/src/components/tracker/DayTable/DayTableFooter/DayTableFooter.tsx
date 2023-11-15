import { Flex, Progress, Statistic } from 'antd';

import { AttendanceData, EmployeeAttendanceData } from '~/types/attendance';

import { TableDataType } from '../tableConfig';
import { DayTableFooterStyled } from './styled';

export interface DayTableFooterProps {
  employees: EmployeeAttendanceData[];
}

const DayTableFooter = ({ employees }: DayTableFooterProps) => {
  console.log(employees);
  const { incentive, deduct, total } = getFinancialSummary(employees);
  const { attendance, absence, percent } = getAttendanceCount(employees);
  const isLoading = !employees;

  return (
    <DayTableFooterStyled>
      <Statistic
        title="식대"
        value={incentive}
        loading={isLoading}
        valueStyle={{ color: '#2DD329', fontSize: 20 }}
      />
      <Statistic
        title="인센티브"
        value={incentive}
        loading={isLoading}
        valueStyle={{ color: '#2DD329', fontSize: 20 }}
      />
      <Statistic
        title="공제"
        value={deduct}
        loading={isLoading}
        valueStyle={{ color: '#EA3B3B', fontSize: 20 }}
      />
      <Statistic
        title="총액"
        value={total}
        loading={isLoading}
        valueStyle={{ color: '#5855F5', fontWeight: 'bold', fontSize: 20 }}
      />
    </DayTableFooterStyled>
  );
};

// 총 인원, 출근 인원, 출근율
const getAttendanceCount = (
  employees: EmployeeAttendanceData[],
): {
  attendance: number;
  absence: number;
  percent: number;
} => {
  console.log(employees);
  const attendances = employees.filter(employee => employee.attendances !== undefined);
  console.log(attendances);

  const attendance = employees.length;
  const absence = employees.filter(data => attendanceId).length;
  const percent = (absence / attendance) * 100;

  return {
    attendance: attendance,
    absence: absence,
    percent: percent,
  };
};

// 인센티브, 공제, 토탈액
const getFinancialSummary = (
  dataSource: EmployeeAttendanceData[],
): {
  incentive: number;
  deduct: number;
  total: number;
} => {
  const sum = (numbers: number[]) => {
    return numbers.reduce((total, value) => (total += value), 0);
  };

  return {
    incentive: sum(dataSource.map(data => data.incentive || 0)),
    deduct: sum(dataSource.map(data => data.deduct || 0)),
    total: sum(dataSource.map(data => data.total || 0)),
  };
};

export default DayTableFooter;
