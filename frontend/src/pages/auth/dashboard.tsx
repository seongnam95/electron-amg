import { useState } from 'react';

import { Flex } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import Card from '~/components/common/Card';
import AttendanceStatus from '~/components/dashboard/AttendanceStatus';
import PayrollStatistics from '~/components/dashboard/PayrollStatistics';
import { DashboardPageStyled } from '~/styles/pageStyled/dashboardPageStyled';

const DashboardPage = () => {
  const [] = useState<Dayjs>(dayjs());

  return (
    <DashboardPageStyled>
      <Card title="💶 월급여 통계">
        <PayrollStatistics />
      </Card>
      <Flex gap="2rem">
        <Card title="🙋🏻 일일 출근 현황" width="24rem">
          <AttendanceStatus />
        </Card>
        <Card title="🙋🏻 일일 출근 현황" width="24rem">
          <AttendanceStatus />
        </Card>
        <Card title="🙋🏻 일일 출근 현황" width="24rem">
          <AttendanceStatus />
        </Card>
      </Flex>
    </DashboardPageStyled>
  );
};

export default DashboardPage;
