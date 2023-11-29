import { Empty } from 'antd';

import { NotFoundPageStyled } from '~/styles/pageStyled/404PageStyled';

const NotFoundPage = () => {
  return (
    <NotFoundPageStyled>
      <Empty description="페이지를 찾을 수 없습니다 :(" />
    </NotFoundPageStyled>
  );
};

export default NotFoundPage;
