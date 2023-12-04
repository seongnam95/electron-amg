import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { Flex } from 'antd';

import Content from '../Content';
import Header from '../Header';
import SideNavbar from '../SideNavbar';
import { ManagementLayoutStyled } from './styled';

const ManagementLayout = () => {
  const layoutRef = useRef<HTMLDivElement>(null);

  return (
    <ManagementLayoutStyled ref={layoutRef} id="layout" className="ManagementLayout">
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
