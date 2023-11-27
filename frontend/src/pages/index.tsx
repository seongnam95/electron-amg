import { Flex } from 'antd';

import Card from '~/components/common/Card';
import AttendanceStatus from '~/components/dashboard/AttendanceStatus';
import { IndexPageStyled } from '~/styles/pageStyled/indexPageStyled';

const Index = () => {
  return (
    <IndexPageStyled>
      <Flex>
        <Card title="🙋🏻 일일 출근 현황" width={240} extra={<a href="#">More</a>}>
          <AttendanceStatus />
        </Card>
      </Flex>
    </IndexPageStyled>
  );
};

export default Index;
