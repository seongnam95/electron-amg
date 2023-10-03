import ReactDOM from "react-dom";
import { ReactNode, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BottomSheetModalStyled } from "./styled";
import { Close } from "@material-ui/icons";

interface BottomSheetModalProps {
  children?: ReactNode;
  title?: string;
  height?: string;
  open?: boolean;
  onClose?: () => void;
}

const BottomSheetModal = ({
  children,
  title,
  height,
  open = false,
  onClose,
}: BottomSheetModalProps) => {
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;

      const preventScroll = (e: any) => e.preventDefault();

      if (maskRef.current) {
        maskRef.current.addEventListener("touchmove", preventScroll, {
          passive: false,
        });
      }

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";

        if (maskRef.current) {
          maskRef.current.removeEventListener("touchmove", preventScroll);
        }

        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <BottomSheetModalStyled className="bottom-sheet-modal" height={height}>
          <motion.div
            ref={maskRef}
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
              <Close onClick={onClose} />
            </div>
            <div className="modal-content">{children}</div>
          </motion.div>
        </BottomSheetModalStyled>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BottomSheetModal;
