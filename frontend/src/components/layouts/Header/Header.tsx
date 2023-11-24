import { HTMLAttributes } from 'react';
import { GoHomeFill } from 'react-icons/go';
import { useLocation, useNavigate } from 'react-router-dom';

import { Breadcrumb, Flex } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { motion } from 'framer-motion';

import { HeaderStyled } from './styled';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

const Header = ({ children, ...props }: HeaderProps) => {
  const { pathname } = useLocation();

  const items: BreadcrumbItemType[] = [
    {
      path: pathname,
      title: (
        <Flex align="center" gap={8}>
          <GoHomeFill color="#767676#" />
          근태 관리
        </Flex>
      ),
    },
    {
      title: '일간',
    },
  ];

  return (
    <HeaderStyled className="Header" {...props}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Breadcrumb items={items} />
      </motion.div>

      {children}
    </HeaderStyled>
  );
};

export default Header;
