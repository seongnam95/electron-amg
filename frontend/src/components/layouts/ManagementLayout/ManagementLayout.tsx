import { Outlet } from 'react-router-dom';

import { Flex } from 'antd';

import BreadcrumbConfig from '../BreadcrumbConfig';
import Content from '../Content';
import Header from '../Header';
import SideNavbar from '../SideNavbar';
import { ManagementLayoutStyled } from './styled';

const ManagementLayout = () => {
  return (
    <ManagementLayoutStyled id="layout" className="ManagementLayout">
      <BreadcrumbConfig />
      <SideNavbar />
      <Flex className="container" vertical>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Flex>
    </ManagementLayoutStyled>
  );
};

export default ManagementLayout;
