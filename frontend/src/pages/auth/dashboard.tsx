import { useState } from 'react';

import { Flex } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import AttendanceCard from '~/components/dashboard/AttendanceCard';
import MonthPayrollCard from '~/components/dashboard/MonthPayrollCard';
import { DashboardPageStyled } from '~/styles/pageStyled/dashboardPageStyled';

const DashboardPage = () => {
  const [] = useState<Dayjs>(dayjs());

  return (
    <DashboardPageStyled>
      <MonthPayrollCard />
      <Flex gap="2rem">
        <AttendanceCard />
      </Flex>
    </DashboardPageStyled>
  );
};

export default DashboardPage;
