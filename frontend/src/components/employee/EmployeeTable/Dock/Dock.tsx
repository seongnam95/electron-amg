import ReactDOM from 'react-dom';
import { BsDownload } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { ImFileExcel } from 'react-icons/im';

import { Button, Tooltip } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

import { DockStyled } from './styled';

interface DockProps {
  open?: boolean;
  parentElement?: HTMLElement | null;
  onExcel?: () => void;
  onDelete?: () => void;
}

const Dock = ({ open, parentElement, onExcel, onDelete }: DockProps) => {
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
            <Tooltip title="엑셀로 저장" mouseEnterDelay={0.6}>
              <Button
                className="excel-btn"
                type="text"
                size="large"
                icon={<ImFileExcel size="2.1rem" style={{ marginTop: 3 }} />}
                onClick={onExcel}
              />
            </Tooltip>

            <Tooltip title="삭제" mouseEnterDelay={0.6}>
              <Button
                danger
                type="text"
                size="large"
                icon={<FaTrashAlt size="2.1rem" style={{ marginTop: 3 }} />}
                onClick={onDelete}
              />
            </Tooltip>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </DockStyled>,
    parentElement ? parentElement : document.body,
  );
};

export default Dock;
