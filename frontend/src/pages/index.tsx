import Card from '~/components/common/Card';
import AttendanceStatus from '~/components/dashboard/AttendanceStatus';
import PayStats from '~/components/dashboard/PayStats';
import { IndexPageStyled } from '~/styles/pageStyled/indexPageStyled';

const Index = () => {
  return (
    <IndexPageStyled>
      <Card icon="💶" title="통계" width="80rem" maxWidth="90rem" height="36rem">
        <PayStats />
      </Card>
      <Card icon="🙋🏻" title="일일 출근 현황" width="24rem" height="32rem">
        <AttendanceStatus />
      </Card>
    </IndexPageStyled>
  );
};

export default Index;
