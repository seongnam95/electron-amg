import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Tooltip } from 'antd';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import amgApi from '~/api/apiClient';
import Button from '~/components/common/Button';
import { useLogout } from '~/hooks/useLogout';
import { layoutStore } from '~/stores/layout';
import { initUser, userState } from '~/stores/user';

import { MenuStyled } from './styled';

export interface MenuProps {
  className?: string;
}

const Menu = ({ className }: MenuProps) => {
  const logout = useLogout();

  const { pathname } = useLocation();
  const { breadcrumbs } = useRecoilValue(layoutStore);

  const menus = useMemo(
    () => [
      {
        icon: 'bx-user',
        link: '/manager/worker',
        text: '직원 관리',
      },
      {
        icon: 'bx-time',
        link: '/manager/tracker',
        text: '근태',
      },
      {
        icon: 'bx-cog',
        link: '/settings',
        text: '설정',
      },
    ],
    [],
  );

  return (
    <MenuStyled className={clsx('Menu', className)}>
      <div className="breadcrumb">
        <i className="bx bx-hash" />

        <motion.span
          initial={{ opacity: 0, x: 3 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          key={pathname}
        >
          {breadcrumbs.map((text, i) => (
            <span key={text + i}>{text}</span>
          ))}
        </motion.span>
      </div>

      <div className="menus">
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
      </div>

      <Button onClick={logout} styled={{ variations: 'icon' }}>
        <i className="bx bx-log-out" />
      </Button>
    </MenuStyled>
  );
};

export default Menu;
