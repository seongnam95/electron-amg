import clsx from 'clsx';

import Content from '../Content';
import Header from '../Header';
import Menu from '../Menu';
import { LayoutStyled } from './styled';

export interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

const Layout = ({ className, children }: LayoutProps) => {
  return (
    <LayoutStyled className={clsx('Layout', className)}>
      <Header>
        <Menu />
      </Header>

      <Content>{children}</Content>
    </LayoutStyled>
  );
};

export default Layout;
