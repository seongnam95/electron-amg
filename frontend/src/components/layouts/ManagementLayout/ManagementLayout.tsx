import { Outlet } from 'react-router-dom';

import { Flex } from 'antd';

import Content from '../Content';
import Header from '../Header';
import SideNavbar from '../SideNavbar';
import { ManagementLayoutStyled } from './styled';

const ManagementLayout = () => {
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
