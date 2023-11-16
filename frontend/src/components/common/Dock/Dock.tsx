import ReactDOM from 'react-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { ImFileExcel } from 'react-icons/im';

import { Button, Tooltip } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

import { DockStyled } from './styled';

interface DockProps {
  open?: boolean;
  parentElement?: HTMLElement | null;
  children?: React.ReactNode;
}

const Dock = ({ open, parentElement, children }: DockProps) => {
  return ReactDOM.createPortal(
    <DockStyled>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="dock-wrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </DockStyled>,
    parentElement ? parentElement : document.body,
  );
};

export default Dock;
