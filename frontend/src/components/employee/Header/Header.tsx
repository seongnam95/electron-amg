import { ReactNode } from 'react';

import clsx from 'clsx';

import { HeaderStyled } from './styled';

export interface HeaderProps {
  className?: string;
  children?: ReactNode;
}

const Header = ({ className, children }: HeaderProps) => {
  return <HeaderStyled className={clsx('Header', className)}>{children}</HeaderStyled>;
};

export default Header;
