import clsx from 'clsx';

import Content from '../Content';
import Menu from '../Menu/Menu';
import { LayoutStyled } from './styled';

export interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

const Layout = ({ className, children }: LayoutProps) => {
  return (
    <LayoutStyled className={clsx('Layout', className)}>
      <Menu />
      <Content>{children}</Content>
    </LayoutStyled>
  );
};

export default Layout;
