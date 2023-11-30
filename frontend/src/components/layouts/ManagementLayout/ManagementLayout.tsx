import { Navigate, Outlet } from 'react-router-dom';

import { Flex } from 'antd';
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
  const team = useRecoilValue(teamStore);
  const { isEmptyTeam } = useTeamQuery({ userId: user.id, enabled: isLogin });
  console.log('team', team);
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
