import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import Button from '~/components/common/Button';
import { useLogout } from '~/hooks/useLogout';
import { layoutStore } from '~/stores/layout';

import { HeaderStyled } from './styled';

export interface HeaderProps {
  className?: string;
  children?: ReactNode;
}

const Header = ({ className, children }: HeaderProps) => {
  const logout = useLogout();
  const { pathname } = useLocation();
  const { breadcrumbs } = useRecoilValue(layoutStore);

  return (
    <HeaderStyled className={clsx('Header', className)}>
      <div className="breadcrumb">
        <i className="bx bx-hash" />

        <motion.span
          key={pathname}
          initial={{ opacity: 0, x: 3 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {breadcrumbs.map((text, i) => (
            <span key={text + i}>{text}</span>
          ))}
        </motion.span>
      </div>
      {children}
      <Button onClick={logout} $variations="icon">
        <i className="bx bx-log-out" />
      </Button>
    </HeaderStyled>
  );
};

export default Header;
