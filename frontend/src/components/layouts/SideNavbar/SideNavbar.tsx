import { useMemo } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBusinessTime } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';

import clsx from 'clsx';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';

import { SideNavbarStyled } from './styled';

export const menus = [
  {
    key: 'dashboard',
    path: '/management/dashboard',
    title: '대시보드',
    icon: <GoHomeFill className="menu-icon" />,
  },
  {
    key: 'employee',
    path: '/management/employee',
    title: '근무자 관리',
    icon: <BsFillPeopleFill className="menu-icon" />,
  },
  {
    key: 'attendance',
    path: '/management/attendance',
    title: '근태관리',
    icon: <FaBusinessTime className="menu-icon" />,
    menu: true,
  },
];

const SideNavbar = () => {
  const { pathname } = useLocation();

  return (
    <SideNavbarStyled className="SideNavbar">
      <LayoutGroup>
        <div className="items">
          <AnimatePresence>
            {menus.map(menu => {
              const isActive = menu.path === pathname;

              return (
                <motion.div
                  key={menu.key}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <Link
                    key={menu.key}
                    to={menu.path}
                    className={clsx('item', isActive && 'active')}
                  >
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
                    {menu.icon}
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </SideNavbarStyled>
  );
};

export default SideNavbar;
