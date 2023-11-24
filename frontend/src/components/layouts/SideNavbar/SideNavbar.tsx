import { useMemo } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBusinessTime } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';

import clsx from 'clsx';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';

import { SideNavbarStyled } from './styled';

const SideNavbar = () => {
  const { pathname } = useLocation();

  const menus = useMemo(
    () => [
      {
        icon: <GoHomeFill className="menu-icon" />,
        link: '/',
        text: '홈',
      },
      {
        icon: <BsFillPeopleFill className="menu-icon" />,
        link: '/manager/employee',
        text: '직원 관리',
      },
      {
        icon: <FaBusinessTime className="menu-icon" />,
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
