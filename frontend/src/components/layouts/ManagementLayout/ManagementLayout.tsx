import { Navigate, Outlet } from 'react-router-dom';

import { Flex } from 'antd';
import { useRecoilValue } from 'recoil';

import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { userStore } from '~/stores/user';

import Content from '../Content';
import Header from '../Header';
import SideNavbar from '../SideNavbar';
import { ManagementLayoutStyled } from './styled';

const ManagementLayout = () => {
  const { user } = useRecoilValue(userStore);
  const { isEmptyTeam } = useTeamQuery({ userId: user.id });

  if (isEmptyTeam) return <Navigate to="/init" />;
  return (
    <ManagementLayoutStyled id="layout" className="ManagementLayout">
      <SideNavbar />
      <Flex vertical>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Flex>
    </ManagementLayoutStyled>
  );
};

export default ManagementLayout;
