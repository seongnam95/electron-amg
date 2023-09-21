import styled from "styled-components";
import {
  BottomSheetModal,
  Signature,
  ConsentCheck,
  ContractArticle,
  Button,
} from "@components";
import { useRecoilValue } from "recoil";
import { ContractState, ContractorState } from "@stores";
import { SignatureView } from "@views";
import { useState } from "react";
import { useFormikContext } from "formik";
import useValidFormCheck from "@hooks/useValidFormCheck";
import { AnimatePresence, motion } from "framer-motion";

export function ArticleView() {
  const isValidForm = useValidFormCheck();

  const contract = useRecoilValue(ContractState);
  const contractor = useRecoilValue(ContractorState);

  const [showSignModal, setShowSignModal] = useState<boolean>(false);
  const { setFieldValue } = useFormikContext();
  const [sign, setSign] = useState<string>("");

  const [contractConsent, setContractConsent] = useState<boolean>(false);
  const [personalConsent, setPersonalConsent] = useState<boolean>(false);

  return (
    <StyledArticleView>
      <div className="check-wrap">
        <ConsentCheck
          label="계약 조항을 모두 읽었으며 이에 동의함"
          contentTitle="계약 내용"
          content={
            <ContractArticle
              salary={contract.salary}
              name={contractor.name}
              pay={contract.pay}
              startPeriod={contract.startPeriod}
              endPeriod={contract.endPeriod}
            />
          }
          onChange={(e) => setContractConsent(e.target.checked)}
        />
        <ConsentCheck
          label="개인정보 수집 및 이용 동의"
          contentTitle="개인정보 수집 및 이용 동의"
          content={
            <ContractArticle
              salary={contract.salary}
              name={contractor.name}
              pay={contract.pay}
              startPeriod={contract.startPeriod}
              endPeriod={contract.endPeriod}
            />
          }
          onChange={(e) => setPersonalConsent(e.target.checked)}
        />
      </div>

      <Signature
        repName={contract.repName}
        companyName={contract.companyName}
        companyAddress={contract.companyAddress}
        name={contractor.name}
        address={contractor.address}
        phone={contractor.phone}
        sign={sign === "" ? contractor.sign : sign}
        onClickSign={() => setShowSignModal(true)}
      />

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
            <Button type="button" onClick={() => {}}>
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
        <SignatureView
          onSubmit={(result) => {
            setSign(result);
            setFieldValue("sign", result);
          }}
          onClose={() => setShowSignModal(false)}
        />
      </BottomSheetModal>
    </StyledArticleView>
  );
}

// styled
const StyledArticleView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding-bottom: 10rem;

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
