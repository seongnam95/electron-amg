import { useRecoilState, useSetRecoilState } from "recoil";
import { ContractState } from "@stores/contract";
import { HTMLAttributes, useState } from "react";
import { useFormikContext } from "formik";
import useValidFormCheck from "@hooks/useValidFormCheck";
import { AnimatePresence, motion } from "framer-motion";
import { ArticleViewStyled } from "./styled";
import {
  ConsentCheck,
  ContractArticle,
  ContractorInfoTable,
  PersonalConsent,
  Signature,
} from "@com/contract";
import { BottomSheetModal, Button } from "@com/common";

interface ArticleViewProps extends HTMLAttributes<HTMLDivElement> {
  viewRef?: React.RefObject<HTMLDivElement>;
}

function ArticleView({ viewRef, ...props }: ArticleViewProps) {
  const isValidForm = useValidFormCheck();
  const { handleSubmit } = useFormikContext();

  const [contract, setContract] = useRecoilState(ContractState);

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
    <ArticleViewStyled ref={viewRef} {...props}>
      {/* 계약 내용 및 개인정보이용 동의 체크박스 */}
      <div className="check-wrap">
        <ConsentCheck
          label="계약 조항을 모두 읽었으며 이에 동의함"
          contentTitle="계약 내용"
          content={<ContractArticle />}
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
      <ContractorInfoTable onClickSign={() => setShowSignModal(true)} />

      <AnimatePresence>
        {contract.signBase64 && contractConsent && personalConsent && (
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
    </ArticleViewStyled>
  );
}

export default ArticleView;
