import { HTMLAttributes, useState } from "react";
import { Field, useFormikContext } from "formik";
import { ConsentViewStyled } from "./styled";
import {
  ConsentCheck,
  ContractClause,
  ContractorInfoTable,
  PersonalConsent,
  Signature,
} from "@com/contract";
import { BottomSheetModal } from "@com/common";

interface ConsentViewProps extends HTMLAttributes<HTMLDivElement> {
  viewRef?: React.RefObject<HTMLDivElement>;
}

function ConsentView({ viewRef, ...props }: ConsentViewProps) {
  const { setFieldValue } = useFormikContext();
  const [showSignModal, setShowSignModal] = useState<boolean>(false);

  const handleSignatureComplete = (data: string) => {
    setFieldValue("signBase64", data);
    setShowSignModal(false);
  };

  return (
    <ConsentViewStyled ref={viewRef} {...props}>
      {/* 계약 내용 및 개인정보이용 동의 체크박스 */}
      <div className="check-wrap">
        <Field
          as={ConsentCheck}
          name="contractConsent"
          label="계약 조항을 모두 읽었으며 이에 동의함"
          contentTitle="계약 내용"
          contentComponent={<ContractClause />}
        />
        <Field
          as={ConsentCheck}
          name="personalConsent"
          label="개인정보 수집·이용·제3자 제공 동의"
          contentTitle="개인정보 수집·이용·제공 동의"
          contentComponent={<PersonalConsent />}
        />
      </div>

      {/* 계약자 */}
      <ContractorInfoTable onClickSign={() => setShowSignModal(true)} />

      <BottomSheetModal
        title="서명"
        onClose={() => setShowSignModal(false)}
        open={showSignModal}
      >
        <Signature onComplete={handleSignatureComplete} />
      </BottomSheetModal>
    </ConsentViewStyled>
  );
}

export default ConsentView;
