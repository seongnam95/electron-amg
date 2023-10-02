import { BottomSheetModal, Header } from "@components";
import styled from "styled-components";
import { useRef, useState } from "react";
import { DraftContractView, FormHistoryView } from "@views";
import { motion } from "framer-motion";

export function AdminPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOnCopy = async (formId: string) => {
    if (inputRef.current) {
      inputRef.current.value = `http://amgcom.site/${formId}`;
      setClipboard();
    }
  };

  const setClipboard = async () => {
    try {
      const el = inputRef?.current;
      el?.select();
      document.execCommand("copy");
      alert("클립보드에 복사되었습니다.");
    } catch (err) {
      alert(`클립보드 복사에 실패했습니다. \nErr: ${err}`);
    }
  };

  return (
    <StyledAdminPage>
      <Header
        height="4rem"
        title="AMG"
        actionIcon="history"
        actionOnClick={() => {
          setShowModal(true);
        }}
      />
      <motion.div
        className="content-wrap"
        style={{ height: "100%" }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DraftContractView onCopy={handleOnCopy} />
      </motion.div>

      <BottomSheetModal
        open={showModal}
        title="이전 기록"
        onClose={() => {
          setShowModal(false);
        }}
      >
        <FormHistoryView onCopy={handleOnCopy} />
      </BottomSheetModal>
      <input readOnly ref={inputRef} className="link-text" />
    </StyledAdminPage>
  );
}

const StyledAdminPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3.4rem 0;

  width: 100vw;
  height: 100%;
  overflow: hidden;

  .tab-bar-wrap {
    height: calc(100% - 5.6rem);
  }

  .link-text {
    position: absolute;
    top: -100%;
  }
`;
