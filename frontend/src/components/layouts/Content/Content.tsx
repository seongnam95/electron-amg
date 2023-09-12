import { useLocation } from 'react-router-dom';

import clsx from 'clsx';
import { motion } from 'framer-motion';

import { ContentStyled } from './styled';

export interface ContentProps {
  className?: string;
  children: React.ReactNode;
}

const Content = ({ className, children }: ContentProps) => {
  const { pathname } = useLocation();

  return (
    <ContentStyled className={clsx('Content', className)}>
      <div className="content">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </ContentStyled>
  );
};

export default Content;
