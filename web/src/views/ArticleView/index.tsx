import styled from "styled-components";
import {
  BottomSheetModal,
  Contractor,
  ConsentCheck,
  ContractArticle,
  Button,
  PersonalConsent,
  Signature,
} from "@components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ContractState, ContractorState } from "@stores";
import { useState } from "react";
import { useFormikContext } from "formik";
import useValidFormCheck from "@hooks/useValidFormCheck";
import { AnimatePresence, motion } from "framer-motion";

export function ArticleView() {
  const isValidForm = useValidFormCheck();
  const { handleSubmit } = useFormikContext();

  const setContract = useSetRecoilState(ContractState);
  const contractor = useRecoilValue(ContractorState);

  const [showSignModal, setShowSignModal] = useState<boolean>(false);
  const [contractConsent, setContractConsent] = useState<boolean>(false);
  const [personalConsent, setPersonalConsent] = useState<boolean>(false);

  const handleSignatureComplete = (data: string) => {
    setContract((prev) => {
      return {
        ...prev,
        signBase64: data,
      };
    });
    setShowSignModal(false);
  };

  return (
    <StyledArticleView>
      {/* 계약 내용 및 개인정보이용 동의 체크박스 */}
      <div className="check-wrap">
        <ConsentCheck
          label="계약 조항을 모두 읽었으며 이에 동의함"
          contentTitle="계약 내용"
          content={<ContractArticle name={contractor.name} />}
          onChange={(e) => setContractConsent(e.target.checked)}
        />
        <ConsentCheck
          label="개인정보 수집·이용·제3자 제공 동의"
          contentTitle="개인정보 수집·이용·제공 동의"
          content={<PersonalConsent />}
          onChange={(e) => setPersonalConsent(e.target.checked)}
        />
      </div>

      {/* 계약자 */}
      <Contractor onClickSign={() => setShowSignModal(true)} />

      <AnimatePresence>
        {isValidForm && contractConsent && personalConsent && (
          <motion.div
            className="btn-wrap"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onAnimationComplete={() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }}
          >
            <Button type="button" onClick={() => handleSubmit()}>
              계약서 작성 완료
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomSheetModal
        title="서명"
        onClose={() => setShowSignModal(false)}
        open={showSignModal}
      >
        <Signature onComplete={handleSignatureComplete} />
      </BottomSheetModal>
    </StyledArticleView>
  );
}

// styled
const StyledArticleView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  .check-wrap {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    margin-bottom: 2rem;
  }

  .btn-wrap {
    display: flex;
    width: 100%;
    margin-top: 3rem;

    > button {
      flex: 1;
    }
  }

  .info-wrap {
    display: flex;
    gap: 2.4rem;
    padding: 2.4rem 1rem;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    width: 100%;

    .info-label {
      display: flex;
      flex-direction: column;
      gap: 1.4rem;

      color: var(--text);
      font-size: var(--font-size-m);
      font-weight: bold;
    }

    .info-text {
      display: flex;
      flex-direction: column;
      gap: 1.4rem;

      color: var(--text);
      font-size: var(--font-size-m);
    }
  }
`;
