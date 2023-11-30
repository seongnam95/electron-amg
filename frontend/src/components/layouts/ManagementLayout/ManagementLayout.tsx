import { Navigate, Outlet } from 'react-router-dom';

import { Flex, Skeleton } from 'antd';
import { useRecoilValue } from 'recoil';

import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { teamStore } from '~/stores/team';
import { userStore } from '~/stores/user';

import Content from '../Content';
import Header from '../Header';
import SideNavbar from '../SideNavbar';
import { ManagementLayoutStyled } from './styled';

const ManagementLayout = () => {
  const { user, isLogin } = useRecoilValue(userStore);
  const { isEmptyTeam, isLoading } = useTeamQuery({ userId: user.id, enabled: isLogin });

  if (isEmptyTeam) return <Navigate to="/init" />;
  else
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
