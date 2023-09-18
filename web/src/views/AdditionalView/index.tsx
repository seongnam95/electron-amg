import { BankSelector, Input } from "@components";
import { Field, useFormikContext } from "formik";
import { useEffect } from "react";
import styled from "styled-components";

export function AdditionalView() {
  const { values } = useFormikContext();

  useEffect(() => console.log(values), [values]);

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
