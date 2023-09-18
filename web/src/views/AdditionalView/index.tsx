import { Input } from "@components";
import { Field } from "formik";
import styled from "styled-components";

export function AdditionalView() {
  return (
    <AdditionalViewStyled>
      {/* 계좌번호 */}
      <Field
        as={Input}
        name="bankNum"
        inputMode="numeric"
        maxLength={11}
        placeholder="계좌번호"
        hint="'-' 하이픈 제외 숫자만 입력"
      />

      <div className="bank-modal">
        <div className="bank-item">카카오</div>
      </div>
    </AdditionalViewStyled>
  );
}

const AdditionalViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  height: 100%;

  background-color: blue;

  .bank-modal {
    position: absolute;
    bottom: 0;
    left: 0;

    display: flex;
    width: 100vw;
    height: 80%;

    border-top-left-radius: 4rem;
    border-top-right-radius: 4rem;
    background-color: red;

    padding: 4rem;

    .bank-item {
    }
  }
`;
