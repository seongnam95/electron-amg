import { ForwardedRef } from 'react';
import { useLocation } from 'react-router-dom';

import { Drawer, Flex } from 'antd';
import clsx from 'clsx';

import Content from '../Content';
import Header from '../Header';
import SideNavbar from '../SideNavbar';
import { LayoutStyled } from './styled';

export interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

const Layout = ({ className, children }: LayoutProps) => {
  return (
    <LayoutStyled id="layout" className={clsx('Layout', className)}>
      <SideNavbar />
      <Flex vertical>
        <Header />
        <Content>{children}</Content>
      </Flex>
      {/* <Drawer getContainer={false} open /> */}
    </LayoutStyled>
  );
};

export default Layout;
