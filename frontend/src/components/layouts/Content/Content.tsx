import { useLocation } from 'react-router-dom';

import { motion } from 'framer-motion';

import { ContentStyled } from './styled';

export interface ContentProps {
  children: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
  // const { pathname } = useLocation();
  // const pathArray = pathname.slice(1).split('/');
  console.log('랜더');

  return (
    <ContentStyled id="contentWrap" className="Content">
      <motion.div
        // key={pathname}
        initial={{ opacity: 0, x: -12, y: -12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </ContentStyled>
  );
};

export default Content;
