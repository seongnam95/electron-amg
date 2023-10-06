import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Tooltip } from 'antd';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { NavBarStyled } from './styled';

export interface NavBarProps {
  className?: string;
}

const NavBar = ({ className }: NavBarProps) => {
  const { pathname } = useLocation();

  const menus = useMemo(
    () => [
      {
        icon: 'bx-user',
        link: '/manager/employee',
        text: '직원 관리',
      },
      {
        icon: 'bx-time',
        link: '/manager/tracker',
        text: '근태',
      },
    ],
    [],
  );

  return (
    <NavBarStyled className={clsx('NavBar', className)}>
      {menus.map(menu => {
        const isActive = pathname === menu.link;
        return (
          <motion.div
            key={menu.text}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <Tooltip placement="bottom" title={menu.text}>
              <Link key={menu.text} to={menu.link} className={clsx('item', isActive && 'active')}>
                {isActive && (
                  <motion.div
                    className="menuActiveBG"
                    layoutId="menuActiveBG"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}
                <i className={`bx ${menu.icon}`} />
              </Link>
            </Tooltip>
          </motion.div>
        );
      })}
    </NavBarStyled>
  );
};

export default NavBar;
