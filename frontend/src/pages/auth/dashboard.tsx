import Card from '~/components/common/Card';
import AttendanceStatus from '~/components/dashboard/AttendanceStatus';
import PayStats from '~/components/dashboard/PayStats';
import { DashboardPageStyled } from '~/styles/pageStyled/dashboardPageStyled';

const Dashboard = () => {
  return (
    <DashboardPageStyled>
      <Card icon="💶" title="통계" width="80rem" maxWidth="90rem" height="36rem">
        <PayStats />
      </Card>
      <Card icon="🙋🏻" title="일일 출근 현황" width="24rem" height="32rem">
        <AttendanceStatus />
      </Card>
    </DashboardPageStyled>
  );
};

export default Dashboard;
