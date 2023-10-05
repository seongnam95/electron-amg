import { ContractorState, stepState } from "@stores/contract";
import { ContractorType } from "@type/contract";
import { Field, useFormikContext } from "formik";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { BankViewStyled } from "./styled";
import { BankSelector, NextButton } from "@com/contract";
import { Input } from "@com/common";
import { HTMLAttributes } from "react";

/**
 * [ STEP 2 ] 추가 정보 입력 폼
 */

interface BankViewProps extends HTMLAttributes<HTMLDivElement> {
  viewRef?: React.RefObject<HTMLDivElement>;
}

function BankView({ viewRef, ...props }: BankViewProps) {
  const bankNumRef = useRef<HTMLInputElement>(null);
  const bankRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bankNumRef.current) bankNumRef.current.focus();
  }, []);

  return (
    <BankViewStyled ref={viewRef} {...props}>
      {/* 계좌번호 */}
      <Field
        inputRef={bankNumRef}
        as={Input}
        name="bankNum"
        inputMode="tel"
        maxLength={16}
        placeholder="계좌번호"
        hint="'-' 하이픈 제외 숫자만 입력"
        onlyNum
      />

      {/* 은행명 */}
      <Field
        inputRef={bankRef}
        as={BankSelector}
        readOnly
        name="bank"
        placeholder="은행 선택"
      />
    </BankViewStyled>
  );
}

export default BankView;
