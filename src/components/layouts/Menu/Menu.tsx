import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Tooltip } from 'antd';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import amgApi from '~/api/apiClient';
import Button from '~/components/common/Button';
import { useLogout } from '~/hooks/useLogout';
import { layoutStore } from '~/stores/layout';

import { MenuStyled } from './styled';

export interface MenuProps {
  className?: string;
}

const Menu = ({ className }: MenuProps) => {
  const { pathname } = useLocation();

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
    </MenuStyled>
  );
};

export default Menu;
