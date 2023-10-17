import ReactDOM from 'react-dom';
import { FaTrashAlt } from 'react-icons/fa';

import { motion, AnimatePresence } from 'framer-motion';

import { DockStyled } from './styled';

interface DockProps {
  open?: boolean;
  parentElement?: HTMLElement | null;
  onDelete?: () => void;
}

const Dock = ({ open, parentElement, onDelete }: DockProps) => {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {open ? (
        <DockStyled onClick={onDelete}>
          <motion.div
            className="dock-wrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <FaTrashAlt />
          </motion.div>
        </DockStyled>
      ) : null}
    </AnimatePresence>,
    parentElement ? parentElement : document.body,
  );
};

export default Dock;
