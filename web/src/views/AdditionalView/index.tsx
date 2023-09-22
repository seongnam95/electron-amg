import {
  AddressInput,
  BankSelector,
  Button,
  Input,
  NextButton,
} from "@components";
import { Field } from "formik";
import { useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { stepState } from "@stores";
import useValidFormCheck from "@hooks/useValidFormCheck";

/**
 * [ STEP 2 ] 추가 정보 입력 폼
 */
export function AdditionalView() {
  const bankNumRef = useRef<HTMLInputElement>(null);
  const bankRef = useRef<HTMLInputElement>(null);

  const setStep = useSetRecoilState(stepState);
  const isValidForm = useValidFormCheck();

  return (
    <AdditionalViewStyled>
      {/* 주소 */}
      <Field
        as={AddressInput}
        name="address"
        placeholder="주소"
        onSelected={() => bankRef.current?.focus()}
      />

      {/* 은행명 */}
      <Field
        inputRef={bankRef}
        as={BankSelector}
        readOnly
        name="bank"
        placeholder="은행 선택"
        onSelected={() => bankNumRef.current?.focus()}
      />

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

      <NextButton />
    </AdditionalViewStyled>
  );
}

const AdditionalViewStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;
