import { ForwardedRef } from 'react';

import { App as AntApp } from 'antd';
import { ConfigOptions } from 'antd/es/message/interface';
import clsx from 'clsx';

import Content from '../Content';
import SideNavbar from '../SideNavbar';
import { LayoutStyled } from './styled';

export interface LayoutProps {
  className?: string;
  children: React.ReactNode;
  layoutRef?: ForwardedRef<HTMLDivElement>;
}

const Layout = ({ className, children, layoutRef }: LayoutProps) => {
  return (
    <LayoutStyled ref={layoutRef} id="layout" className={clsx('Layout', className)}>
      <SideNavbar />
      <Content>{children}</Content>
    </LayoutStyled>
  );
};

export default Layout;
