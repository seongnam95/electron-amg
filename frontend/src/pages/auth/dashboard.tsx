import { useState } from 'react';

import { Flex } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import Card from '~/components/common/Card';
import AttendanceCard from '~/components/dashboard/AttendanceCard';
import MonthAttendance from '~/components/dashboard/MonthAttendance';
import MonthPayrollCard from '~/components/dashboard/MonthPayrollCard';
import { DashboardPageStyled } from '~/styles/pageStyled/dashboardPageStyled';

const DashboardPage = () => {
  const [] = useState<Dayjs>(dayjs());

  return (
    <DashboardPageStyled>
      <MonthPayrollCard />
      <Card title="월별 출근 합계" style={{ flex: 1, height: '36rem' }}>
        <MonthAttendance />
      </Card>
      <Flex gap="2rem">
        <AttendanceCard />
      </Flex>
    </DashboardPageStyled>
  );
};

export default DashboardPage;
