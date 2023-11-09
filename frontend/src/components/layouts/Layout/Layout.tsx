import clsx from 'clsx';

import Content from '../Content';
import SideNavbar from '../SideNavbar';
import { LayoutStyled } from './styled';

export interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

const Layout = ({ className, children }: LayoutProps) => {
  return (
    <LayoutStyled id="layout-wrap" className={clsx('Layout', className)}>
      <SideNavbar />
      <Content>{children}</Content>
    </LayoutStyled>
  );
};

export default Layout;
