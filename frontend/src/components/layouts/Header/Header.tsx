import { HTMLAttributes } from 'react';

import { HeaderStyled } from './styled';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

const Header = ({ children, ...props }: HeaderProps) => {
  return (
    <HeaderStyled className="Header" {...props}>
      {children}
    </HeaderStyled>
  );
};

export default Header;
