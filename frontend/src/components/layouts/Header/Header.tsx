import { HTMLAttributes, useEffect } from 'react';
import { GoHomeFill } from 'react-icons/go';
import { useLocation, useNavigate } from 'react-router-dom';

import { Breadcrumb, Flex } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import TeamSelector from '~/components/common/TeamSelector';
import { breadcrumbStore } from '~/stores/breadcrumb';

import { HeaderStyled } from './styled';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

const Header = ({ children, ...props }: HeaderProps) => {
  const breadcrumb = useRecoilValue(breadcrumbStore);

  const items: BreadcrumbItemType[] = breadcrumb
    .filter(crumb => crumb.text)
    .map((crumb, idx) => {
      return {
        key: crumb.key,
        title: (
          <Flex align="center" gap={8}>
            {idx === 0 ? <span style={{ color: '#767676', marginTop: 3 }}>#</span> : null}
            {crumb.text}
          </Flex>
        ),
      };
    });

  const crumbKey = items.map(item => item.key).join('/');
  return (
    <HeaderStyled className="Header" {...props}>
      <motion.div
        key={crumbKey}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Breadcrumb items={items} />
      </motion.div>
      <TeamSelector />
    </HeaderStyled>
  );
};

export default Header;
