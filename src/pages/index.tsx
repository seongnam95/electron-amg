import { Link } from 'react-router-dom';

import LayoutConfig from '~/components/layouts/LayoutConfig';
import { IndexPageStyled } from '~/styles/pageStyled/indexPageStyled';

const Index = () => {
  return (
    <IndexPageStyled>
      <LayoutConfig breadcrumbs={['직원관리', '계약서']} />
    </IndexPageStyled>
  );
};

export default Index;
