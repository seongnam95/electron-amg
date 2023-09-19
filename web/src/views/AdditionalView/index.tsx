import { BankSelector, Input } from "@components";
import { Field, useFormikContext } from "formik";
import styled from "styled-components";

/**
 * [ STEP 2 ] 추가 정보 입력 폼
 */
export function AdditionalView() {
  return (
    <AdditionalViewStyled>
      {/* 계좌번호 */}
      <Field
        as={Input}
        name="bankNum"
        inputMode="numeric"
        maxLength={13}
        placeholder="계좌번호"
        hint="'-' 하이픈 제외 숫자만 입력"
        onlyNum
      />
      {/* 은행명 */}
      <Field as={BankSelector} readOnly name="bank" placeholder="은행 선택" />
    </AdditionalViewStyled>
  );
}

const AdditionalViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;
