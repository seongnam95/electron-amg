import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import clsx from 'clsx';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';

import { SideNavbarStyled } from './styled';

const SideNavbar = () => {
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
        link: '/manager/attendance',
        text: '근태',
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
              const isActive = pathname === item.link;

              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <Link
                    key={item.text}
                    to={item.link}
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
                    <i className={`bx ${item.icon}`} />
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
