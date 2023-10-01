import ReactDOM from "react-dom";
import { ReactNode, useEffect } from "react";

import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { Icon } from "@components";

interface BottomSheetModalProps {
  children?: ReactNode;
  title?: string;
  height?: string;
  open?: boolean;
  onClose?: () => void;
}

export const BottomSheetModal = ({
  children,
  title,
  height,
  open = false,
  onClose,
}: BottomSheetModalProps) => {
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      const scrollBarWidth = window.innerWidth - document.body.clientWidth;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      const preventScroll = (e: any) => e.preventDefault();
      window.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.paddingRight = "";
        window.removeEventListener("touchmove", preventScroll);
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <BottomSheetModalStyled className="bottom-sheet-modal" height={height}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mask-wrap"
            onClick={onClose}
          />
          <motion.div
            className="modal-wrap"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="modal-header">
              {title}
              <Icon icon="closeOutline" onClick={onClose} />
            </div>
            <div className="modal-content">{children}</div>
          </motion.div>
        </BottomSheetModalStyled>
      )}
    </AnimatePresence>,
    document.body
  );
};

const BottomSheetModalStyled = styled.div<{ height?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  .mask-wrap {
    width: 100vw;
    height: 100vh;
    background-color: rgba(50, 50, 50, 0.4);
  }

  .modal-wrap {
    position: absolute;
    bottom: 0;

    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;

    width: 100%;
    height: ${(p) => (p.height ? p.height : "90%")};
    padding: 4rem 2rem;

    background-color: white;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      color: var(--text);
      font-weight: bold;
      font-size: 22px;

      height: 2.5rem;
      margin-bottom: 3rem;
    }

    .modal-content {
      height: calc(100% - 5.5rem);
      overflow-y: scroll;
    }
  }
`;
