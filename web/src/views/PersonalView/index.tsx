import { Field, useFormikContext } from "formik";
import { Input, PastWorkerModal } from "@components";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { WorkerData } from "@types";
import { useSetRecoilState } from "recoil";
import { ContractorState, stepState } from "@stores";

interface Personal {
  name: string;
  phone: string;
  idFront: string;
  idBack: string;
}

const textWorker: WorkerData = {
  id: "1",
  name: "장성남",
  phone: "01012341234",
  residence: "경기도 남양주시 다산동",
  bank: "카카오",
  bankNum: "3333033137517",
};
/**
 * [ STEP 1 ] 개인정보 입력 폼
 */
export function PersonalView() {
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);

  const [worker, setWorker] = useState<WorkerData | undefined>(textWorker);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const setContractor = useSetRecoilState(ContractorState);
  const setStep = useSetRecoilState(stepState);

  const { isValid, dirty, values, errors, validateForm } =
    useFormikContext<Personal>();

  useEffect(() => {
    const validateFormCheck = async () => {
      const errors = await validateForm();
      if (isValid && dirty && !Object.keys(errors).length) {
        setWorker(textWorker);
        setIsValidForm(true);
      } else setIsValidForm(false);
    };
    validateFormCheck();
  }, [values, errors]);

  // 기존 근로자 API 호출
  const getWorkerList = () => {
    const params = {
      name: values.name,
      phone: values.phone,
      birth: values.idFront,
    };

    axios
      .get("http://localhost:8001/api/v1/worker/draw/", { params })
      .then((res) => {
        const data: WorkerData = res.data.result;
        setWorker(data);
        setIsValidForm(true);
      })
      .catch((err) => alert(err));
  };

  // 이전 기록으로 계약 진행
  const handleClickSkip = () => {
    if (worker) {
      setContractor((preview) => {
        return {
          ...preview,
          name: worker.name,
          phone: worker.phone,
          address: worker.residence,
        };
      });
      setStep(3);
    }
  };

  return (
    <PersonalViewStyled>
      {/* 이름 */}
      <Field as={Input} name="name" placeholder="계약자 성명" />

      {/* 연락처 */}
      <Field
        as={Input}
        name="phone"
        inputMode="tel"
        maxLength={11}
        placeholder="연락처"
        hint="'-' 하이픈 제외 숫자만 입력"
        onlyNum
        onCompleted={() => frontRef.current?.focus()}
      />

      {/* 주민등록번호 */}
      <div className="id-input-wrap">
        <Field
          as={Input}
          name="idFront"
          inputRef={frontRef}
          inputMode="tel"
          maxLength={6}
          placeholder="주민등록번호"
          onlyNum
          onCompleted={() => backRef.current?.focus()}
        />

        <Field
          as={Input}
          name="idBack"
          inputRef={backRef}
          inputMode="tel"
          maxLength={7}
          type="password"
          onlyNum
          onCompleted={() => backRef.current?.blur()}
        />
      </div>

      {worker && (
        <PastWorkerModal
          worker={worker}
          open={isValidForm}
          onNew={() => setStep(1)}
          onSkip={handleClickSkip}
        />
      )}
    </PersonalViewStyled>
  );
}

const PersonalViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;

  .id-input-wrap {
    display: flex;
    gap: 1.4rem;
  }
`;
