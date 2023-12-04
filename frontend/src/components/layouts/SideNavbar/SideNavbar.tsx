import { ReactNode, useMemo } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBusinessTime } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';

import clsx from 'clsx';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { useSetRecoilState } from 'recoil';

import { MenuItemData, breadcrumbStore } from '~/stores/breadcrumb';

import { SideNavbarStyled } from './styled';

const SideNavbar = () => {
  const { pathname } = useLocation();
  const setBreadcrumb = useSetRecoilState(breadcrumbStore);

  const menus: MenuItemData[] = useMemo(
    () => [
      {
        key: 'dashboard',
        text: '대시보드',
        icon: <GoHomeFill className="menu-icon" />,
        path: '/management/dashboard',
      },
      {
        key: 'employee',
        text: '직원 관리',
        icon: <BsFillPeopleFill className="menu-icon" />,
        path: '/management/employee',
      },
      {
        key: 'attendance',
        text: '근태',
        icon: <FaBusinessTime className="menu-icon" />,
        path: '/management/attendance',
      },
    ],
    [],
  );

  return (
    <SideNavbarStyled className="SideNavbar">
      <LayoutGroup>
        <div className="items">
          <AnimatePresence>
            {menus.map(item => {
              const isActive = pathname === item.path;
              if (isActive) setBreadcrumb([item]);
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <Link
                    key={item.key}
                    to={item.path}
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
                    {item.icon}
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
