import { useEffect } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { WorkerType } from "@type/contract";
import { WorkerSkipModalStyled } from "./styled";

interface WorkerSkipModalProps {
  worker: WorkerType;
  open?: boolean;
  onSkip?: () => void;
  onNew?: () => void;
}

function WorkerSkipModal({
  worker,
  open = false,
  onSkip,
  onNew,
}: WorkerSkipModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <WorkerSkipModalStyled>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="mask-wrap"
          />
          <motion.div
            className="modal-wrap"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <p className="modal-header-text">
              이전 계약자 정보로 진행하시겠습니까?
            </p>
            <p className="modal-header-sub-text">
              통장사본, 신분증, 주소, 계좌 등이 자동 입력됩니다.
            </p>
            <ul>
              <li>
                <span>이름</span>
                <span>{worker.name}</span>
              </li>
              <li>
                <span>주소</span>
                <span>{worker.residence}</span>
              </li>
              <li>
                <span>계좌번호</span>
                <span>
                  <span className="bank-name">{worker.bank}</span>
                  {worker.bankNumCover}
                </span>
              </li>
            </ul>

            <div className="btn-wrap">
              <button type="button" className="card-btn" onClick={onSkip}>
                <p className="btn-label">이전 계약 정보로 진행하기</p>
              </button>
              <button type="button" className="card-btn link" onClick={onNew}>
                <p className="btn-label">새로운 정보로 진행하기</p>
              </button>
            </div>
          </motion.div>
        </WorkerSkipModalStyled>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default WorkerSkipModal;
