import { useLocation } from 'react-router-dom';

import clsx from 'clsx';
import { motion } from 'framer-motion';

import { ContentStyled } from './styled';

export interface ContentProps {
  children: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
  const { pathname } = useLocation();

  return (
    <ContentStyled className="Content">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </ContentStyled>
  );
};

export default Content;
