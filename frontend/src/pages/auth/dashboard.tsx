import { useState } from 'react';

import { Flex } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import Card from '~/components/common/Card';
import AttendanceCard from '~/components/dashboard/AttendanceCard';
import MonthAttendance from '~/components/dashboard/MonthAttendance';
import MonthPayrollCard from '~/components/dashboard/MonthPayrollCard';
import UnitTable from '~/components/dashboard/UnitTable';
import { DashboardPageStyled } from '~/styles/pageStyled/dashboardPageStyled';

const DashboardPage = () => {
  return (
    <DashboardPageStyled>
      <Flex gap={20}>
        <MonthPayrollCard />
        <Card title="대행사 청구 단가">
          <UnitTable />
        </Card>
      </Flex>
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
