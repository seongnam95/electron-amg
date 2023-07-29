import LayoutConfig from '~/components/layouts/LayoutConfig';
import { IndexPageStyled } from '~/styles/pageStyled/indexPageStyled';

const Index = () => {
  return (
    <IndexPageStyled>
      <LayoutConfig breadcrumbs={['직원관리', '계약서']} />
      메인페이지입니다.
    </IndexPageStyled>
  );
};

export default Index;
