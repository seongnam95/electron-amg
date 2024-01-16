import { HTMLAttributes, useEffect } from 'react';
import { GoHomeFill } from 'react-icons/go';
import { useLocation, useNavigate } from 'react-router-dom';

import { Breadcrumb, Button, Flex, Skeleton, Typography } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import TeamSelector from '~/components/common/TeamSelector';
import { breadcrumbStore } from '~/stores/breadcrumb';

import { menus } from '../SideNavbar';
import { HeaderStyled } from './styled';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

const Header = ({ children, ...props }: HeaderProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = (path: string) => navigate(path);

  const currentCrumb = menus.find(menu => menu.path === pathname);
  if (!currentCrumb) return <Skeleton />;
  return (
    <HeaderStyled className="Header" {...props}>
      {currentCrumb ? (
        <motion.div
          className="breadcrumb-wrap"
          key={currentCrumb.key}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {currentCrumb.icon}
          {currentCrumb.title}
        </motion.div>
      ) : (
        <Skeleton active />
      )}

      <TeamSelector />
    </HeaderStyled>
  );
};

export default Header;
